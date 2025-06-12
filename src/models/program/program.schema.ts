import { Type } from "@sinclair/typebox";

export const ProgramSchema = Type.Object({
   title: Type.String({ minLength: 1 }),
   description: Type.String({ minLength: 1 }),
   whatsAppLink: Type.String({ minLength: 1 }),
   tutor: Type.String({ minLength: 1 }), // Will be validated as ObjectId string
});

export type ProgramType = typeof ProgramSchema.static;
