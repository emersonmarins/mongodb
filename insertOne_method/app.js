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
        console.log(`Connecting in the mongodb, in a ${dbname} database and in a collection ${collectionName}`);
    } catch (error) {
        console.log('Error connecting to the database ' + error);
    }
}

const sampleAccount = {
    account_holder: 'Emerson Marins',
    account_id: 'KTKS48757865S',
    account_type: 'checking',
    balance: 1954949515,
    last_update: new Date() 
}

const main = async () => {
    try {
        await connectToDatabase();
        let result = await accountsCollection.insertOne(sampleAccount);
        console.log(`document inserted successfully! ${result.insertedId}`)        
    } catch (error) {
        console.log('Fail to connect in a database' + error);
    } finally {
        await client.close();
    }
}

main()