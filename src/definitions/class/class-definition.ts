import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {applyMixins, tryGet, Logger, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {BaseDefinition, INamedDefinition, NamedDefinition, IParentedDefinition, IDecoratableDefinition, DecoratableDefinition, IAmbientableDefinition,
        AmbientableDefinition, IExportableDefinition, ExportableDefinition, ITypeParameteredDefinition, TypeParameteredDefinition,
        IAbstractableDefinition, AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {ClassPropertyStructure} from "./../../structures";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassConstructorParameterScope} from "./class-constructor-parameter-scope";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";
import {ClassStaticPropertyDefinition} from "./class-static-property-definition";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class ClassDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IDecoratableDefinition,
                                        IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition, IAbstractableDefinition {
    methods = new ArrayExt<ClassMethodDefinition>();
    properties = new ArrayExt<ClassPropertyDefinition>();
    staticMethods = new ArrayExt<ClassStaticMethodDefinition>();
    staticProperties = new ArrayExt<ClassStaticPropertyDefinition>();
    constructorDef: ClassConstructorDefinition;
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
    extendsTypeExpressions = new ArrayExt<TypeExpression>();
    implementsTypeExpressions = new ArrayExt<TypeExpression>();

    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        super(DefinitionType.Class);

        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillDecorators(symbolNode);
        this.fillAmbientable(symbolNode);
        this.fillAbstractable(symbolNode);
        this.fillMembers(definitionFactory, symbolNode);
        this.fillTypeParametersBySymbol(definitionFactory, symbolNode);
        this.extendsTypeExpressions.push(...symbolNode.getExtendsTypeExpressions().map(typeExpression => definitionFactory.getTypeExpression(typeExpression)));
        this.implementsTypeExpressions.push(...symbolNode.getImplementsTypeExpressions().map(typeExpression => definitionFactory.getTypeExpression(typeExpression)));
        this.fillPropertiesFromConstructorDef();
    }

    write() {
        const writer = new CodeBlockWriter();
        const classWriter = new ClassWriter(writer, WriteFlags.Default);
        classWriter.write(this);
        return writer.toString();
    }

    // todo: this will be made public once I move out the caching
    private addProperty(prop: ClassPropertyStructure) {
        // this.properties.push(new ClassPropertyDefinition(definitionFactory, new ));
    }

    private fillMembers(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        symbolNode.forEachChild(childSymbol => {
            const def = this.getMemberDefinition(definitionFactory, childSymbol);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private fillPropertiesFromConstructorDef() {
        if (this.constructorDef != null) {
            this.constructorDef.parameters.forEach(param => {
                if (param.scope !== ClassConstructorParameterScope.None) {
                    this.addProperty({
                        name: param.name,
                        scope: ClassConstructorParameterScope.toScope(param.scope),
                        type: param.typeExpression.text,
                        isOptional: param.isOptional,
                        defaultExpression: param.defaultExpression != null ? param.defaultExpression.text : null,
                        decorators: param.decorators.map(d => {
                            return {
                                name: d.name,
                                arguments: d.arguments.map(d => d.text)
                            };
                        })
                    });
                }
            });
        }
    }

    private getMemberDefinition(definitionFactory: IDefinitionFactory, childSymbol: ISymbolNode): ClassMemberDefinitions {
        return tryGet(childSymbol, () => {
            if (childSymbol.isMethodDeclaration()) {
                if (childSymbol.hasStaticKeyword()) {
                    return new ClassStaticMethodDefinition(definitionFactory, childSymbol, this);
                }
                else {
                    return new ClassMethodDefinition(definitionFactory, childSymbol, this);
                }
            }
            else if (childSymbol.isPropertyDeclaration() || childSymbol.isGetAccessor()) {
                if (childSymbol.hasStaticKeyword()) {
                    return new ClassStaticPropertyDefinition(definitionFactory, childSymbol, this);
                }
                else {
                    return new ClassPropertyDefinition(definitionFactory, childSymbol, this);
                }
            }
            else if (childSymbol.isConstructor()) {
                return new ClassConstructorDefinition(definitionFactory, childSymbol, this);
            }
            else if (childSymbol.isSetAccessor()) {
                // ignore, GetAccessor is the one that will be handled
            }
            else if (childSymbol.isIdentifier()) {
                // ignore, it's the class identifier
            }
            else if (childSymbol.isTypeParameter()) {
                // ignore, type parameters are handled elsewhere
            }
            else {
                Logger.warn(`Unknown class child kind: ${childSymbol.nodeKindToString()}`);
            }
        });
    }

    private addDefinition(def: ClassMemberDefinitions) {
        if (def.isClassPropertyDefinition()) {
            this.properties.push(def);
        }
        else if (def.isClassMethodDefinition()) {
            this.methods.push(def);
        }
        else if (def.isClassStaticPropertyDefinition()) {
            this.staticProperties.push(def);
        }
        else if (def.isClassStaticMethodDefinition()) {
            this.staticMethods.push(def);
        }
        else if (def.isClassConstructorDefinition()) {
            this.constructorDef = def;
        }
        else {
            Logger.warn(`Unknown member definition for class.`);
        }
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (symbolNode: ISymbolNode) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: ISymbolNode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (definitionFactory: IDefinitionFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: ISymbolNode) => void;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
