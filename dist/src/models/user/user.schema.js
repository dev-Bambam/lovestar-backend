"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.UserSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
//main data
exports.UserSchema = typebox_1.Type.Object({
    fullname: typebox_1.Type.String({ minLength: 1 }),
    email: typebox_1.Type.String({ format: "email" }),
    tel: typebox_1.Type.String({ minLength: 11 }),
    password: typebox_1.Type.String({ minLength: 6 }),
    role: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal("student"), typebox_1.Type.Literal("tutor"), typebox_1.Type.Literal("admin")], {
        default: "student",
    })),
});
exports.LoginSchema = typebox_1.Type.Pick(exports.UserSchema, ["email", "password"]);
