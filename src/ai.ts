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
const memo = new WeakMap;

const getTSACache = (key) => {
	if(memo.has(key)) return memo.get(key);
	memo.set(key, value);
	return value;
}

const tsaMemo = Memo((s) => {

});

export function ai(s, ...v) {

	if(

		this === globalThis ||
		!("streamText" in this) ||
		!("streamObject" in this)

	) throw new TypeError("Must bind ai sdk");

	const ref = this;

	const contextCache = tsaMemo(s);

	return {
		context: {},
		text(models) {

		},
	}
}

const context = {
	shots: {
		"How many goats are there?": "resukt"
	}
}