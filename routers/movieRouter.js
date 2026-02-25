const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Rotte

// Rotta di index del film
router.get('/', movieController.index);

// Rotta di show del film
router.get('/:id', movieController.show);

// Rotta di store di una recensione
router.post('/:id/reviews', movieController.store);

module.exports = router;