import * as assert from "assert";
import {BaseParameter} from "./../../structures";
import {BaseParameterDefinition} from "./../../../../definitions";
import {runNamedDefinitionTests} from "./../../base/run-named-definition-tests";
import {runTypedDefinitionTests} from "./../../base/run-typed-definition-tests";

export function runBaseParameterDefinitionTests(definition: BaseParameterDefinition, param: BaseParameter) {
    describe(`parameter ${param.name}`, () => {
        runNamedDefinitionTests(definition, param.name);
        runTypedDefinitionTests(definition, param.type);

        it(`should be ${param.isOptional ? "optional" : "not optional"}`, () => {
            assert.equal(definition.isOptional, typeof param.isOptional === "boolean" ? param.isOptional : false);
        });

        it(`should ${param.isRestParameter ? "be" : "not be"} a rest parameter`, () => {
            assert.equal(definition.isRestParameter, typeof param.isRestParameter === "boolean" ? param.isRestParameter : false);
        });

        if (param.defaultExpressionText != null) {
            it(`should have the default expression with text '${param.defaultExpressionText}'.`, () => {
                assert.equal(definition.defaultExpression.text, param.defaultExpressionText);
            });
        }
        else {
            it(`should not have a default expression.`, () => {
                assert.equal(definition.defaultExpression, null);
            });
        }
    });
}
