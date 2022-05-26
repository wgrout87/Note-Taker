const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 4)
    );

    console.log(path.join(__dirname, '../db/db.json'));
    return note;
};

module.exports = {
    createNewNote
}