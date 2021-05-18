const notesArray = require('./db/db');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

let storedNotes = [];
if(notesArray.length < 0) {
    notesArray.forEach(function(note) {
        storedNotes.push(note);
    })
}

app.post('/api/notes', (req, res) => {
    const noteText = req.body;
    storedNotes.push(noteText);
    var counter = 1
    storedNotes.forEach((note) => {
        var counterString = counter.toString()
        note.id = counterString;
        counter++
    })
    res.json(noteText);
    fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
        if(err) {
            console.log(err)
        }
    })
});

app.get('/api/notes', (req, res) => {
    if(notesArray) {
        fs.readFile('db/db.json', (err, data) => {
            if (err) throw err;
            res.send(data);
        })
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    storedNotes.forEach(note => {
        if (note.id === id) {
            let changeArr = storedNotes.filter(notes => {
                return notes.id !== id;
            })
            storedNotes = changeArr;
            fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
                if(err) {
                    console.log(err)
                }
            })
            res.send(id);
        }
    })
})
