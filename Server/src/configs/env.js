import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
    throw new Error("PORT is not defined in enviroment varriables")
}

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in enviroment varriables")
}

if(!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined in enviroment varriables")
}
if(!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined in enviroment varriables")
}
if(!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL is not defined in enviroment varriables")
}

export const env ={
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    CLIENT_URL: process.env.CLIENT_URL
}