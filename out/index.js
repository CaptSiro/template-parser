"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateParser_1 = require("./parser/TemplateParser");
const template_1 = __importDefault(require("./template"));
function main() {
    // template defined with placeholders "{placeholder_identifier}"
    // use backslash '\' to escape bracket
    const input = "\\\\{{USER_NAME}\\}: {USER_EMAIL}";
    // creating a parser object, that takes all identifiers as a second argument
    const parser = new TemplateParser_1.TemplateParser(input, [
        "USER_NAME",
        "USER_EMAIL"
    ]);
    // returns typed object
    //   type: "error" -> contains error object with a message and optional suggestion
    //   type: "success" -> contains config object
    const result = parser.getTemplateConfig();
    if (result.type === "error") {
        // handle error
        return;
    }
    // JSON serializable array of objects defining template
    const config = result.config;
    const user = {
        name: "CaptSiro",
        email: "example@email.com",
        accessor: (identifier) => {
            switch (identifier) {
                case "USER_NAME": return user.name;
                case "USER_EMAIL": return user.email;
            }
            return "";
        }
    };
    const string = (0, template_1.default)(config, user.accessor);
    console.log(string); // {CaptSiro}: example@gmail.com
}
main();
//# sourceMappingURL=index.js.map