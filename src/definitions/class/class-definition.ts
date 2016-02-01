import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {ConstructorDefinition} from "./constructor-definition";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";
import {ClassStaticPropertyDefinition} from "./class-static-property-definition";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IDecoratableDefinition, DecoratableDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition, ITypeParameteredDefinition, TypeParameteredDefinition, IModuledDefinition} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";

export class ClassDefinition implements INamedDefinition, IParentedDefinition<IModuledDefinition>, IDecoratableDefinition,
                                        IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    isAbstract: boolean;
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
    constructorDef: ConstructorDefinition;
    typeParameters: TypeParameterDefinition<this>[] = [];

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        public extendsTypeExpressions: TypeExpression[],
        public implementsTypeExpressions: TypeExpression[]
    ) {
        this.fillName(typeChecker, symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillIsAbstract(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    write() {
        const writer = new CodeBlockWriter();
        const classWriter = new ClassWriter(writer);
        classWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    private fillIsAbstract(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;

        this.isAbstract = (nodeFlags & ts.NodeFlags.Abstract) === ts.NodeFlags.Abstract;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = [];

        this.fillInstanceMembers(typeChecker, symbol);
        this.fillStaticMembers(typeChecker, symbol);
    }

    private fillInstanceMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (typeChecker.isSymbolClassProperty(member)) {
                this.properties.push(new ClassPropertyDefinition(typeChecker, member, this));
            }
            else if (typeChecker.isSymbolClassMethod(member)) {
                this.methods.push(new ClassMethodDefinition(typeChecker, member, this));
            }
            else if (typeChecker.isSymbolConstructor(member)) {
                this.verifyConstructorNotSet();
                this.constructorDef = new ConstructorDefinition(typeChecker, member, this);
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                // todo: maybe make this work like how it does in call signature definition and function? (use method in TypeParameteredDefinition?)
                this.typeParameters.push(new TypeParameterDefinition<this>(typeChecker, member, this));
            }
            else {
                console.warn(`Not implemented member: ${member.getName()}`);
            }
        });
    }

    private fillStaticMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).map(memberName => symbol.exports[memberName]).forEach(staticMember => {
            /* istanbul ignore else */
            if (staticMember.getName() === "prototype") {
                // ignore
            }
            else if (typeChecker.isSymbolStaticMethod(staticMember)) {
                this.staticMethods.push(new ClassStaticMethodDefinition(typeChecker, staticMember, this));
            }
            else if (typeChecker.isSymbolStaticProperty(staticMember)) {
                this.staticProperties.push(new ClassStaticPropertyDefinition(typeChecker, staticMember, this));
            }
            else {
                console.warn(`Not implemented static member: ${staticMember.getName()}`);
            }
        });
    }

    private verifyConstructorNotSet() {
        /* istanbul ignore if */
        if (this.constructorDef != null) {
            throw `Unknown error: Duplicate constructors on ${this.name}.`;
        }
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: IModuledDefinition;
    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
