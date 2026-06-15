function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        res.status(403).json({
            "message": "You are not login !"
        })
        return;
    }

    // decode this token
    const decode = jwt.verify(token, "rajwalke@2004");
    const username = decode.username;
    if (!username) {
        res.status(403).json({
            message: "Malformed token"
        })
        return;
    }

    req.username = username;
    next();
}

module.exports = {
    authMiddleware
}