// Importo file di connessione al DB
const connection = require('../data/db');

// GET (index)
function index(req, res) {
    // Preparo la query
    const sql = 'SELECT * FROM movies';

    // Eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // Creo copia dei risultato con modifica path imgs
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);
    });

}

// GET (show) per ottenere un post
function show(req, res) {
    // Recupero id da param dinamico
    const { id } = req.params;

    // Preparo la query per la richiesta
    const moviesSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // Chiamata a DB principale per recuperare il film
    connection.query(moviesSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Recupero il film
        const movie = movieResults[0];
        // Aggiungo path img dal middleware
        movie.image = req.imagePath + movie.image;

        // Seconda chiamata a DB per recupero reviews del film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungo a oggetto film la prop per le reviews
            movie.reviews = reviewsResults;

            // Ritorno il json del film
            res.json(movie);
        });
    });
}

module.exports = { index, show }