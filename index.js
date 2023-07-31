import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public')); //turi buti pries visas puslapio nuorodas
// app.use(express.static('downloads')); gali b uti toks folderis sakykim, isskaidyta

app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/css/main.css">
            <link rel="stylesheet" href="/css/button.css">
            <link rel="stylesheet" href="/css/error.css">
        </head>
        <body>
            <h1>HOME PAGE CONTENT</h1>
            <button class="btn">Click me</button>
        </body>
        </html>`);
});

app.get('/about', (req, res) => {
    res.send('About page!');
});

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...');
    console.log(req.method);
    res.send('SECRET!!!');
}); //pagauna visus, esvarbu, koks metodas 

app.get('/services?', (req, res) => {
    res.send('Services list page!');
}); // klaustukas reiskia, kad s raide gali buti nebutina

app.get('/users/:userId/books/:bookId', (req, res) => {
    console.log(req.params);
    if (req.params.bookId > 1000) {
        res.send('ERROR: tokia knyga neegzistuoja');
    }
    res.send(req.params);
});

app.get('*', (req, res) => {
    res.send('404 page!');
}); //bet koks kitas puslapis, ka klientas gali parasyti

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
}); //bet koks kitas requestas, nebutinai puslapis, viska pagauna

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}); // gaudo visas technines nesamones, serverio klaida, pvz neprisikonektina prie DB

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});