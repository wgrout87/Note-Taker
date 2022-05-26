const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 4)
    );

    return note;
};

function deleteNote(id, notesArray) {
    const noteId = id;
    let filteredNotes = notesArray.filter(element => element.id !== noteId);
    for (i = 0; i < filteredNotes.length; i++) {
        filteredNotes[i].id = i.toString();
    };
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(filteredNotes, null, 4)
    );

    return filteredNotes;
}

module.exports = {
    createNewNote,
    deleteNote
}