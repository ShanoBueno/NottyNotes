
const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

function createNewNote(body, notesArray) {
  console.log(body);
  const animal = body;
  notesArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return notes;
}


app.get('/api/notes', (req, res) => {

  res.json(notes);
});

app.post('/api/notes', (req, res) => { 
  req.body.id = notes.length.toString();
  
  const note = createNewNote(req.body, notes)
  res.json(note);
 
});




app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});