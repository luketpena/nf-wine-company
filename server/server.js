const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const eventsRouter = require('./routers/events-router');
const producersRouter = require('./routers/producers-router');
const placesRouter = require('./routers/places-router');

/* ---------- MIDDLEWARE ---------- */
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/events', eventsRouter);
app.use('/producers', producersRouter);
app.use('/places',placesRouter);


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Hey, listen!', PORT);
});