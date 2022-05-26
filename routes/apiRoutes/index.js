const router = require('express').Router();
const notesRoutes = require('./notesRoutes');

// Uses the notesRoutes scripts for certain API endpoints. Other routes could easily be added here and kept modularized if new endpoints were ever added
router.use(notesRoutes);

module.exports = router;