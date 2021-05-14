const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const notes = []


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))

app.get('/api/notes', (req, res) => {
	const data = getData()
	res.json(data)
})

app.post('/api/notes', (req, res) => {
	const newNote = req.body
	const data = getData()
	data.push(newNote)
	saveData(data)
	fs.writeFile('./db/db.json', JSON.stringify(data))
	res.json(data)
})

function getData() {
	const text = fs.readFileSync('./db/db.json')
	return JSON.parse(text)
}

function saveData(data) {
	fs.writeFileSync('./db/db.json', JSON.stringify(data))
}

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
