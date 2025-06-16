"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.ProgramSchema = typebox_1.Type.Object({
    title: typebox_1.Type.String({ minLength: 1 }),
    description: typebox_1.Type.String({ minLength: 1 }),
    whatsAppLink: typebox_1.Type.String({ minLength: 1 }),
    tutor: typebox_1.Type.String({ minLength: 1 }), // Will be validated as ObjectId string
});
