const notesArray = require('./db/db');
const path = require('path');
const fs = require('fs');
const express = require('express');
const everything = require("./routes/routes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

require("./routes/routes")(app)

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'))
// });

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/notes.html'));
// });

// app.get("/api/notes", (req, res) => {
//     let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     res.json(notes);
// });

// let storedNotes = [];
// app.post('/api/notes', (req, res) => {
//     let noteText = req.body;
//     storedNotes.push(noteText);
//     var counter = 1
//     storedNotes.forEach(function(note){
//         let counterString = counter.toString()
//         note.id = counterString;
//         counter++
//     })
//     res.json(noteText);
//     fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
//         if(err) {
//             console.log(err)
//         }
//     })
// });

// app.delete('/api/notes/:id', (req, res) => {
//     let { id } = req.params;
//     storedNotes.forEach(function(note){
//         if (note.id === id) {
//             let changeArr = storedNotes.filter(notes => {
//                 return notes.id !== id;
//             })
//             storedNotes = changeArr;
//             fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
//                 if(err) {
//                     console.log(err)
//                 }
//             })
//             res.send(id);
//         }
//     })
// })


