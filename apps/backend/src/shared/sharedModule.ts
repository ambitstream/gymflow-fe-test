import * as sharedModule from "@gymflow/shared";

const runtimeSharedModule = sharedModule as typeof import("@gymflow/shared") & {
  default?: typeof import("@gymflow/shared");
};

const shared = runtimeSharedModule.default ?? runtimeSharedModule;

export const { mockUsers, userFormSchema } = shared;
