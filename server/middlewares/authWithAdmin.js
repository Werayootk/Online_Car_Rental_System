const passport = require('passport')
const { User } = require('../models');

const authWithAdmin = (req, res, next) => {
    try {
        // Destruturing status compare admin or not
        console.log('Admin JWT middleware');
        passport.authenticate('jwt', { session: false, }, async (error, token) => {
            if (error || !token) {
                res.status(401).json({ message: 'Unauthorized admin' });
            } 
            try {
                const user = await User.findOne({
                    where: { id: token.id },
                });
                req.user = user;
                const { role } = user;
                if (role != 'admin') {
                    res.status(401).json({ message: 'you unauthorized admin.' });
                } else if(role == 'admin'){
                    next();
                }
            } catch (error) {
                next(error);
            }
        })(req, res, next); 
    } catch (err) {
        next(err)
    }
}

module.exports = authWithAdmin;
