export default class Task {

	constructor (readonly title: string, readonly content: string, readonly list: string) {}

	static async create (title: string, content: string, list: string) {
		return new Task(title, content, list);
	}
}