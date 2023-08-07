const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');

const dbname = 'bank';
const collectionName = 'accounts';
const client = new MongoClient(uri);
const accountsCollection = client.db(dbname).collection(collectionName);


// Connect to database
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('successful connection 🌍')
    } catch (error) {
        console.log(`Error connecting in the database ${error}`)
    }
}

const documentsToFind = { balance: { $gt: 400 } }

const main = async () => {
    try {
        await connectToDatabase();
        let result = accountsCollection.find(documentsToFind);
        let NumberOfDocuments = accountsCollection.countDocuments(documentsToFind);
        await result.forEach((doc) => console.log(doc));
        console.log(`Number of documents: ${await NumberOfDocuments}`)
    } catch (error) {
        console.log(`Error inserting documents ${error}`)
    } finally {
        await client.close()
    }
}

main();