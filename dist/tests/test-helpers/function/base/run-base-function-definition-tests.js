var run_named_definition_tests_1 = require("./../../base/run-named-definition-tests");
var run_return_typed_definition_tests_1 = require("./../run-return-typed-definition-tests");
var run_parametered_definition_tests_1 = require("./../run-parametered-definition-tests");
function runBaseFunctionDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("method " + func.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, func.name);
        run_return_typed_definition_tests_1.runReturnTypedDefinitionTests(definition, func.returnType);
        run_parametered_definition_tests_1.runParameteredDefinitionTests(definition, func.parameters);
    });
}
exports.runBaseFunctionDefinitionTests = runBaseFunctionDefinitionTests;

//# sourceMappingURL=run-base-function-definition-tests.js.map
