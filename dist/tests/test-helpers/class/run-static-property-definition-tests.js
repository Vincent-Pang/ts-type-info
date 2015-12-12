var base_1 = require("./../base");
function runStaticPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("property " + property.name, function () {
        base_1.runBasePropertyDefinitionTests(definition, property);
    });
}
exports.runStaticPropertyDefinitionTests = runStaticPropertyDefinitionTests;

//# sourceMappingURL=run-static-property-definition-tests.js.map
