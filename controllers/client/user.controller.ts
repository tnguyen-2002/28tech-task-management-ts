import { Request, Response } from "express";
import { User } from "../../models/user.model";
import bcrypt from 'bcrypt';
import { generateRandomString } from "../../helpers/generate.helper";

export const register = async (req: Request, res: Response) => {
    // 1. tao bien nhan data tu req.body
    const user = req.body;
    // 2. Kiem tra email da ton tai chua
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
    // 3. tao bien nhan data de ma hoa
    const hashPassword = await bcrypt.hash(user.password, 10)
    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: hashPassword,
        token: generateRandomString(30)
    };

    // 4. them vao co so du lieu
    const newUser = new User(dataUser);
    await newUser.save();
    
    // 5. Tra ket qua ra console
    res.json({
        code: "success",
        message: "Registration successful!",
        token: newUser.token
      });
}