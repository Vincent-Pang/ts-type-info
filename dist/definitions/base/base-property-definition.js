var utils_1 = require("./../../utils");
var named_definition_1 = require("./named-definition");
var type_expressioned_definition_1 = require("./type-expressioned-definition");
var BasePropertyDefinition = (function () {
    function BasePropertyDefinition(typeChecker, symbol) {
        this.fillName(symbol);
        this.fillTypeExpression(typeChecker, symbol);
        this.fillIsOptional(typeChecker, symbol);
    }
    BasePropertyDefinition.prototype.fillIsOptional = function (typeChecker, symbol) {
        var declaration = typeChecker.getDeclarationFromSymbol(symbol);
        this.isOptional = declaration != null && declaration.questionToken != null;
    };
    return BasePropertyDefinition;
})();
exports.BasePropertyDefinition = BasePropertyDefinition;
utils_1.applyMixins(BasePropertyDefinition, [named_definition_1.NamedDefinition, type_expressioned_definition_1.TypeExpressionedDefinition]);

//# sourceMappingURL=base-property-definition.js.map
