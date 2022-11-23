"use strict";
const { query } = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

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

const getReview = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { reviewId } = req.params;
    await client.connect();
    const db = client.db("ClearSkin");
    const result = await db.collection("reviews").findOne({_id: reviewId});
    result
        ? res
            .status(200)
            .json({ status: 200, data: result, message: "User" })
        : res.status(404).json({ status: 404, message: "Not Found" });
    client.close();
}

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
}

module.exports = {
    getAllUsers,
    getAllPosts,
    getUser,
    checkUserEmail,
    addNewUser,
    getReview,
};