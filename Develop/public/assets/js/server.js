const { response } = require('express')
const express = require('express')
const fs = require('fs')
const path = require('path')
const { report } = require('process')

const app = express()
const PORT = process.env.PORT || 6000

const notes = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))

app.get('/api/notes', (req, res) => {
	let data = JSON.parse(fs.readFile('./db/db.json', 'utf8'))
	res.json(data)
})

app.post('/api/notes', (req, res) => {
	const newNote = req.body

	let data = JSON.parse(fs.readFile('./db/db.json', 'utf8'))

	data.push(newNote)

	fs.writeFile('./db/db.json', JSON.stringify(data))

	res.json(data)
})



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
