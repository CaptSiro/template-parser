import { TemplateTokenizer, Tokens } from "./tokenizer/TemplateTokenizer";
import { TemplateParser } from "./parser/TemplateParser";
import template, { IdentAccessor } from "./template";

// const t = new TemplateTokenizer("[{BPM}] \\{ {TITLE} \\}");
// console.log(t.getTokens());

const p = new TemplateParser("[{BPM}] {ARTIST} - {TITLE}", [
    "BPM",
    "TITLE",
    "ARTIST"
]);

const conf = p.getTemplateConfig();

if (conf.type === "error") {
    console.error(conf.error.message);
} else {
    const accessor: IdentAccessor = ident => {
        return ident[0] + ident.substring(1).toLowerCase();
    }

    console.log(template(conf.config, accessor));
}