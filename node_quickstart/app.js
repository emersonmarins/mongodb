const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://master:55788955@cluster0.ocslmg8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
    //   await client.connect();
    // await connectToDatabase()

      await client.db("sample_analytics").command({ ping: 1 });

      const database = client.db("sample_analytics");
      const books = database.collection("accounts");

    //   let book = await books.replaceOne(
    //     {
    //         _id: new ObjectId("63fd2c105e02ffbed026c138"),
    //     },
    //     {
    //         title: "magazine da economia",
    //         publishedDate: new Date("2023-05-28"),
    //     }
      
    //   );
    //   console.log("conectado com sucess");
    //   console.log(book);

    const book = books.find({ limit: { $lt: 8000 } }, {limit: 0, account_id: 0, products: 0}).limit(3); 

        // console.log(book); 
        await book.forEach((doc) => console.log(doc))

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
