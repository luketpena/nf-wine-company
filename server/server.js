const express = require('express');
const fileUpload = require('express-fileupload');
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
const awsRouter = require('./routers/aws.router');

const mailRouter = require('./routers/mail.router');

/* ---------- MIDDLEWARE ---------- */
app.use(bodyParser.json({limit: '50mb', extended: true})); // needed for angular requests
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('build'));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/events', eventsRouter);
app.use('/producers', producersRouter);
app.use('/places', placesRouter);
app.use('/suppliers', suppliersRouter);
app.use('/producers', producersRouter);
app.use('/api/user', userRouter);
app.use('/api/requests',requestsRouter);
app.use('/api/mail',mailRouter);
app.use('/api/pricing',pricingRouter);
app.use('/api/aws',awsRouter);


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Hey, listen!', PORT); 
});