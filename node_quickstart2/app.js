const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');
console.log(uri)

const client = new MongoClient(uri);
const dbname = "banck";

const connectToDataBase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`)
    } catch (error) {
        console.log(error);
    }
};

const main = async () => {
    try {
        await connectToDataBase();
        const databasesList = await client.db().admin().listDatabases();
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

main();