import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {BounceLoader} from "react-spinners";
import {useAuth0} from '@auth0/auth0-react'

const Review = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState(null)
    const [userComment, setUserComment] = useState({})
    
    const {reviewId} = useParams();
    useEffect(() => {
        fetch(`/get-review/${reviewId}`)
        .then (res => res.json()
        .then(data => {
            setReview(data.data)
            setComments(data.data.comments)
            setLoading(false);
            userComment.displayName = user.name
        }))
    }, []);
    
    const handleSubmit = (e) => {
        fetch(`/add-comment/${reviewId}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userComment)
        })
    }
    
    if (loading) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        <StyledCont>
            <StyledCard>
                <StyledName>{review.productName}</StyledName>
                <StyledType>{review.type}</StyledType>
                <Link to={`/profile/${review.handle}`}>
                <div>by {review.displayName}</div>
                </Link>
                <StyledRating><StyledNum>{review.rating}</StyledNum>/10</StyledRating>
                <div>{review.review}</div>
            </StyledCard>
        <StyledCommentCont>
            <StyledCom>
                {!isAuthenticated?<div>To write a comment please log in</div>:
                <div> 
                    <form onSubmit={handleSubmit}>
                        <StyledTextArea type="text" id="comment" name="comment" onChange={(e) => {setUserComment({...userComment, comment : e.target.value})}}></StyledTextArea>
                        <StyledBtn disabled={userComment.length===0} type="submit">Comment</StyledBtn>
                    </form>
                </div>}
            </StyledCom>
            {comments.length===0? <div>No comments yet</div>:
            comments.map((comment) => {
                return (
                    <StyledOldComment key={comment._id}>
                    <div>{comment.displayName}</div>
                    <div>{comment.comment}</div>
                    </StyledOldComment>
                )
            })
            }
            
        </StyledCommentCont>
        </StyledCont>
    );
}

const StyledBtn=styled.button`
    background-color:#556b1e;
    color:white;
    border: none;
    border-radius:5px;
    height:30px;
    width:80px;
    font-size: 15px;
    :hover{
        background-color:#aac26e;
    }
`
const StyledOldComment = styled.div`
    margin-top:10px;
    border-bottom:1px solid lightgray;
    padding-bottom:15px;
`
const StyledTextArea=styled.textarea`
    width:600px;
    height:50px;
    border-radius:10px;
`
const StyledCom = styled.div`
    border-bottom: 2px solid lightgray;
    padding-bottom:20px;
`
const StyledCommentCont = styled.div`
    width:600px;
    border: 2px solid lightgray;
    padding-left:50px;
    padding-right:50px;
    padding-top:20px;
    margin-top:20px;
    padding-bottom:30px;
    border-radius:15px;
`
const StyledNum = styled.span`
    font-size:30px;
    font-weight:bold;
`
const StyledRating = styled.div`
    font-size:25px;
`
const StyledType = styled.div`
    font-style:italic;
    font-size:20px;
    color:gray;
    margin-bottom:30px;
`
const StyledName = styled.div`
    font-size:30px;
    border-bottom:3px solid lightgray;
    padding-bottom:10px;
    margin-bottom:10px;
`
const StyledCard = styled.div`
    width:600px;
    border: 2px solid green;
    padding:50px;
    border-radius:15px;
`
const StyledCont = styled.div`
    flex-direction:column;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height:100vh;
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
`
export default Review;