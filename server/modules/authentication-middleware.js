const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    console.log('User is authenticated');
    next();
  } else {
    // failure best handled on the server. do redirect here.
    console.error('User not authenticated!');
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
