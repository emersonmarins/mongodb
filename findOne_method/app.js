const { MongoClient, ObjectId } = require('mongodb');
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

const documentsToFind = { _id: new ObjectId("64cbd8a8e840d4ab4658b57b") }

const main = async () => {
    try {
        await connectToDatabase();
        let result = await accountsCollection.findOne(documentsToFind);
        console.log(result)
    } catch (error) {
        console.log(`Error inserting documents ${error}`)
    } finally {
        await client.close()
    }
}
main();