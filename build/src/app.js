"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.get("corsOrigin"),
}));
const port = config_1.default.get("port");
// parse application/json
app.use(body_parser_1.default.json());
app.listen(port, "0.0.0.0", () => {
    console.log(`Application listening at http://localhost:${port}`);
    (0, db_1.default)();
    (0, routes_1.default)(app);
});
