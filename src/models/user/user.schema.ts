import { Type } from "@sinclair/typebox";

//main data
export const UserSchema = Type.Object({
    fullname: Type.String({ minLength: 1 }),
    email: Type.String({ format: "email" }),
    tel: Type.String({ minLength: 11 }),
    password: Type.String({ minLength: 6 }),
    role: Type.Union([
        Type.Literal('student'),
        Type.Literal('tutor'),
        Type.Literal('admin'),
    ], {default:"student"})
})

export type UserType = typeof UserSchema.static;

export const LoginSchema = Type.Pick(UserSchema, ['email', 'password'])
export type LoginType = typeof LoginSchema.static