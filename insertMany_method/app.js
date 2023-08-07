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

const sampleAccounts = [
{
    account_holder: 'chulala',
    account_id: 'DESS91457865S',
    account_type: 'checking',
    balance: 150,
    last_update: new Date() 
},
{
    account_holder: 'pirikitsberto',
    account_id: 'LIKS48648865S',
    account_type: 'checking',
    balance: 200,
    last_update: new Date() 
}
]

const main = async () => {
    try {
        await connectToDatabase()
        let result = await accountsCollection.insertMany(sampleAccounts);
        console.log(`documents inserted successfully! Insert ${result.insertedCount} documents`)    
        console.log(result)
    } catch (error) {
        console.log(`Error inserting documents ${error}`)
    } finally {
        await client.close()
    }
}

main()