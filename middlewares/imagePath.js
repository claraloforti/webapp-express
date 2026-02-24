function imagePath(req, res, next) {
    // Creo nuova proprietà da aggiungere a req per path img
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/movies/`;
    // Procedi con la risposta
    next();
}

module.exports = imagePath;