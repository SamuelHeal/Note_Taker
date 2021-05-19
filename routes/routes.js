const path = require('path');
const fs = require('fs');

// Exporting all the below code
module.exports = (app) => {
    
    // Getting the index.html file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
    
    // Getting the notes.html file
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    
    // Getting the db.json file
    app.get("/api/notes", (req, res) => {
        let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        res.json(notes);
    });
    
    let storedNotes = [];

    // Function to save notes
    app.post('/api/notes', (req, res) => {
        let noteText = req.body;
        storedNotes.push(noteText);
        var counter = 1
        storedNotes.forEach(function(note){
            let counterString = counter.toString()
            note.id = counterString;
            counter++
        })
        res.json(noteText);
        fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
            err ? console.error(err) : console.log(`Note added!`)
        })
    });
    
    // Function to delete notes
    app.delete('/api/notes/:id', (req, res) => {
        let {id} = req.params
        let currentNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        currentNotes.splice(id-1, 1)
        storedNotes.splice(id-1, 1)
        let newNotes = currentNotes;
        fs.writeFile('db/db.json', JSON.stringify(newNotes), (err) => {
            err ? console.error(err) : console.log(`Note deleted!`)
        })
        res.json(newNotes)
    })
}
    



