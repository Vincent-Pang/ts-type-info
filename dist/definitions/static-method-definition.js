var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_method_definition_1 = require("./base/base-method-definition");
var StaticMethodDefinition = (function (_super) {
    __extends(StaticMethodDefinition, _super);
    function StaticMethodDefinition() {
        _super.apply(this, arguments);
    }
    StaticMethodDefinition.isStaticMethod = function (symbol) {
        return (symbol.getFlags() & 8192) !== 0;
    };
    return StaticMethodDefinition;
})(base_method_definition_1.BaseMethodDefinition);
exports.StaticMethodDefinition = StaticMethodDefinition;

//# sourceMappingURL=static-method-definition.js.map
