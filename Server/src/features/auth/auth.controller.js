import { registerUser } from "./auth.service.js";
import sendResponse from "../../utils/apiResponse.js";

export const register = async (req, res) => {
    const user = await registerUser(req.body);

    return sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            user
        }
    });
};