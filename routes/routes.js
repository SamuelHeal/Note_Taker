const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    });
    
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    
    app.get("/api/notes", (req, res) => {
        let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        res.json(notes);
    });
    
    let storedNotes = [];
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
    
    app.delete('/api/notes/:id', (req, res) => {
        let { id } = req.params;
        storedNotes.forEach(function(note){
            if (note.id === id) {
                let changeArr = storedNotes.filter(notes => {
                    return notes.id !== id;
                })
                storedNotes = changeArr;
                fs.writeFile('db/db.json', JSON.stringify(storedNotes), (err) => {
                    err ? console.error(err) : console.log(`Note with ID of ${id} deleted successfully`)
                })
                res.send(id);
            }
        })
    })
}
    



