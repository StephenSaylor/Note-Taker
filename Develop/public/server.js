const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 6000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))