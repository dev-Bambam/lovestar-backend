"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.RegistrationSchema = typebox_1.Type.Object({
    programId: typebox_1.Type.String({ minLength: 1 }),
    userId: typebox_1.Type.String({ minLength: 1 }),
});
