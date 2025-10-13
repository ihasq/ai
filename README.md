# ihasq/ai

AI TypeScript tools compatible with OpenAI API.

```typescript
import { AI, Gemini } from "@ihasq/ai";
import { stdout, env } from "node:process"

const gemini = new AI('gemini-2.5-flash', env.GEMINI_API_KEY);

const stream = await gemini`Let me know what you can.`.stream('text');

for await(const text of stream) {
	stdout.write(text);
}
```

## Install

```sh
npm i @ihasq/ai
```