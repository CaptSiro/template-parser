"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tokenizer_1 = require("./tokenizer/Tokenizer");
const Parser_1 = require("./parser/Parser");
const t = new Tokenizer_1.Tokenizer("[{BPM}] \\{ {TITLE} \\}");
console.log(t.getTokens());
const p = new Parser_1.Parser("[{BPM}] { \\{ {TITLE} \\}", [
    "BPM",
    "TITLE"
]);
console.log(p.getTemplateConfig());
//# sourceMappingURL=index.js.map