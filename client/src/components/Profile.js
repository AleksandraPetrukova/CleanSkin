import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {BounceLoader} from "react-spinners";
import { Link, NavLink } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react'

const Profile = () => {
    const [userpage, setUserPage] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const {handle} = useParams();
    useEffect(() => {
            fetch(`/get-user-reviews/${handle}`)
            .then (res => res.json()
            .then(data => {
                setReviews(data.data)
                setLoadingReviews(false);
            }))
        }, [handle]);
        useEffect(() => {
            fetch(`/get-user/${handle}`)
            .then (res => res.json()
            .then(data => {
                setUserPage(data.data)
                setLoadingUser(false);
            }))
        }, [handle]);
        

        if (loadingReviews) {
            return <StyledLoader color="#9fe3a1"/>
        }
        return ( 
        <StyledContBig>
            <StyledNameBig>
            <div>{userpage?.displayName}</div>
            {userpage?.handle === user?.nickname
            ? <Link to='/createreview'><button>Make a review</button></Link>
            :<div></div>}
            
            </StyledNameBig>
            {reviews.map((review) => {
                return(
                    <Link to={`/review/${review._id}`}>
                        <StyledCont>
                            <StyledName>{review.productName}</StyledName>
                            <StyledAuthor>by {review.displayName}</StyledAuthor>
                            <div>Rating: {review.rating}/10</div>
                        </StyledCont>
                    </Link>
                )
            })}
        </StyledContBig>
    );
}

const StyledName = styled.div`
    font-size:20px;
    font-weight:bold;
    color:green;
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
const StyledContBig = styled.div`
    
    position:absolute;
    left: 50px;
    top: 100px;
    width:1100px;
`
const StyledNameBig = styled.div`
    font-size: 50px;
    border-bottom:3px solid lightgray;
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
`
export default Profile;