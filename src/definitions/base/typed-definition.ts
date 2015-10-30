import * as ts from "typescript";
import {Type} from "./../../types";
import {TypeChecker, Serializable} from "./../../utils";

export interface ITypedDefinition {
    fillType(typeChecker: TypeChecker, symbol: ts.Symbol): void;
    type: Type;
}

export abstract class TypedDefinition {
    private _type: Type;

    fillType(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._type = typeChecker.getTypeOfSymbol(symbol);
    }

    @Serializable
    get type() {
        return this._type;
    }
}
