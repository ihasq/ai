import { OpenAI } from "openai";

// const defaultConfig = {
// 	key: undefined,
// 	think: false,
// 	type: "string",
// 	model: "",
// 	endpoint: ""
// }

// const ai = new Proxy(
// 	(promptTSA: TemplateStringsArray, ...promptTVA: any[]) => new Promise(async r => {
// 		await new Promise(queueMicrotask);

// 	}),
// 	{
// 		set(_, prop, newValue) {

// 		}
// 	}
// );

class AI {
	constructor(openAICompatibleEndpoint: string) {
		return function(instructionTSA: TemplateStringsArray, instructionValues: any[]) {
			const promise = new Promise(async r => {
				queueMicrotask;
				
			});
			const proxy = new Proxy(promise, {
				get(_, prop) {

				}
			});
		}
	}
}

class Chat extends AI {

}

const Gemini = function(version: string) {

}