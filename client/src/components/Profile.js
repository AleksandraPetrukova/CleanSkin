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
        

        if (loadingReviews || loadingUser || !userpage || !reviews) {
            return <StyledLoader color="#9fe3a1"/>
        }
        return ( 
        <StyledContBig>
            <StyledNameBig>
            <div>{userpage.displayName}</div>
            {userpage.handle === user?.nickname
            ? <Link to='/createreview'><StyledButton>Make a review</StyledButton></Link>
            :<div></div>}
            
            </StyledNameBig>
            {reviews.map((review) => {
                return(
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
    );
}

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
const StyledButton = styled.button`
    background-color:#ffc65c;
    border:none;
    height: 40px;
    width: 130px;
    font-size: 16px;
    border-radius:5px;
    :hover{
        background-color:#aac26e;
    }
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
const StyledContBig = styled.div`
    margin-top:50px;
    margin-bottom:400px;
    /* position:absolute; */
    /* left: 50px;
    top: 100px;
    width:1100px; */

`
const StyledNameBig = styled.div`
    font-size: 50px;
    border-bottom:3px solid lightgray;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-left:15px;
    margin-right:15px;
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
    margin-bottom:600px;
`
export default Profile;