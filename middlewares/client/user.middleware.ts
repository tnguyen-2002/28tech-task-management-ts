import { User } from "../../models/user.model";
import { NextFunction, Request, Response } from "express";

export const requireAuth = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try{
        //* 1. Check for Authorization
    if(!req.headers.authorization || 
        !req.headers.authorization.startsWith("Bearer "
    )){
        res.status(400).json({
            code: "error",
            message: "Please include a token!"
        });
        return;
    }

    //* 2. Extract token:
    const token = req.headers.authorization.split(" ")[1];

    //* 3. Find user by token
    const userData = await User.findOne({
        token: token,
        deleted: false
    })

    //* 4.Handle invalid token
    if( !userData ) {
        res.json({
            code: "error",
            message: "Invalid token"
        });
        return ;
    }

    //* 5. Attach user to request and continue
    req["user"] = userData;
    next();
    } catch (error) {
        res.status(500).json({
            code: "error",
            message: "An error occur!"
        })
    }
    
}
