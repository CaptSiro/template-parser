export const Tokens = {
    Illegal: "ILLEGAL",
    EOF: "EOF",
    LeftSquirly: "{",
    RightSquirly: "}",
    Text: "TEXT"
} as const;

type TokenItem = typeof Tokens[keyof typeof Tokens];

export type Token = {
    type: TokenItem,
    literal: string;
}

function createToken(type: TokenItem, literal: string): Token {
    return { type, literal };
}



export class TemplateTokenizer {
    private position: number = 0;
    private readPosition: number = 0;
    private char: string = "\0";

    constructor(private input: string) {}

    private readChar() {
        if (this.readPosition >= this.input.length) {
            this.char = "\0";
        } else {
            this.char = this.input[this.readPosition];
        }

        this.position = this.readPosition;
        this.readPosition++;
    }

    private peek(offset: number = 0): string {
        const pos = this.readPosition + offset;
        return pos < this.input.length
            ? this.input[pos]
            : "\0";
    }

    nextToken() {
        this.readChar();

        let token: Token;
        switch (this.char) {
            case "\0": return createToken(Tokens.EOF, this.char);
            case "\\":
                const next = this.peek();
                if (next === "{" || next === "}") {
                    this.readChar();
                    return createToken(Tokens.Text, this.char);
                }

                return createToken(Tokens.Text, this.char);
            case "{": return createToken(Tokens.LeftSquirly, this.char);
            case "}": return createToken(Tokens.RightSquirly, this.char);
            default: return createToken(Tokens.Text, this.char);
        }
    }

    getTokens(): Token[] {
        const tokens: Token[] = [];

        while (true) {
            const token = this.nextToken();

            const doConcatTextTokens = tokens[tokens.length - 1]?.type === Tokens.Text && token.type === Tokens.Text;
            if (doConcatTextTokens) {
                tokens[tokens.length - 1].literal += token.literal;
                continue;
            }

            if (token.type === Tokens.EOF) {
                break
            }

            tokens.push(token);
        }

        return tokens;
    }
}