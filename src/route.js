const express = require('express')
const questionController = require('./controllers/questionController');
const roomController = require('./controllers/roomController');

const route = express.Router();


route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
route.get('/create-room', (req, res) => res.render('index', { page: 'create-room' }))
route.get('/room/:room', roomController.open)

route.post('/findroom', roomController.find)
route.post('/create-room', roomController.create)
route.post('/question/create/:roomId', questionController.create)
route.post('/question/:roomId/:questionId/:action', questionController.index)


module.exports = route