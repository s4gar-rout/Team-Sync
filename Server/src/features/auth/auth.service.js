import User from "./auth.model.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};