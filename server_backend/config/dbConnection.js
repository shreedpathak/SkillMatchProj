import mongoose from "mongoose";

const connectionDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connection is:", connect.connection.host, "Connection name:", connect.connection.name);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1); // Exit with failure
    }
}

export default connectionDB;