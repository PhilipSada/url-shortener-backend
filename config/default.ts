export default {
    port: 4000,
    // dbUri: "mongodb://127.0.0.1:27017/url-shortener",
    dbUri: process.env.MONGO_URI,
    corsOrigin: "http://localhost:3000",
};