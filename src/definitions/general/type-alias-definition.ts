﻿import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {ModuledDefinitions} from "./../../definitions";
import {WriteFlags} from "./../../write-flags";
import {INamedDefinition, IParentedDefinition, IExportableDefinition, ITypeExpressionedDefinition, ITypeParameteredDefinition, IAmbientableDefinition,
        BaseDefinition, DefinitionType} from "./../base";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/named-definition";
import {TypeParameteredDefinition} from "./../base/type-parametered-definition";
import {TypeExpressionedDefinition} from "./../base/type-expressioned-definition";
import {ExportableDefinition} from "./../base/exportable-definition";
import {AmbientableDefinition} from "./../base/ambientable-definition";
import {TypeParameterDefinition} from "./type-parameter-definition";
import {TypeExpression} from "./../../expressions";
import {TypeAliasWriter} from "./../../writers";

export class TypeAliasDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeExpressionedDefinition,
                                            ITypeParameteredDefinition, IAmbientableDefinition {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) {
        super(DefinitionType.TypeAlias);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillTypeExpression(definitionFactory, symbolNode);
        this.fillTypeParametersBySymbol(definitionFactory, symbolNode);
        this.fillAmbientable(symbolNode);
    }

    write() {
        const writer = new CodeBlockWriter();
        const typeAliasWriter = new TypeAliasWriter(writer, WriteFlags.Default);
        typeAliasWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: ISymbolNode) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode) => void;
    fillTypeParametersBySignature: (definitionFactory: IDefinitionFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
}

applyMixins(TypeAliasDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
