export default class Task {
    _id: string;
    title: string;
    description: string;
    status: string;

    constructor(
        _id: string,
        title: string,
        description: string,
        status: string
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}