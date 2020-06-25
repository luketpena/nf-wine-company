const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

const eventsRouter = require('./routers/events.router');
const placesRouter = require('./routers/places.router');
const suppliersRouter = require('./routers/suppliers.router');
const producersRouter = require('./routers/producers.router');
const userRouter = require('./routers/user.router');
const requestsRouter = require('./routers/requests.router');
const pricingRouter = require('./routers/pricing.router');

const mailRouter = require('./routers/mail.router');

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
app.use('/producers', producersRouter);
app.use('/api/user', userRouter);
app.use('/api/requests',requestsRouter);
app.use('/api/mail',mailRouter);
app.use('/api/pricing',pricingRouter)


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Hey, listen!', PORT); 
});