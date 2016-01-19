﻿import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition} from "./../base";
import {NamedDefinition} from "./../base/named-definition";
import {TypeExpressionedDefinition} from "./../base/type-expressioned-definition";
import {ExportableDefinition} from "./../base/exportable-definition";
import {DefaultExpressionedDefinition} from "./../base/default-expressioned-definition";
import {Expression, TypeExpression} from "./../../expressions";

export class VariableDefinition implements INamedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    constructor(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillDefaultExpression(typeChecker, symbol);
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // TypeExpressionedDefinition
    fillTypeExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    typeExpression: TypeExpression;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);