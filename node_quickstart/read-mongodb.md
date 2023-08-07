use library <!-- Cria um banco de dados caso não tenha -->
db.books.insertOne({ title: "React", language: "JavaScript" }) <!-- Cria uma collection -->
db.books.insertMany([
    { title: "NodeJS", language: "JavaScript" },
    { title: "React-Native", language: "JavaScript" } <!-- Insere varios dados em uma collection -->
])

show dbs <!-- Mostra os bancos de dados -->
show collections <!-- Mostra as Collections -->

db.books.find().pretty() <!-- Mostra os dados mais detalhados/organizados como pretty -->

db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" }); <!-- countDocuments conta quantos documentos tem -->

db.movies.find({countries: {$in: ["Brazil"]}, year: {$gte: 2005 } }, {poster: 1, year: 1, title: 1}).sort({year: -1}).pretty() <!-- O sort é usado para mostrar uma consulta no centido ascendente ou descendente, tbm pela ordem alfabética -->



Return query results in a specified order by using cursor.sort().

Constrained the number of results returned by using cursor.limit().

Specified fields to return by adding a projection document parameter in calls to db.collection.find().

Counted the number of documents that match a query by using db.collection.countDocuments().

<!-- Pipeline Aggregate -->
db.zips.aggregate([
{   
   $match: { 
      state: "CA"
    }
},
{
   $group: {
      _id: "$city",
      totalZips: { $count : { } }
   }
}
])

db.zips.aggregate([
{
  $sort: {
    pop: -1
  }
},
{
  $limit:  5
}
])

db.zips.aggregate([
{
   $group: { "_id": "$pop" }
},
{
   $sort: { _id: -1 }
},
{
   $limit: { 10 }
}
])

{
    $project: {
        state:1, 
        zip:1,
        population:"$pop",
        _id:0
    }
}

{
    $set: {
        place: {
            $concat:["$city",",","$state"]
        },
        pop:10000
   }
}

{
  $count: "total_zips"
}


db.zips.aggregate([
   { $set: {
      pop_2023: { $round: { $multiply: { 1.0031, "$pop" } } }
   }
   }
])

<!-- Pipeline Aggregate -->
$match

$group

$sort

$limit

$project

$count

$set

$out


<!-- INDEX -->
# Create a Single Field Index
db.customers.createIndex({
  birthdate: 1
})

# Create a Unique Single Field Index
db.customers.createIndex({
  email: 1
},
{
  unique:true
})

# View the Indexes used in a collection
db.customers.getIndexes()

# Check if an Index is being used in a query
db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
  })
db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
  }).sort({
    email:1
    })

# Create a Compound Index 
db.customers.createIndex({
  active:1, 
  birthdate:-1,
  name:1
})

db.customers.explain().find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
  active:true
  }).sort({
    birthdate:-1,
    name:1
    })


db.customers.explain().find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
  active:true
  },
  {name:1,
    birthdate:1, 
    _id:0
  }).sort({
    birthdate:-1,
    name:1
    })

<!-- C. Equality, Sort, RangeYour Answer: Correct 
Correct! The recommended order of indexed fields in a compound index is Equality, Sort, and Range. Optimized queries use the first field in the index, Equality, to determine which documents match the query. The second field in the index, Sort, is used to determine the order of the documents. The third field, Range, is used to determine which documents to include in the result set. -->

# Delete an Index
db.customers.dropIndex(
  'active_1_birthdate_-1_name_1'
)
Delete index by key:

db.customers.dropIndex({
  active:1,
  birthdate:-1, 
  name:1
})

Use dropIndexes() to delete all the indexes from a collection, with the exception of the default index on _id.

db.customers.dropIndexes()
The dropIndexes() command also can accept an array of index names as a parameter to delete a specific list of indexes.

db.collection.dropIndexes([
  'index1name', 'index2name', 'index3name'
  ])