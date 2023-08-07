const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://master:55788955@cluster0.ocslmg8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db("sample_airbnb");
        const movies = database.collection("listingsAndReviews");

        const query = { $or: [{bedrooms: 1},{bedrooms: 3}]  };
        // const movie = await movies.find({_id: "10066928"});
       const movie = await movies.find( {$and: [{bedrooms: 2}, {bedrooms: 2}] } );
        console.log(movie);

    } finally {
        await client.close();
        console.log('terminou')
    }
}
run().catch(console.dir); 