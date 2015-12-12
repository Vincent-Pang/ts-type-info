import * as assert from "assert";
import {BaseParameter} from "./../../structures";
import {BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../../base/run-named-definition-tests";
import {runTypedDefinitionTests} from "./../../base/run-typed-definition-tests";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition, param: BaseParameter) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`parameter ${param.name}`, () => {
        runNamedDefinitionTests(definition, param.name);
        runTypedDefinitionTests(definition, param.type);

        it(`should be ${!param.isRequired ? "required" : "not required"}`, () => {
            assert.equal(definition.isRequired, typeof param.isRequired === "boolean" ? param.isRequired : true);
        });

        it(`should ${param.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
            assert.equal(definition.isRestParameter, typeof param.isRestParameter === "boolean" ? param.isRestParameter : false);
        });
    });
}
