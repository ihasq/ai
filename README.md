# ihasq/ai

AI TypeScript tools compatible with AI SDK by Vercel.

```typescript
import { ai } from "@ihasq/ai";
import { google } from "@ai-sdk/google"
import { write } from "node:process/stdout"


// 1. Build your context

const context = ai`sum 1 and 2. if you want to add two number, call ${(a, b) => a + b}.`;


// 2. Display output

for await(const text of output.text()) write(text);
```

## Install

```sh
npm i @ihasq/ai
```