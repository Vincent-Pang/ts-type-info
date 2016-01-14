import * as assert from "assert";
import {ConstructorStructure} from "./../../structures";
import {ConstructorDefinition} from "./../../../../definitions";
import {runParameteredDefinitionTests} from "./../function";
import {runClassMethodParameterDefinitionTests} from "./run-class-method-parameter-definition-tests";

export function runConstructorDefinitionTests(definition: ConstructorDefinition, structure: ConstructorStructure) {
    if (structure == null) {
        it("should not have a constructor", () => {
            assert.equal(definition, null);
        });
    }
    else {
        it("should have a constructor", () => {
            assert.notEqual(definition, null);
        });

        runParameteredDefinitionTests(runClassMethodParameterDefinitionTests, definition, structure);
    }
}
