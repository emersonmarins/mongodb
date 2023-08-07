const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');

const client = new MongoClient(uri)
const dbname = 'bank';

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Connected with successful '+ dbname)

    } catch (error) {
        console.log(error);
    }
};

const main = async () => {
    try {
        await connectToDatabase();
        const databasesList = await client.db().admin().listDatabases();
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

main();