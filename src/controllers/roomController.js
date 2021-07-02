const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const password = req.body.password
        let roomId
        let isRoom = true
        while (isRoom) {
            let roomsIds = await db.all(`
                SELECT id FROM rooms
            `);
            isRoom = roomsIds.some(roomExistingId => roomsIds === roomId)
            if (!isRoom) {
                roomId = Math.floor(Math.random() * 10)
                for (i = 0; i < 5; i++) {
                    roomId += Math.floor(Math.random() * 10).toString()
                }
                db.exec(`
            INSERT INTO rooms (id, password) 
            values (${parseInt(roomId)}, ${password})
            `)
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room_id=${roomId} AND read=0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room_id=${roomId} AND read=1`)
        let isNoQuestions = false
        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isNoQuestions = true
            }
        }



        res.render('room', { roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions })
    },

    find(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}