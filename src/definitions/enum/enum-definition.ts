﻿import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {EnumMemberDefinition} from "./enum-member-definition";
import {INamedDefinition, NamedDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";

export class EnumDefinition implements INamedDefinition, IExportableDefinition {
    private _members: EnumMemberDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    get members() {
        return this._members;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        for (const memberName in symbol.exports) {
            if (symbol.exports.hasOwnProperty(memberName)) {
                const member = symbol.exports[memberName];

                if (EnumMemberDefinition.isEnumMemberDefinition(member)) {
                    this._members.push(new EnumMemberDefinition(typeChecker, member));
                }
                else {
                    console.warn(`Unknown enum member: ${symbol.name}`);
                }
            }
        }
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;

    static isEnumDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.Enum) !== 0;
    }
}

applyMixins(EnumDefinition, [NamedDefinition, ExportableDefinition]);
