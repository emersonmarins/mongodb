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

const pipeline2 = [
    {
        $match: {
            account_type: "checking",
            balance: { $gt: 100 }
        }
    },
    {
        $project: {
            _id: 0,
            account_id: 1,
            account_type: 1,
            balance: 1,
            // GBP stands for Great British Pound
            gbp_balance: { $divide: [ "$balance", 1.3 ] },
        }
    }
]

const main = async () => {
    try {
        await client.connect();
        console.log(`Connected to the database 🌍. \nFull connection string: ${uri}`)
        // let result = await accountsCollection.aggregate(pipeline);
        let result = await accountsCollection.aggregate(pipeline2);

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