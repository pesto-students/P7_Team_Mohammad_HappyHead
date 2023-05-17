require('dotenv').config();
const { MongoClient } = require('mongodb');

async function connectToCluster(url) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(url);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.log('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

async function connect() {
    const uri = process.env.DB_URI;

    let mongoClient;

    try {
        mongoClient = await (connectToCluster(uri));

    } finally {
        await mongoClient.close();
    }
}


connect();
