var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_1 = require("./base");
var ClassMethodDefinition = (function (_super) {
    __extends(ClassMethodDefinition, _super);
    function ClassMethodDefinition() {
        _super.apply(this, arguments);
    }
    ClassMethodDefinition.isClassMethod = function (symbol) {
        return (symbol.getFlags() & 8192 /* Method */) !== 0;
    };
    return ClassMethodDefinition;
})(base_1.BaseClassMethodDefinition);
exports.ClassMethodDefinition = ClassMethodDefinition;

//# sourceMappingURL=class-method-definition.js.map
