"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./src/app"));
const db_config_1 = __importDefault(require("./config/db.config"));
(0, db_config_1.default)();
const port = process.env.PORT;
app_1.default.listen(port, () => {
    console.log(`server listening at port:${port}`);
    // app.post("*", (req, res) => {
    //    console.log(req);
    // });
});
