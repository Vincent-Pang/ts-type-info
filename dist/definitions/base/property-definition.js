var utils_1 = require("./../../utils");
var named_definition_1 = require("./named-definition");
var type_expressioned_definition_1 = require("./type-expressioned-definition");
var PropertyDefinition = (function () {
    function PropertyDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.isOptional = typeChecker.isOptionalProperty(symbol);
    }
    return PropertyDefinition;
})();
exports.PropertyDefinition = PropertyDefinition;
utils_1.applyMixins(PropertyDefinition, [named_definition_1.NamedDefinition, type_expressioned_definition_1.TypeExpressionedDefinition]);

//# sourceMappingURL=property-definition.js.map
