"use strict";
const { query } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");
///////////////
// All users //
///////////////
const getAllUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin"); 
    const result = await db.collection("users").find().toArray();
        result
        ? res.status(200).json({ status: 200, data: result, message: "All users" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
}

///////////////
// All posts //
///////////////
const getAllPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("reviews").find().toArray();
        result
        ? res.status(200).json({ status: 200, data: result, message: "All users" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
}

////////////////////
// user by handle //
////////////////////
const getUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { handle } = req.params;
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("users").findOne({handle});
    result
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "User" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
}

////////////////////////////
// All review bu reviewId //
////////////////////////////
const getReview = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { reviewId } = req.params;
    // console.log(reviewId)
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("reviews").findOne({_id: reviewId});
    console.log(result)
    result
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "User" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    
    client.close();
}

//////////////////
// All new user //
//////////////////
const addNewUser = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { handle, email, displayName } = req.body;
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("users").insertOne({ handle, email, displayName });
    result
        ? res
            .status(200)
            .json({ status: 200, data: req.body, message: "User" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
}

////////////////////////
// Find user by email //
////////////////////////
const checkUserEmail = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { email } = req.body;
    await client.connect();
    console.log(email)
    const db = client.db("ClearSkin");
    const result = await db.collection("users").findOne({email});
    
    if (result) {
        res.status(200).json({ status: 200, data: result, message: "user found" })
    }
    else {
        res.status(404).json({ status: 404, message: "Not Found" });
    }
    client.close();
    
}

///////////////////////////
// All reviews from user //
///////////////////////////
const getUserReviews = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { handle } = req.params;
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("reviews").find().toArray();
    const userResult = result.filter(review => handle===review.handle)
    userResult?
        res.status(200).json({ status: 200, data: userResult, message: "User reviews" })
        :res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
    
}

////////////////////
// Add new review //
////////////////////
const addReview = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin");
    req.body._id= uuidv4();
    const result = await db.collection("reviews").insertOne({...req.body, comments:[]});
    result?
    res.status(201).json({ status: 201, data: result, message: "it worked" })
    :res.status(500).json({ status: 500, message: "didnt work" });
    client.close();
}

/////////////////////
// Add new comment //
/////////////////////
const addNewComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin");
    const { reviewId } = req.params;
    const {displayName, comment} = req.body;
    const query = { _id:reviewId}
    const newVal = { $push: {comments: {displayName, comment}}}
    const result = await db.collection("reviews").updateOne(query, newVal)
    result?
    res.status(201).json({ status: 201, data: result, message: "it worked" })
    :res.status(500).json({ status: 500, message: "didnt work" });
    client.close();
}

const deleteReview = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin");
    // const { reviewId } = req.params;
    const result = await db.collection("reviews").deleteOne(req.body);
    if (result.deletedCount > 0) {
        res.status(204).json({ status: 204, message: "success" });
    }
    else {
        res.status(400).json({ status: 400, message: "id not found" });
    }
    client.close();
}

const updateReview = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin");
    const { reviewId } = req.params;
    const query = { _id:reviewId}
    const {type, productName, review, rating, imgSrc} = req.body
    const oldData = await db.collection("reviews").findOne(query); 
    const newValues = { $set: {
                            type: type?type:oldData.type,
                            productName: productName?productName:oldData.productName,
                            review: review?review:oldData.review,
                            rating: rating?rating:oldData.rating,
                            imgSrc: imgSrc?imgSrc:oldData.imgSrc
    }}

    const result = await db.collection("reviews").updateOne(query, newValues)

    result.modifiedCount>=1
        ?res.status(201).json({ status: 201, message: "it worked", data: result})
        :res.status(500).json({ status: 500, message: "it didn't work" });

    client.close();
}

const DeleteComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("ClearSkin")
    const {_id, comment} = req.body
    const query = {_id: _id};
    const val = {$pull: {comments:{comment:comment}}}
    const result = await db.collection("reviews").updateOne(query, val)

    result.modifiedCount>=1
        ?res.status(201).json({ status: 201, message: "it worked", data: result})
        :res.status(500).json({ status: 500, message: "it didn't work" });

    client.close();
}   

module.exports = {
    getAllUsers,
    getAllPosts,
    getUser,
    checkUserEmail,
    addNewUser,
    getReview,
    getUserReviews,
    addReview,
    addNewComment,
    deleteReview,
    updateReview,
    DeleteComment,
};