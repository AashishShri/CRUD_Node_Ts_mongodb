
// export const MONGODB_URI = process.env["MONGODB_URI"];

// if (!MONGODB_URI) {
//     console.log("No mongo connection string. Set MONGODB_URI environment variable.");
//     process.exit(1);
// }

// var config = require('../config/config')

export const JWT_SECRET = "Aashish";

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
