const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = function(router) {
    router.post('/api/v1/notes', authMiddleware, noteController.createNote);
    router.get('/api/v1/notes/:id', authMiddleware, noteController.getNoteById);
};