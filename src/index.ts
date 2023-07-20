import { TemplateTokenizer, Tokens } from "./tokenizer/TemplateTokenizer";
import { TemplateParser } from "./parser/TemplateParser";
import template, { IdentAccessor } from "./template";

// const t = new TemplateTokenizer("[{BPM}] \\{ {TITLE} \\}");
// console.log(t.getTokens());

const input = "[{BPM}] {ARTIST} - {TITLE}";
const p = new TemplateParser(input, [
    "BPM",
    "TITLE",
    "ARTIST"
]);

const conf = p.getTemplateConfig();

if (conf.type === "error") {
    console.log(conf.error);

    if (conf.error.suggestion !== undefined) {
        console.log(
            input.substring(0, conf.error.suggestion.start) +
            conf.error.suggestion.replacement +
            input.substring(conf.error.suggestion.end)
        );
    }
} else {
    const accessor: IdentAccessor = ident => {
        return ident[0] + ident.substring(1).toLowerCase();
    }

    console.log(template(conf.config, accessor));
}