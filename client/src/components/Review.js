import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {BounceLoader} from "react-spinners";

const Review = () => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState(null)
    const {reviewId} = useParams();
    useEffect(() => {
        fetch(`/get-review/${reviewId}`)
        .then (res => res.json()
        .then(data => {
            setReview(data.data)
            setComments(data.data.comments)
            setLoading(false);
        }))
    }, []);
    
    
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
        <div>
            {comments.map((comment) => {
                return (
                    <div>
                    <div>{comment.displayName}</div>
                    <div>{comment.comment}</div>
                    </div>
                )
            })}
        </div>
        </StyledCont>
    );
}

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