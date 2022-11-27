import styled from "styled-components";
import {useAuth0} from '@auth0/auth0-react'
import Banner from "../assets/hero-natural.jpg"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {BounceLoader} from "react-spinners";

const Homepage = () => {
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
    console.log(reviews)
    
    if (loading) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        <div>
            <StyledImg src={Banner}/>
            <StyledSlogan>Your skin care guide to <StyledGlow>GLOW UP</StyledGlow></StyledSlogan>
            {reviews.map((review) => {
                return (
                    <StyledLink to={`/review/${review._id}`}>
                        <StyledCont>
                            <StyledName>{review.productName}</StyledName>
                            <StyledAuthor>by {review.displayName}</StyledAuthor>
                            <StyledRating>Rating: <StyledNumb>{review.rating}</StyledNumb>/10</StyledRating>
                        </StyledCont>
                    </StyledLink>
                )
            })}
        </div>
    )
}

const StyledSlogan = styled.div`
    font-size:40px;
    z-index:2;
    position: absolute;
    top: 200px;
    left: 70%;
    display:flex;
    flex-direction: column;
    color:white;
`
const StyledGlow = styled.span`
    :hover{
        animation: change 4s infinite;
    }
    @keyframes change {
        0% {color: #33AB5F; left:0px; top:0px;}
        25% {color: #8CDBA9; left:200px; top: 0px;}
        50% {color: #fc8953; left: 200px; top: 200px;}
        75% {color: #ffc65c; left: 0px; top: 200px;}
        100% {color: #33AB5F;left:0px; top:0px;}
    }
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

const StyledImg = styled.img`
    width: 100%;
`
export default Homepage;