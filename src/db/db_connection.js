import { model, Mongoose } from "mongoose";
import config from '../config/index.js'

const mongoose = new Mongoose();
const db_url = config.db_url
const db_name = config.db_name
const connectionString = `${db_url}/${db_name}`;

async function dbConnection(){
    try {
        await mongoose.connect(connectionString);
        console.log("Database connected successfully");
    } catch(err){
        console.error("Database connection error:", err);
    }
}
export default dbConnection