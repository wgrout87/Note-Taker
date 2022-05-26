const fs = require('fs');
const path = require('path');

// Function for adding new note to the saved array of notes
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    // Saves the array of notes to include the new one
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 4)
    );
};

// Function for deleting a note from the saved notes
function deleteNote(id, notesArray) {
    notesArray.splice(id, 1);
    for (i = 0; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    };
    // Saves the array of notes without the deleted note
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 4)
    );
}

module.exports = {
    createNewNote,
    deleteNote
}