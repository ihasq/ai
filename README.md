# ihasq/ai

AI TypeScript tools compatible with OpenAI API.

```typescript
import { AI } from "@ihasq/ai";
import { google } from "@ai-sdk/google"
import { stdout, env } from "node:process"

const gemini = new AI(google('gemini-2.5-flash'), env.GEMINI_API_KEY, {
    system: ""
});

const stream = await gemini`sum 1 and 2. if you want to add two number, call ${(a, b) => a + b}.`;

for await(const text of stream) {
	stdout.write(text);
}
```

## Install

```sh
npm i @ihasq/ai
```
