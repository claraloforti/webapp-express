const express = require('express');
const app = express();
const port = process.env.PORT;

// Importo middleware cors
const cors = require("cors");
// Middleware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Importo router dei film
const movieRouter = require('./routers/movieRouter');

// Importo middleware di gestiore errore 500
const errorsHandler = require("./middlewares/errorsHandler");
//Importo middleware di gestione errore 404
const notFound = require("./middlewares/notFound");
// import del middelware di gestione di path imgs
const imagePathMiddleware = require("./middlewares/imagePath");

// Attivo middelware di gestione path imgs
app.use(imagePathMiddleware);
// Attivo cartella public per uso file statici
app.use(express.static('public'));

// Registro il body-parser per "application/json"
app.use(express.json());

// rotta home APP
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