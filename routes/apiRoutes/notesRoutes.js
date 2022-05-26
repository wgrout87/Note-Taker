const router = require('express').Router();
const res = require('express/lib/response');
const notes = require('../../db/db.json');
const { createNewNote, deleteNote } = require('../../lib/helperFunctions');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const deletedFromArray = deleteNote(req.params.id, notes)

    res.json(deletedFromArray);
})

module.exports = router;