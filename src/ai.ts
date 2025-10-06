const defaultConfig = {
	key: undefined,
	think: false,
	type: "string",
	model: "",
	endpoint: ""
}

const ai = new Proxy(
	(promptTSA: TemplateStringsArray, ...promptTVA: any[]) => new Promise(async r => {
		await new Promise(queueMicrotask);

	}),
	{
		set(_, prop, newValue) {

		}
	}
);