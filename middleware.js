const jwt = require("jsonwebtoken");
const ExpressError = require("./ExpressError");
const User = require("./models/user_model");

module.exports.isUserExist = async (req, res, next) => {
    try {
        res.locals.user = null;

        const { proToken } = req.cookies;

        if (!proToken) {
            return next();
        }

        const decodeToken = jwt.verify(
            proToken,
            process.env.JWT_SECRET
        );

        if (!decodeToken.id) {
            return next(new ExpressError(401, "Invalid token"));
        }
        const user=await User.findById(decodeToken.id);
        res.locals.user = user;

        next();

    } catch (err) {
        next(err);
    }
};