const express = require('express');
const app = express();
const port = process.env.PORT;

// Importo router dei film
const movieRouter = require('./routers/movieRouter');

// Middlewares globali
// Importo middleware cors
const cors = require("cors");
// Importo middleware di gestiore errore 500
const errorsHandler = require("./middlewares/errorsHandler");
// Importo middleware di gestione errore 404
const notFound = require("./middlewares/notFound");
// Importo middleware di gestione path imgs
const imagePathMiddleware = require("./middlewares/imagePath");

// Registro middleware per il CORS che abilita richieste dal frontend
app.use(cors({
    origin: 'http://localhost:5173'
}));
// Registro middleware per gestire path immagini
app.use(imagePathMiddleware);
// Registro cartella public per uso file statici
app.use(express.static('public'));
// Registro il body-parser per "application/json"
app.use(express.json());

// Rotta home APP
app.get('/api', (req, res) => {
    res.send("<h1>Rotta home App dei film</h1>")
})

// Istanza delle rotte relative al router dei film
app.use('/api/movies', movieRouter);


// Registro middlewares di gestione errori 404 e 500
app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})