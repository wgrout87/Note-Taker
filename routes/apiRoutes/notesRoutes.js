const router = require('express').Router();
const res = require('express/lib/response');
const notes = require('../../db/db.json');
const { createNewNote, deleteNote } = require('../../lib/helperFunctions');

// GET route for fetch requests. Returns the array of saved notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// POST route for fetch requests. Modifies the saved array, but does not return any data
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    createNewNote(req.body, notes);
    
    res.end();
});

// DELETE route for fetch requests. Modifies the saved array, but does not return any data
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);

    res.end();
})

module.exports = router;