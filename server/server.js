const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

const eventsRouter = require('./routers/events-router');
const producersRouter = require('./routers/producers-router');
const placesRouter = require('./routers/places-router');
const suppliersRouter = require('./routers/suppliers.router');
const userRouter = require('./routers/user.router');
const requestsRouter = require('./routers/requests.router');

/* ---------- MIDDLEWARE ---------- */
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/events', eventsRouter);
app.use('/producers', producersRouter);
app.use('/places', placesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/api/user', userRouter);
app.use('/api/requests',requestsRouter)


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Hey, listen!', PORT);
});