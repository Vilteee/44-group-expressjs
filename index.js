import express from 'express';
import birds from './routes/birds.js'


const app = express();
const port = 3000;

//##########################################################################

function beforeAnything(req, res, next) {
    req.timeStart = Date.now();
    next();
}

function beforeAnything2(req, res, next) {
    req.middlewareText = 'Hello from the middle... :P';
    next();
}

app.use(beforeAnything);
app.use(beforeAnything2);

//##########################################################################

app.use(express.static('public')); //turi buti pries visas puslapio nuorodas
// app.use(express.static('downloads')); gali b uti toks folderis sakykim, isskaidyta

//##########################################################################

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

//##########################################################################

app.get('/middle', (req, res) => {
    console.log('Uztruko (ms):', Date.now() - req.timeStart);

    res.json({
        time: req.timeStart,
        end: Date.now(),
        diff: Date.now() - req.timeStart,
        text: req.middlewareText,
    });
});

//##########################################################################
  
app.use('/birds', birds);
app.get('/birds/about', (req, res) => {
    res.send('birds: about page')
  });
  

//##########################################################################

function first(req, res, next) {
  console.log('pirma console...');
  next();
}

function second(req, res, next) {
  console.log('antra console...');
  next();
}


function third(req, res, next) {
  console.log('trecia console...');
  res.send('trecias responsive...')
}

app.get('/monday', first, second, third);

//##########################################################################

function pirmas(req, res, next) {
    console.log('pirma console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function antras(req, res, next) {
    console.log('antra console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function trecias(req, res, next) {
    console.log('trecia console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function ketvirtas(req, res, next) {
    console.log('ketvirta console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function nuoIki(req, res, next) {
    console.log('PIRMAS');
    if (Math.random() > 0.9) {
        return next();
    }

    console.log('ANTRAS');
    if (Math.random() > 0.8) {
        return next();
    }

    console.log('TRECIAS');
    if (Math.random() > 0.7) {
        return next();
    }

    console.log('KETVIRTAS');
    if (Math.random() > 0.6) {
        return next();
    }

    return next();
}

function penktas(req, res, next) {
    console.log('penkta console...');
    res.send('penktas responsive...');
}

const kaDaryti = [pirmas, antras];

app.get('/pirmadienis', kaDaryti, trecias, ketvirtas);
app.get('/pirmadienis', nuoIki);
app.get('/pirmadienis', penktas);


//##########################################################################

const getKebab = (req, res) => res.send('hear Your kebab');
const doneKebab = (req, res) => res.send('your kebab is done');
const throwKebab = (req, res) => res.send('your kebab is throw away');

app.get('/kebab', getKebab);
app.post('/kebab', doneKebab);
app.delete('/kebab', throwKebab);

// app.route('/kebab')
//     .get(getKebab)
//     .post(doneKebab)
//     .delete(throwKebab);


//##########################################################################


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


//##########################################################################

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});