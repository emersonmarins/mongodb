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

const documentToUpdate = {  _id: new ObjectId("64cbd8a8e840d4ab4658b57b") }
const update = { $inc:{ balance: 500 }, $set: {account_type: "checking"} }

const main = async () => {
    try {
        await connectToDatabase()
        let result = await accountsCollection.updateOne(documentToUpdate, update);
        result.modifiedCount == 1 
         ? console.log('document successfully updated!')
         : console.log('document not found')

    } catch (error) {
        console.log(`Error update ${error}`)
    } finally {
        await client.close()
    }
}
main();