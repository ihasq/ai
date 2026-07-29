export type AnyFunction = (...args: any[]) => any;

export type TextStream = AsyncIterable<string>;

/**
 * The small portion of AI SDK Core used by this module.
 * `ai.bind(sdk)` accepts the namespace imported with `import * as sdk from "ai"`.
 */
export interface AISDK {
  streamText(options: Record<string, unknown>): {
    readonly textStream: TextStream;
  };

  jsonSchema(schema: Record<string, unknown>): unknown;

  stepCountIs?(count: number): unknown;
}

export interface AIContext {
  readonly prompt: string;
  readonly tools: Readonly<Record<string, AnyFunction>>;

  text(model: unknown): TextStream;
}

export interface AITag {
  (
    strings: TemplateStringsArray,
    ...values: readonly unknown[]
  ): AIContext;

  bind(sdk: AISDK): void;
}

let boundSDK: AISDK | undefined;

/**
 * Tool names begin with `_`, followed by a sufficiently random integer.
 * Base 36 keeps the generated identifier compact and tool-name-safe.
 */
function functionID(): string {
  return `_${Math.floor(
    Math.random() * Number.MAX_SAFE_INTEGER,
  ).toString(36)}`;
}

function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}

function compile(
  strings: TemplateStringsArray,
  values: readonly unknown[],
): {
  prompt: string;
  tools: Record<string, AnyFunction>;
} {
  let prompt = "";
  const tools: Record<string, AnyFunction> = Object.create(null);

  for (let index = 0; index < strings.length; index += 1) {
    prompt += strings[index];

    if (index >= values.length) continue;

    const value = values[index];

    if (isFunction(value)) {
      const id = functionID();

      tools[id] = value;
      prompt += `function ${id}`;
    } else {
      prompt += String(value);
    }
  }

  return { prompt, tools };
}

/**
 * AI SDK tools are objects at the type level. JavaScript functions are objects too,
 * so a callable wrapper can carry `inputSchema`, `description`, and `execute`.
 */
function toSDKTool(
  sdk: AISDK,
  id: string,
  fn: AnyFunction,
): AnyFunction {
  const callable = ((...args: unknown[]) => fn(...args)) as AnyFunction & {
    description?: string;
    inputSchema?: unknown;
    execute?: (input: { args: unknown[] }) => unknown;
  };

  callable.description = `Call function ${id}. Pass positional arguments in args.`;
  callable.inputSchema = sdk.jsonSchema({
    type: "object",
    properties: {
      args: {
        type: "array",
        description: `The ${fn.length} positional argument(s) for function ${id}.`,
        items: {},
        minItems: fn.length,
        maxItems: fn.length,
      },
    },
    required: ["args"],
    additionalProperties: false,
  });
  callable.execute = ({ args }) => fn(...args);

  return callable;
}

function createContext(
  prompt: string,
  functions: Record<string, AnyFunction>,
): AIContext {
  return Object.freeze({
    prompt,
    tools: Object.freeze(functions),

    text(model: unknown): TextStream {
      const sdk = boundSDK;

      if (!sdk) {
        throw new Error("@ihasq/ai is not bound. Call ai.bind(sdk) first.");
      }

      const tools = Object.fromEntries(
        Object.entries(functions).map(([id, fn]) => [
          id,
          toSDKTool(sdk, id, fn),
        ]),
      );

      const options: Record<string, unknown> = {
        model,
        prompt,
      };

      if (Object.keys(tools).length > 0) {
        options.tools = tools;

        // Permit a tool call followed by the model's final textual answer.
        if (sdk.stepCountIs) {
          options.stopWhen = sdk.stepCountIs(8);
        }
      }

      return sdk.streamText(options).textStream;
    },
  });
}

const tag = (
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
): AIContext => {
  const { prompt, tools } = compile(strings, values);
  return createContext(prompt, tools);
};

Object.defineProperty(tag, "bind", {
  configurable: false,
  enumerable: false,
  writable: false,
  value(sdk: AISDK): void {
    if (
      !sdk ||
      typeof sdk.streamText !== "function" ||
      typeof sdk.jsonSchema !== "function"
    ) {
      throw new TypeError(
        "ai.bind() expects the AI SDK namespace with streamText() and jsonSchema().",
      );
    }

    boundSDK = sdk;
  },
});

export const ai = tag as unknown as AITag;
