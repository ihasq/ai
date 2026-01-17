# ihasq/ai

AI TypeScript snippet works with AI SDK Core.

```typescript
import { ai } from "@ihasq/ai";

import * as sdk from "ai";
import { google } from "@ai-sdk/google"
import { write } from "node:process/stdout"


// 0. Bind AI SDK Core

ai.bind(sdk);


// 1. Build your context

const context = ai`sum 1 and 2. if you want to add two number, call ${(a, b) => a + b}.`;


// 2. Display output

for await(const text of context.text(google('gemini-3-flash-preview'))) write(text);
```

## Install

```sh
npm i @ihasq/ai
```
