import dns from 'dns';
dns.setServers(["8.8.8.8","1.1.1.1"])

import app from './app.js';
import { env } from './configs/env.js';
import { connectDB } from './configs/db.js';


const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    } catch (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
}

startServer();