import { Type } from "@sinclair/typebox";

export const RegistrationSchema = Type.Object({
   programId: Type.String({ minLength: 1 }),
   userId: Type.String({ minLength: 1 }),
});

export type RegistrationType = typeof RegistrationSchema.static;
