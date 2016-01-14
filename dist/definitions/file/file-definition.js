var utils_1 = require("./../../utils");
var base_1 = require("./../base");
var re_export_definition_1 = require("./re-export-definition");
var import_definition_1 = require("./import-definition");
var FileDefinition = (function () {
    function FileDefinition(typeChecker, definitionCache, file) {
        this._imports = [];
        this._reExports = [];
        this._fileName = file.fileName;
        this.fillMembersBySourceFile(typeChecker, definitionCache, file);
    }
    FileDefinition.prototype.fillImports = function (typeChecker, definitionCache, file) {
        for (var _i = 0, _a = typeChecker.getFileImportSymbols(file); _i < _a.length; _i++) {
            var fileImportSymbol = _a[_i];
            var importDefinition = definitionCache.getDefinition(fileImportSymbol);
            /* istanbul ignore else */
            if (importDefinition != null) {
                this._imports.push(new import_definition_1.ImportDefinition(definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileImportSymbol)), importDefinition));
            }
            else {
                console.warn("Not implemented import symbol: " + fileImportSymbol.name);
            }
        }
    };
    FileDefinition.prototype.fillReExports = function (typeChecker, definitionCache, file) {
        for (var _i = 0, _a = typeChecker.getFileReExportSymbols(file); _i < _a.length; _i++) {
            var fileReExportSymbol = _a[_i];
            var exportDefinition = definitionCache.getDefinition(fileReExportSymbol);
            /* istanbul ignore else */
            if (exportDefinition != null) {
                this._reExports.push(new re_export_definition_1.ReExportDefinition(definitionCache.getFileDefinition(typeChecker.getSourceFileOfSymbol(fileReExportSymbol)), exportDefinition));
            }
            else {
                console.warn("Not implemented re-export symbol: " + fileReExportSymbol.name);
            }
        }
    };
    Object.defineProperty(FileDefinition.prototype, "fileName", {
        get: function () {
            return this._fileName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDefinition.prototype, "imports", {
        get: function () {
            return this._imports;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileDefinition.prototype, "reExports", {
        get: function () {
            return this._reExports;
        },
        enumerable: true,
        configurable: true
    });
    return FileDefinition;
})();
exports.FileDefinition = FileDefinition;
utils_1.applyMixins(FileDefinition, [base_1.ModuledDefinition]);

//# sourceMappingURL=file-definition.js.map
