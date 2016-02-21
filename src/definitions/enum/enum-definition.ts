﻿import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {applyMixins, ArrayExt} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {INamedDefinition, NamedDefinition, IParentedDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumMemberDefinition} from "./enum-member-definition";

export class EnumDefinition extends BaseDefinition
                            implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, IAmbientableDefinition {
    members = new ArrayExt<EnumMemberDefinition>();

    constructor(symbolNode: ISymbolNode) {
        super(DefinitionType.Enum);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillAmbientable(symbolNode);
        this.members.push(...symbolNode.getEnumMembers().map(member => new EnumMemberDefinition(member, this)));
    }

    write() {
        const writer = new CodeBlockWriter();
        const enumWriter = new EnumWriter(writer, WriteFlags.Default);
        enumWriter.write(this);
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
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition, AmbientableDefinition]);
