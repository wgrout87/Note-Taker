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
    notesArray.splice(id, 1);
    for (i = 0; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    };
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 4)
    );

    return notesArray;
}

module.exports = {
    createNewNote,
    deleteNote
}