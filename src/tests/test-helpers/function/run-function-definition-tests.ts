import {Function} from "./../structures";
import {FunctionDefinition} from "./../../../definitions";
import {runNamedDefinitionTests, runExportableDefinitionTests} from "./../base";
import {runReturnTypedDefinitionTests, runParameteredDefinitionTests} from "./base";

export function runFunctionDefinitionTests(definition: FunctionDefinition, func: Function) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${func.name}`, () => {
        runNamedDefinitionTests(definition, func.name);
        runExportableDefinitionTests(definition, func.isExported);
        runReturnTypedDefinitionTests(definition, func.returnType);
        runParameteredDefinitionTests(definition, func.parameters);
    });
}
