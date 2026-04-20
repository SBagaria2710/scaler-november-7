import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import { otpGenerator } from "../utils/generateOtp.js"
import EmailHelper from "../utils/emailHelper.js";

export const register = async (req, res) => {
    try {
        // Step 1: Read user input from request
        const { name, email, password, role = "user" } = req.body;

        // Step 2: Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 3: Create the new user
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = signToken({ userId: user._id.toString() });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetfh user"
        });
    }
};

export const forgetPassword = async (req, res) => {
    try {
        /**
         * 1. You can ask for email
         * 2. Check if the email is present or not
         *  * if email is not present -> send a response to the user (user not found)
         * 3. If email is present -> create a basic otp -> send to the email
         * 4. also store that otp in the userModel
         */

        if (req.body.email == undefined) {
            return res.status(401).json({
                success: false,
                message: "Please enter the email for forget password",
            });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user === null) {
            return res.status(404).json({
                success: true,
                message: "User not found with this email"
            });
        }

        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();
        await EmailHelper("otp", "shashwatbagaria5@gmail.com", {
            name: user.name,
            otp
        });

        return res.status(200).json({
            success: true,
            message: "Otp sent to the user",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user"
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        let resetDetails = req.body;

        if (!resetDetails.password || !resetDetails.otp || !resetDetails.email) {
            return res.status(401).json({
                success: false,
                message: "Invalid request"
            });
        }

        const user = await User.findOne({ email: resetDetails.email });
        if (user === null) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            });
        }

        if (user.otp !== resetDetails.otp) {
            return res.status(401).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                success: false,
                message: "OTP Expired"
            });
        }

        const hashedPassword = await bcrypt.hash(resetDetails.password, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful!"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to reset password"
        });
    }
};

