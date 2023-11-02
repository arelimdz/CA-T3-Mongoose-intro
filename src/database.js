const mongoose = require('mongoose');

// Connect or create & connect to a database.

async function databaseConnect(){
	try {
		// DB connection can take some time, eg. if DB is in the cloud 
		console.log("Connecting to:\n" + process.env.DB_URI_LOCAL);
		await mongoose.connect(process.env.DB_URI_LOCAL);
		console.log("Database connected");
	} catch (error) {
		console.warn(`databaseConnect failed to connect to DB:\n${JSON.stringify(error)}`);
	}
}

// async function databaseConnect(){
//     try{
//         // DB connection can take some time, eg. if DB is in the cloud 
//         await mongoose.connect('mongodb://localhost:27017/CatDB')
//         console.log("Database connected");

//     } catch (error){
//         console.warn(`databaseConnect failed to connect to DB:\n${JSON.stringify(error)}`);
// 	}
// }

module.exports = {
	databaseConnect
}