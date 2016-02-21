import * as tmp from "tmp";
import * as fs from "fs";
import {FileDefinition} from "./definitions";
import {MainCache, StringUtils, Logger, ArrayExt} from "./utils";
import {TsMain} from "./wrappers/ts/ts-main";
import {Options, CompilerOptions} from "./options";

export * from "./options";
export * from "./utils/array-ext";
export * from "./definitions";
export * from "./expressions";

export function getFileInfo(fileNames: string[], options?: Options): ArrayExt<FileDefinition> {
    verifyArray(fileNames);
    options = options || {};

    Logger.toggleEnabled(true || options.showDebugMessages || false); // TODO-CHANGE: REVERT THIS BACK!!

    const tsMain = new TsMain(fileNames, options);
    const mainCache = new MainCache();

    const definitionWithSourceFiles = tsMain.getSourceFiles().map(sourceFile => {
        return {
            definition: mainCache.getFileDefinition(sourceFile),
            sourceFile: sourceFile
        };
    });

    definitionWithSourceFiles.forEach(definitionWithSourceFile => {
        definitionWithSourceFile.definition.fillImports(mainCache, definitionWithSourceFile.sourceFile);
        definitionWithSourceFile.definition.fillReExports(mainCache, definitionWithSourceFile.sourceFile);
    });

    mainCache.fillAllCachedTypesWithDefinitions();

    return new ArrayExt(...definitionWithSourceFiles.map(f => f.definition));
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

