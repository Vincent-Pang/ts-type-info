import * as ts from "typescript";
import * as path from "path";
import * as tmp from "tmp";
import * as fs from "fs";
import {FileDefinition} from "./definitions";
import {TypeChecker, TypeExpressionCache, DefinitionCache, StringUtils, Logger, ArrayExt} from "./utils";
import {WrappedSymbolNode} from "./wrappers";
import {Options, CompilerOptions} from "./options";

export * from "./options";
export {ArrayExt} from "./utils";
export * from "./definitions";
export * from "./expressions";

export function getFileInfo(fileNames: string[], options?: Options): FileDefinition[] {
    verifyArray(fileNames);
    options = options || {};

    Logger.toggleEnabled(options.showDebugMessages || false);

    const compilerOptions = getTsCompilerOptions(options.compilerOptions);
    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram(fileNames, compilerOptions, host);
    const tsTypeChecker = program.getTypeChecker();
    const typeChecker = new TypeChecker(tsTypeChecker);
    const definitionCache = new DefinitionCache(typeChecker);
    const typeExpressionCache = new TypeExpressionCache(typeChecker, definitionCache);

    typeChecker.setTypeCache(typeExpressionCache);

    const definitionWithSymbolNodes = program.getSourceFiles()
        .filter(file => {
            const baseName = path.basename(file.fileName);

            return baseName !== "lib.d.ts" && baseName !== "lib.es6.d.ts";
        })
        .map(file => {
            typeChecker.setCurrentSourceFile(file);

            const fileSymbolNode = new WrappedSymbolNode({
                typeChecker: typeChecker,
                sourceFile: file,
                node: file,
                parentNode: null,
                symbol: typeChecker.getSymbolAtLocation(file)
            });

            return {
                definition: definitionCache.getFileDefinition(fileSymbolNode),
                symbolNode: fileSymbolNode
            };
        });

    definitionWithSymbolNodes.forEach(definitionWithSymbolNode => {
        definitionWithSymbolNode.definition.fillImports(definitionCache, definitionWithSymbolNode.symbolNode);
        definitionWithSymbolNode.definition.fillReExports(definitionCache, definitionWithSymbolNode.symbolNode);
    });

    typeExpressionCache.fillAllCachedTypesWithDefinitions();

    return new ArrayExt(...definitionWithSymbolNodes.map(f => f.definition));
}

export function getStringInfo(code: string, options?: Options): FileDefinition {
    verifyString(code);

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name], options)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}

function verifyArray(fileNames: string[]) {
    if (!(fileNames instanceof Array)) {
        throw new Error("Please provide an array of file names to getFileInfo.");
    }
}

function verifyString(code: string) {
    if (typeof code !== "string") {
        throw new Error("Please provide a string to getStringInfo");
    }
}

function getTsCompilerOptions(compilerOptions: CompilerOptions) {
    function getValue<T>(currentValue: T, newValue: T) {
        return (currentValue == null) ? newValue : currentValue;
    }

    let combinedOptions = (compilerOptions || {}) as any as ts.CompilerOptions;

    combinedOptions.allowNonTsExtensions = getValue(combinedOptions.allowNonTsExtensions, true);
    combinedOptions.noLib = getValue(combinedOptions.noLib, false);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.experimentalDecorators = getValue(combinedOptions.experimentalDecorators, true);
    combinedOptions.suppressExcessPropertyErrors = getValue(combinedOptions.suppressExcessPropertyErrors, true);
    combinedOptions.suppressImplicitAnyIndexErrors = getValue(combinedOptions.suppressImplicitAnyIndexErrors, true);
    combinedOptions.noImplicitAny = getValue(combinedOptions.noImplicitAny, false);

    return combinedOptions;
}
