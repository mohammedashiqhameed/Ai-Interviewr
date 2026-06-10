import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/user";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({
            email,
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
        });

        if (
            user &&
            (await bcrypt.compare(
                password,
                user.password
            ))
        ) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "7d",
                }
            );

            return res.json({
                token,
                user,
            });
        }

        res.status(401).json({
            message: "Invalid credentials",
        });
    } catch (error) {
        res.status(500).json(error);
    }
};