const passport = require("passport");
const { User } = require('../models');

const authenticateMiddleware = (req, res, next) => {
    try {        
        console.log('Current user is:', req.user);
        const isLoggedIn = req.isAuthenticated() && req.user;
        if (isLoggedIn) {
            console.log('Social middleware');
            
            passport.authenticate('jwt', { session: false, }, async (error, token) => {
                if (error || !token) {
                    res.status(401).json({ message: 'Unauthorized' });
                } 
                try {
                    const user = await User.findOne({
                        where: { id: token.id },
                    });
                    req.user = user;
                } catch (error) {
                    next(error);
                }
                next();
            })(req, res, next); 
                next();
        } else {
            console.log('JWT middleware');
            passport.authenticate('jwt', { session: false, }, async (error, token) => {
                if (error || !token) {
                    res.status(401).json({ message: 'Unauthorized' });
                } 
                try {
                    const user = await User.findOne({
                        where: { id: token.id },
                    });
                    req.user = user;
                } catch (error) {
                    next(error);
                }
                next();
            })(req, res, next); 
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateMiddleware;