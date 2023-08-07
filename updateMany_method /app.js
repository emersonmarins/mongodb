const { MongoClient, ObjectId } = require('mongodb');
const uri = require('./atlas_uri');

const dbname = 'bank';
const collectionName = 'accounts';
const client = new MongoClient(uri);
const accountsCollection = client.db(dbname).collection(collectionName);

// Connect To database
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('successful connection 🌍')
    } catch (error) {
        console.log(`Error connecting in the database ${error}`)
    }
}

// Filter used to find the document to update
const documentToUpdate = { account_type: 'checking' };

// Operation(s) to perform on the document.
const update = { $push: { transfers_complete: "TR477747917"} }

const main = async () => {
    try {
        await connectToDatabase()
        let result = await accountsCollection.updateMany(documentToUpdate, update);
        result.modifiedCount > 0 
        ? console.log(`Updated ${result.modifiedCount} documents`)
        : console.log("No documents updated")

    } catch (error) {
        console.log(`Error updating documents: ${error}`)
    } finally {
        await client.close()
    }
}
main();