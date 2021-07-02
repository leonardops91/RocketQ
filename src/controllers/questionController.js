const { create } = require("./roomController")
const Database = require("../db/config")

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.roomId
        const questionId = req.params.questionId
        const action = req.params.action
        const password = req.body.password

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if (verifyRoom.password == password) {
            if (action == "check") {
                await db.run(`UPDATE questions SET read=1 WHERE id=${questionId}`)
            } else if (action == "delete") {
                await db.run(`DELETE FROM questions WHERE id=${questionId}`)
            }
        }
        await db.close()

        if (verifyRoom.password == password) {
            res.redirect(`/room/${roomId}`)
        } else (
            res.render('passIncorrect', { roomId: roomId })
        )


    },

    async create(req, res) {
        const db = await Database()
        const title = req.body.question
        const read = 0
        const roomId = req.params.roomId

        console.log(title, read)

        await db.exec(`
            INSERT INTO questions (title, read, room_id)
            values ("${title}", ${read}, ${roomId})
        `)

        db.close()

        res.redirect(`/room/${roomId}`)
    }
}