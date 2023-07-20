"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateParser_1 = require("./parser/TemplateParser");
const template_1 = __importDefault(require("./template"));
// const t = new TemplateTokenizer("[{BPM}] \\{ {TITLE} \\}");
// console.log(t.getTokens());
const p = new TemplateParser_1.TemplateParser("[{BPM}] {ARTIST} - {TITLE}", [
    "BPM",
    "TITLE",
    "ARTIST"
]);
const conf = p.getTemplateConfig();
if (conf.type === "error") {
    console.error(conf.error.message);
}
else {
    const accessor = ident => {
        return ident[0] + ident.substring(1).toLowerCase();
    };
    console.log((0, template_1.default)(conf.config, accessor));
}
//# sourceMappingURL=index.js.map