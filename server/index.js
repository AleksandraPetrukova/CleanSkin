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
    addReview,
    addNewComment,
    deleteReview,
    updateReview,
    DeleteComment,
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
    .post ("/make-review", addReview)
    .post ("/add-comment/:reviewId", addNewComment)
    .delete("/delete-review", deleteReview)
    .patch("/update-review/:reviewId", updateReview)
    .delete("/delete-comment", DeleteComment)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })