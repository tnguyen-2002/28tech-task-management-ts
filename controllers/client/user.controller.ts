import { Request, Response } from "express";
import { User } from "../../models/user.model";
import bcrypt from 'bcrypt';
import { generateRandomString } from "../../helpers/generate.helper";

export const register = async (req: Request, res: Response) => {
    const user = req.body;

    const userExit = await User.findOne({
        email: user.email,
        deleted: false
    })

    if(userExit){
        res.json({
            code: "error",
            message: "Email already exists in the system!"
          });
          return;
    }

    const hashPassword = await bcrypt.hash(user.password, 10)
    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: hashPassword,
        token: generateRandomString(30)
    };

    const newUser = new User(dataUser);
    await newUser.save();
    
    res.json({
        code: "success",
        message: "Registration successful!",
        token: newUser.token
      });
}

export const login = async ( req: Request, res: Response ) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const userExit = await User.findOne({
        email: userEmail,
        deleted: false
    })

    if(!userExit){
        res.json({
            code: "error",
            message: "Email doesn't exist in the database!"
        });
        return;
    }

    const isPasswordValid = await bcrypt.compare(userPassword, userExit.password);
    if(!isPasswordValid){
        res.json({
            code: "error",
            message: "Wrong password!"
        });
        return;
    }

    res.json({
        code: "success",
        message: "Login successfully!",
        token: userExit.token
    })
}

export const profile = async ( req: Request, res: Response ) => {
    // 1. Lay token tu du lieu dau vao
    const token = req.body.token;

    // 2. Kiem tra co token co bi rong khong
    if ( !token ) {
        res.json({
            code: "error",
            message: "Token is empty!"
        });
        return;
    }

    // 3. Lay thong tin nguoi dung tu token dau vao
    const userData = await User.findOne({
        token: token,
        deleted: false
    }).select("_id fullName email");

    // 4. Neu khong co user thi bao token khong hop le
    if ( !userData ) {
        res.json({
            code: "error",
            message: "Invalid token!"
        })
        return;
    }

    // 5. Tra ket qua
    res.json({
        code: "success",
        message: "Success!",
        data: userData
    })
}