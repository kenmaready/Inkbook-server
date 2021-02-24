import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// db connection
const dbConnectionString = process.env.ATLAS_DB_CONNECTION_STRING.replace(
    "<username>",
    process.env.ATLAS_DB_USER
)
    .replace("<password>", process.env.ATLAS_DB_PASSWORD)
    .replace("<dbname>", process.env.ATLAS_DB_NAME);

const db = mongoose
    .connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        mongoose.set("useFindAndModify", false);
        console.log("db connected...");
    })
    .catch((err) => console.log(err.message));

mongoose.connection.on("error", (err) => {
    console.log(`db connection error: ${err}`);
});

export default db;
