# Template Parser
Compiler for simple templates that should only contain certain identifiers

```typescript
// template defined with placeholders "{placeholder_identifier}"
// use backslash '\' to escape bracket (it does not need to be escaped to use it as standalone character)
const input = "\\{{USER_NAME}\\}: {USER_EMAIL}\\"

// creating a parser object, that takes all identifiers as an argument
const parser = new TemplateParser([
    "USER_NAME",
    "USER_EMAIL"
]);

// returns typed object
//   type: "error" -> contains error object with a message and optional suggestion
//   type: "success" -> contains config object
const result = parser.parse(input);

if (result.type === "error") {
    // handle error
    return;
}

// JSON serializable array of objects defining template
const config = result.config;

const user = {
    name: "CaptSiro",
    email: "example@email.com",
    accessor: (identifier: string): string => {
        switch (identifier) {
            case "USER_NAME": return user.name;
            case "USER_EMAIL": return user.email;
        }

        return "";
    }
};

const string = template(config, user.accessor);

console.log(string) // {CaptSiro}: example@gmail.com\
```