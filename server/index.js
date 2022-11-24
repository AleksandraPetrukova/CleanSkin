"use strict";

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000

const {
    getAllUsers,
    getAllPosts,
    getUser,
    addNewUser,
    checkUserEmail,
    getReview,
    getUserReviews,
} = require("./handlers");

express ()
    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get ("/get-users", getAllUsers)
    .get ("/get-reviews", getAllPosts)
    .get ("/get-user/:handle", getUser)
    .get ("/get-review/:reviewId", getReview)
    .get("/get-user-reviews/:handle", getUserReviews)
    .post("/add-user", addNewUser)
    .post("/find-user", checkUserEmail)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })