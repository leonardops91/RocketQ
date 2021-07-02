const Database = require('./config.js')

const initDb = {
    async init() {
        const db = await Database()

        await db.exec(`
        CREATE TABLE IF NOT EXISTS rooms(
            id INTEGER PRIMARY KEY,
            password TEXT
        )
        `);

        await db.exec(`
        CREATE TABLE IF NOT EXISTS questions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            room_id INT,
            CONSTRAINT FK_room_id FOREIGN KEY (room_id) REFERENCES
            rooms(id)
        )
        `)

        await db.close()
    }
}
initDb.init()