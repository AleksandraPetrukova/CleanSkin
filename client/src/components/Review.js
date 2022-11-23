import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Review = () => {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const {reviewId} = useParams();
    useEffect(() => {
        // DONE: GET reservation
        fetch(`/get-review/${reviewId}`)
        .then (res => res.json()
        .then(data => {
            setReview(data.data)
            setLoading(false);
        }))
    }, []);
    
    // console.log(review)
    if (loading) {
        return <div>wait</div>
    }
    return ( 
        <StyledCont>
            <StyledCard>
                <StyledName>{review.productName}</StyledName>
                <div>{review.type}</div>
                <div>by {review.displayName}</div>
                <div>{review.rating}/10</div>
                <div>{review.review}</div>
            </StyledCard>
        </StyledCont>
    );
}

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
export default Review;