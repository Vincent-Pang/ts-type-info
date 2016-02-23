﻿import {TsBaseOptions, TsBase} from "./ts-base";
import {TsSourceFile} from "./ts-source-file";
import {ISourceFile} from "./../source-file";
import {ISourceFileChild} from "./../source-file-child";

export interface TsSourceFileChildBaseOptions extends TsBaseOptions {
    tsSourceFile: TsSourceFile;
}

export class TsSourceFileChildBase extends TsBase implements ISourceFileChild {
    protected tsSourceFile: TsSourceFile;

    constructor(opts: TsSourceFileChildBaseOptions) {
        super(opts);

        this.tsSourceFile = opts.tsSourceFile;
    }

    getSourceFile(): ISourceFile {
        return this.tsSourceFile;
    }
}