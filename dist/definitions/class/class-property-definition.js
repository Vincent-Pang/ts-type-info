var __extends = (this && this.__extends)/* istanbul ignore next */ || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var base_1 = require("./base");
var ClassPropertyDefinition = (function (_super) {
    __extends(ClassPropertyDefinition, _super);
    function ClassPropertyDefinition(typeChecker, symbol) {
        _super.call(this, typeChecker, symbol);
        this.fillAccessorInformation(symbol);
    }
    Object.defineProperty(ClassPropertyDefinition.prototype, "isAccessor", {
        get: function () {
            return this._isAccessor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassPropertyDefinition.prototype, "isReadonly", {
        get: function () {
            return this._isReadonly;
        },
        enumerable: true,
        configurable: true
    });
    ClassPropertyDefinition.prototype.fillAccessorInformation = function (symbol) {
        var flags = symbol.getFlags();
        this._isAccessor = (flags & 32768 /* GetAccessor */) !== 0;
        this._isReadonly = this._isAccessor && (flags & 65536 /* SetAccessor */) === 0;
    };
    ClassPropertyDefinition.isProperty = function (symbol) {
        var flags = symbol.getFlags();
        return (flags & 4 /* Property */) !== 0 ||
            (flags & 32768 /* GetAccessor */) !== 0;
    };
    return ClassPropertyDefinition;
})(base_1.BaseClassPropertyDefinition);
exports.ClassPropertyDefinition = ClassPropertyDefinition;

//# sourceMappingURL=class-property-definition.js.map
