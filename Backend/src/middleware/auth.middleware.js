import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Not authorized, no token",
            success: false,
            err: "No token provided",
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
            success: false,
            err: error.message,
        });
    }
}