import {IReturnTypedDefinition} from "./../../../../definitions";
import {runTypeExpressionTests} from "./../../types";

export function runReturnTypedDefinitionTests(definition: IReturnTypedDefinition, name: string) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    runTypeExpressionTests(definition.returnTypeExpression, name);
}
