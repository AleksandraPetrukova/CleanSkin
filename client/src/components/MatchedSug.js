import { useContext } from "react";
import { MatchedContext } from "./MatchedContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MatchedSug = () => {
    const { newMatchSug, matchedSuggestions , suggestions, setValue} = useContext(MatchedContext)
    // console.log("MCS", matchedSuggestions)
    
    return ( 
        !newMatchSug? <div>Loading</div>:
        <div>
            {newMatchSug.map((review) => {
                return (
                    <div key ={review._id}>
                        <StyledLink to={`/review/${review._id}`}>
                        <StyledCont>
                            <StyledName>{review.productName}</StyledName>
                            <StyledAuthor>by {review.displayName}</StyledAuthor>
                            <StyledRating>Rating: <StyledNumb>{review.rating}</StyledNumb>/10</StyledRating>
                        </StyledCont>
                    </StyledLink>
                    </div>
                )
            })}
            
        </div>
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

export default MatchedSug;