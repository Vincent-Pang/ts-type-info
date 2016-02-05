﻿import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IParentedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {EnumDefinition} from "./enum-definition";

export class EnumMemberDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<EnumDefinition> {
    value: number;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, parent: EnumDefinition) {
        super(DefinitionType.EnumMember);
        this.fillName(typeChecker, symbol);
        this.value = typeChecker.getConstantValue(symbol);
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    // IParentedDefinition
    parent: EnumDefinition;
}

applyMixins(EnumMemberDefinition, [NamedDefinition]);
