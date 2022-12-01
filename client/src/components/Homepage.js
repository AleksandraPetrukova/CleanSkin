import styled from "styled-components";
import {useAuth0} from '@auth0/auth0-react'
import Banner from "../assets/hero-natural.jpg"
import Banner2 from "../assets/banner.webp"
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
    // console.log(reviews)
    
    if (loading) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        <StyledContBig>
            <StyledImg src={Banner2}/>
            <StyledSlogan>Your skin care guide to <StyledGlow>GLOW UP</StyledGlow></StyledSlogan>
            <StyledTextSlogan>
                <StyledStart>START YOUR SKIN CARE JOURNEY</StyledStart>
                <div>Skin care is a personal journey and this website will help you to find what's best for you!</div>
            </StyledTextSlogan>
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
        </StyledContBig>
    )
}

const StyledStart = styled.div`
    font-size:35px;
`
const StyledTextSlogan = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    margin-top:40px;
    margin-bottom:70px;
    font-size:25px;
`
const StyledContBig = styled.div`
    
    width:100%;
    margin-bottom:200px;
`
const StyledSlogan = styled.div`
    /* background-color:rgba(47, 87, 48, 0.3); */
    color:#2f5730;
    font-size:35px;
    z-index:2;
    position: absolute;
    top: 200px;
    left: 20%;
    display:flex;
    flex-direction: column;
    
`
const StyledGlow = styled.span`
    color:#2f5730;
    :hover{
        animation: change 4s infinite;
    }
    @keyframes change {
        0% {color: #2f5730; left:0px; top:0px;}
        25% {color: #33AB5F; left:200px; top: 0px;}
        50% {color: #fc8953; left: 200px; top: 200px;}
        75% {color: #ffc65c; left: 0px; top: 200px;}
        100% {color: #2f5730;left:0px; top:0px;}
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

const StyledImg = styled.img`
    width: 100%;
    height:100vh;
    object-fit:cover;
    /* height:350px;
    object-fit:cover; */
`
export default Homepage;