const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const connections = {};
const models = {};
const bankUserSchema = new mongoose.Schema({});

const getConnection = async (dbName) => {
    console.log(getConnections(`${dbName}`));
    if (connections[dbName] !== dbName) {
        connections[dbName] = await mongoose.createConnection(process.env.MONGO_URI, { dbName: dbName });
        console.log(`New database created for ${dbName}`);
    } else {
        console.log(`Resusing existing connection for ${dbName}`);
    }
    return connections[dbName];
};
const getModel = async (dbName, collectionName) => {
    console.log("getModel called with:", { dbName, collectionName });
    const modelKey = `${dbName}-${collectionName}`;
    if (!models[modelKey]) {
        const connection = await getConnection(dbName);
        // Create a dynamic schema that accepts any fields
        const dynamicSchema = new mongoose.Schema({}, { strict: false });
        models[modelKey] = connection.model(
            collectionName,
            dynamicSchema,
            collectionName // Use exact collection name from request
        );
        console.log("Created new model for collection:", collectionName);
    }
    return models[modelKey];
};
app.get(express.json('/find/:database/:collection', async (req, res) => {
    try {
        const { database, collection } = req.params;
        const Model = await Model.find({});
        console.log(`query executed, document count is: ${documents.length}`);
        res.status(200).json(documents);
    } catch (err) {
        console.error('Error in GET route: ', err);
        res.status(500).json({ error: err.message });
    };
}));
async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`the server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    };
};
startServer();