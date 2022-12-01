import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import {BounceLoader} from "react-spinners";

const AllReviews = () => {

    const [reviews, setReviews] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/get-reviews`)
            .then(res => res.json())
            .then((data) => {
                setReviews(data.data)
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, [])
    
    if (loading) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        <div>
            <StyledAllReviewTxt>
                All reviews:
            </StyledAllReviewTxt>
            <StyledListOfReviews>
                {reviews.map((review) => {
                        return (
                            <StyledLink to={`/review/${review._id}`} key={review._id}>
                                <StyledCont>
                                    <StyledName>{review.productName}</StyledName>
                                    <StyledAuthor>by {review.displayName}</StyledAuthor>
                                    <StyledRating>Rating: <StyledNumb>{review.rating}</StyledNumb>/10</StyledRating>
                                </StyledCont>
                            </StyledLink>
                        )
                    })}
            </StyledListOfReviews>
        </div>
     );
}

const StyledAllReviewTxt = styled.div`
    font-size:30px;
    margin:30px;
    border-bottom:2px solid lightgray;
`
const StyledListOfReviews = styled.div`
    margin-bottom:300px;
`
const StyledRating = styled.div`
    color:black;
`
const StyledNumb=styled.span`
    font-weight:bold;
    font-size: 25px;
`
const StyledLink = styled(NavLink)`
    text-decoration:none;
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
    margin-bottom:600px;
`
const StyledName = styled.div`
    font-size:20px;
    font-weight:bold;
    color:green;
    :hover {
        color:#ffc65c;
    }
`
const StyledAuthor = styled.div`
    color:gray;
    font-size:17px;
`
const StyledCont = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:20px;
    border: 2px solid lightgray;
    border-radius:10px;
    height:50px;
    margin:20px;
    padding-left:50px;
`
export default AllReviews;