import { Tokenizer, Tokens } from "./tokenizer/Tokenizer";

const t = new Tokenizer("[{BPM}] \\{ {TITLE} \\}");
console.log(t.getTokens());