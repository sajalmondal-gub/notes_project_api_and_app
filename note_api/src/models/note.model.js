class Note {
    constructor({ id, title, content, user_id, created_at }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = user_id;
        this.createdAt = created_at;
    }
    static fromRequest(body, userId) {
        return new Note({
            id: null,
            title: body.title ? body.title.trim() : '',
            content: body.content ? body.content.trim() : '',
            user_id: userId,
            created_at: new Date()
        });
    }
}

export default Note;