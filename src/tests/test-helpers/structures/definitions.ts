﻿export * from "./definitions/base";
export * from "./definitions/general";
export * from "./definitions/class";
export * from "./definitions/enum";
export * from "./definitions/file";
export * from "./definitions/function";
export * from "./definitions/interface";
export * from "./definitions/namespace";
export * from "./definitions/variable";

import {FileStructure} from "./definitions/file";
import {FunctionStructure, FunctionParameterStructure, CallSignatureStructure, CallSignatureParameterStructure} from "./definitions/function";
import {InterfaceStructure, InterfaceMethodParameterStructure, InterfaceMethodStructure,
        InterfaceNewSignatureParameterStructure, InterfacePropertyStructure, InterfaceNewSignatureStructure} from "./definitions/interface";
import {ClassStructure, ClassMethodParameterStructure, ClassStaticMethodParameterStructure, ClassMethodStructure, ClassPropertyStructure,
        ClassStaticMethodStructure, ClassStaticPropertyStructure, ClassConstructorStructure, ClassConstructorParameterStructure} from "./definitions/class";
import {EnumStructure} from "./definitions/enum";
import {NamespaceStructure} from "./definitions/namespace";
import {VariableStructure} from "./definitions/variable";

export type WriteableStructures = FileStructure | NamespaceStructure | ClassStructure| InterfaceStructure | FunctionStructure | EnumStructure | VariableStructure;
export type FunctionStructures = FunctionStructure | InterfaceMethodStructure | ClassMethodStructure;
export type ClassMethodStructures = ClassMethodStructure | ClassStaticMethodStructure;
export type ClassMethodParameterStructures = ClassMethodParameterStructure | ClassStaticMethodParameterStructure;
export type ParameterStructures = FunctionParameterStructure | InterfaceMethodParameterStructure | ClassMethodParameterStructure | ClassStaticMethodParameterStructure |
                                   InterfaceNewSignatureParameterStructure | ClassConstructorParameterStructure | CallSignatureParameterStructure;
export type ParameteredStructures = FunctionStructure | InterfaceMethodStructure | ClassMethodStructure | InterfaceNewSignatureStructure | ClassConstructorStructure |
                                     CallSignatureStructure;
export type PropertyStructures = InterfacePropertyStructure | ClassPropertyStructure | ClassStaticPropertyStructure;
export type MethodStructures = InterfaceMethodStructure | ClassMethodStructure;
export type MethodParameterStructures = InterfaceMethodParameterStructure | ClassMethodParameterStructure;
export type MainStructures = ClassStructure | FunctionStructure | InterfaceStructure | EnumStructure | NamespaceStructure | VariableStructure;
export type ExportedStructures = ClassStructure | FunctionStructure | InterfaceStructure | EnumStructure | NamespaceStructure | VariableStructure;
export type DecoratedStructures = ClassStructure | ClassMethodStructure | ClassPropertyStructure | ClassStaticMethodStructure | ClassStaticPropertyStructure |
                                    ClassMethodParameterStructure;
