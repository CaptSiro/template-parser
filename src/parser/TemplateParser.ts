import { Token, TemplateTokenizer, Tokens } from "../tokenizer/TemplateTokenizer";

type IdentToken = {
    type: "IDENT",
    literal: string
}

export type Config = (Token | IdentToken)[];

export type ConfigError = {
    type: "error",
    error: {
        message: string
    }
}

export type ConfigSuccess = {
    type: "success",
    config: Config
}

function createIdent(literal: string): IdentToken {
    return {
        type: "IDENT",
        literal
    };
}



export class TemplateParser {
    private tokenizer: TemplateTokenizer;
    private identifiers: string[];

    constructor(input: string, identifiers: string[]) {
        this.tokenizer = new TemplateTokenizer(input);
        this.identifiers = identifiers;
    }

    getTemplateConfig(): ConfigError | ConfigSuccess {
        const tokens = this.tokenizer.getTokens();
        const config: (Token | IdentToken)[] = [];

        for (let i = 0; i < tokens.length; i++) {
            switch (tokens[i].type) {
                case "{": {
                    const isIdentifier = tokens[i + 1]?.type === Tokens.Text && tokens[i + 2]?.type === Tokens.RightSquirly;

                    if (!isIdentifier) {
                        return {
                            type: "error",
                            error: {
                                message: "Invalid identifier expression"
                            }
                        };
                    }

                    if (!this.identifiers.includes(tokens[i + 1].literal)) {
                        return {
                            type: "error",
                            error: {
                                message: "Unknown identifier"
                            }
                        };
                    }

                    config.push(createIdent(tokens[i + 1].literal));
                    i += 2;
                    break;
                }
                case "TEXT":
                    config.push(tokens[i]);
                    break;
                case "ILLEGAL":
                    return {
                        type: "error",
                        error: {
                            message: `Illegal token '${tokens[i].literal}'`
                        }
                    };
            }
        }

        return {
            type: "success",
            config
        };
    }
}