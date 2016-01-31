﻿import {ModuledStructure} from "./../base";
import {ImportStructure} from "./import-structure";
import {ReExportStructure} from "./re-export-structure";
import {ExpressionStructure} from "./../../expressions";
import {NamedStructure, ExportableStructure} from "./../base";

export interface FileStructure extends ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExport?: ExpressionStructure | (NamedStructure & ExportableStructure);
}
