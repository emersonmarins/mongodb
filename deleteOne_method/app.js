const { MongoClient, ObjectId } = require('mongodb');
const uri = require('./atlas_uri');

const dbname = 'bank';
const collectionName = 'accounts';
const client = new MongoClient(uri);
const accountsCollection = client.db(dbname).collection(collectionName);


const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('successful connection 🌍')
    } catch (error) {
        console.log(`Error connecting in the database ${error}`)
    }
}

const documentToDelete = {_id: new ObjectId('64ccffab5c53a44f71c5deb4')}

const main = async () => {
    try {
        await connectToDatabase()
        let result = await accountsCollection.deleteOne(documentToDelete);
        result.deletedCount == 1 
         ? console.log('document successfully deleted!')
         : console.log('no documents deleted')

    } catch (error) {
        console.log(`Error delete ${error}`)
    } finally {
        await client.close()
    }
}

main();