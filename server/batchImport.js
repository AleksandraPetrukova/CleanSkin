const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const { v4: uuidv4 } = require("uuid");


const data = require("./data")

const onlyUsers = Object.values(data.users)
onlyUsers.forEach((user) => {
    user._id = uuidv4()
})

const onlyReviews = Object.values(data.reviews)
onlyReviews.forEach((review) => {
    review._id = uuidv4()
})

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("ClearSkin");
        console.log("connected!");
        const resultUsers = await db.collection("users").insertMany(onlyUsers);
        const resultReviews = await db.collection("reviews").insertMany(onlyReviews);
        if (resultUsers.length === 0 && resultReviews.length === 0) {
            console.log("smth went wrong")
        }
        else {
            console.log("it worked")
        }
    } catch (err) {
        console.log(err.stack);
    }
    client.close();
    console.log("disconnected!");
}

batchImport();