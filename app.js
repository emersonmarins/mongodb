const { MongoClient, ObjectId } = require('mongodb');
const uri = require('./atlas_uri');

const client = new MongoClient(uri);
const dbname = 'bank';
const collectionName = 'accounts';
const accountsCollection = client.db(dbname).collection(collectionName);

const pipeline = [
    {
        $match: {
            balance: { $gt: 100 }
        }
    },
    {
        $group: {
            _id: "$account_type",
            total_balance: { $sum: "$balance" },
            avg_balance: { $avg: "$balance" },
        },
    },
]

const main = async () => {
    try {
        await client.connect();
        console.log(`Connected to the database 🌍. \nFull connection string: ${uri}`)
        let result = await accountsCollection.aggregate(pipeline);
        for await (const doc of result) {
            console.log(doc);
        }
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`)
    } finally {
        await client.close();
    }
}
main();