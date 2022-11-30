import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {BounceLoader} from "react-spinners";
import {useAuth0} from '@auth0/auth0-react'
import DeleteReview from "./DeleteReview";
import DOMPurify from 'dompurify';

const Review = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState(null)
    const [userComment, setUserComment] = useState({})
    const [showDeleteOption, setShowDeleteOption] = useState(false)
    const navigate = useNavigate()
    
    const {reviewId} = useParams();
    useEffect(() => {
        fetch(`/get-review/${reviewId}`)
        .then (res => res.json()
        .then(data => {
            setReview(data.data)
            setComments(data.data.comments)
            setLoading(false);
            userComment.displayName = user?.name
        }))
    }, [reviewId]);
    
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
    
    if (loading || !review || !comments) {
        return <StyledLoader color="#9fe3a1"/>
    }
    return ( 
        
        <StyledCont>
            <StyledCardDeleteBtn>
                <StyledCard>
                    {review.imgSrc
                    ? <StyledImg src={review.imgSrc}/>
                    :<div> </div>}
                    <div>
                        <StyledName>{review.productName}</StyledName>
                        <StyledType>{review.type}</StyledType>
                        <StyledNameRating>
                            <StyledLinkProf to={`/profile/${review?.handle}`}>
                            <div>by {review.displayName}</div>
                            </StyledLinkProf>
                            <StyledRating><StyledNum>{review.rating}</StyledNum>/10</StyledRating>
                        </StyledNameRating>
                        {/* dangerouslySetInnerHTML sending html from myeditor to mongo as a html and returning it back styled */}
                        <div 
                        dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(review.review) }}
                        >
                            {/* {review.review} */}
                            </div>
                    </div>
                </StyledCard>
                <StyledButtons>
                    
                    {review.handle === user?.nickname &&
                        <StyledDeleteBtn>
                                <StyledBtnDel onClick={() => {
                                setShowDeleteOption(true)
                                }}>Delete</StyledBtnDel>
                                {showDeleteOption && <DeleteReview _id={review._id} showDeleteOption={showDeleteOption} setShowDeleteOption={setShowDeleteOption}/>}
                        </StyledDeleteBtn>}
                    {review.handle === user?.nickname &&
                        <div>
                            <StyledUpdatebtn onClick={() => navigate(`/updatereview/${review._id}`)}>Update</StyledUpdatebtn>
                        </div>}
                </StyledButtons>
            </StyledCardDeleteBtn>
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
                    <StyledLinkProf to={`/profile/${review.handle}`}>
                        <StyledCommentName>{comment.displayName}</StyledCommentName>
                    </StyledLinkProf>
                    <div>{comment.comment}</div>
                    </StyledOldComment>
                )
            })
            }
            
        </StyledCommentCont>
        </StyledCont>
    );
}

const StyledButtons = styled.div`
    display:flex;
    flex-direction:row;
    gap:20px;
    justify-content: space-between;
`
const StyledUpdatebtn = styled.button`
    width:70px;
    background-color:rgba(255, 198, 92);
    border: none;
    border-radius:5px;
    padding:5px;
    font-size:15px;
    :hover{
        font-size: 17px;
    }
`
const StyledBtnDel = styled.button`
    width:70px;
    background-color:rgba(255, 0, 0, .4);
    border: none;
    border-radius:5px;
    padding:5px;
    font-size:15px;
    :hover{
        font-size: 17px;
    }
`
const StyledDeleteBtn = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
`
const StyledCommentName = styled.div`
    font-weight:bold;
    font-size:17px;
    margin-bottom:5px;
`
const StyledNameRating = styled.div`
    display:flex;
    flex-direction:row;
    align-items: flex-end;
    justify-content:space-between;
    margin-bottom: 10px;
`
const StyledLinkProf= styled(NavLink)`
    color: black;
    :hover{
        color:#ffc65c;
    }
    text-decoration:none;
`
const StyledImg = styled.img`
    width:300px;
    height:500px;
    object-fit:cover;
    border-radius:5px;
    box-shadow: rgba(170, 194, 110, 0.4) 0px 5px, rgba(170, 194, 110, 0.3) 0px 10px, rgba(170, 194, 110, 0.2) 0px 15px, rgba(170, 194, 110, 0.1) 0px 20px, rgba(170, 194, 110, 0.05) 0px 25px;
`
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
    font-size:40px;
    font-weight:bold;
`
const StyledRating = styled.div`
    font-size:30px;
`
const StyledType = styled.div`
    font-style:italic;
    font-size:20px;
    color:gray;
    margin-bottom:30px;
`
const StyledName = styled.div`
    font-size:30px;
    border-bottom:3px solid #aac26e;
    padding-bottom:10px;
    margin-bottom:10px;
`
const StyledCard = styled.div`
    display:flex;
    flex-direction:row;
    gap: 20px;
`
const StyledCardDeleteBtn = styled.div`
    width:800px;
    border: 2px solid green;
    padding:50px;
    border-radius:15px;
    display:flex;
    flex-direction:column;
    gap:20px;
`
const StyledCont = styled.div`
    flex-direction:column;
    display:flex;
    /* justify-content:center; */
    margin-top: 50px;
    
    align-items:center;
    width: 100%;
    
`
const StyledLoader = styled(BounceLoader)`
    position: absolute;
    top: 300px;
    left: 45%;
    z-index: 5;
    margin-bottom:600px;
`
export default Review;