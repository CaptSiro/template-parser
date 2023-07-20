import { Tokenizer, Tokens } from "./tokenizer/Tokenizer";
import { Parser } from "./parser/Parser";

const t = new Tokenizer("[{BPM}] \\{ {TITLE} \\}");
console.log(t.getTokens());

const p = new Parser("[{BPM}] \\{ {TITLE} \\}", [
    "BPM",
    "TITLE"
]);
console.log(p.getTemplateConfig());