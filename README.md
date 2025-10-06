# ihasq/ai

AI TypeScript tools compatible with OpenAI API.

```typescript
import { ai } from "@ihasq/ai";
import { stdout } from "node:stdio"

ai.key = "..." // API_KEY

const stream = await ai`list 1 to 10`.stream();

for await(const text of stream) {
	stdout.write(text);
}
```

## Install


```sh
npm i @ihasq/ai
```