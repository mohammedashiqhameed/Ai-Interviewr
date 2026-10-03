import dns from "dns";
import mongoose from "mongoose";

// Node on Windows can default to 127.0.0.1 for DNS, which refuses the SRV lookup mongodb+srv needs
if (dns.getServers().every((s) => s === "127.0.0.1")) {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);

        process.exit(1);
    }
};