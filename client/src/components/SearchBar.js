import { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import {MatchedContext} from "./MatchedContext"


const SearchBar = () => {
    const { setNewMatchSug, matchedSuggestions, value, setValue, suggestions, setSuggestions} = useContext(MatchedContext)
    const navigate = useNavigate();
    const refInput = useRef(null)
    // const [value, setValue] = useState('');
    // const [suggestions, setSuggestions] = useState([]);
    // useEffect(() => {
    //     fetch(`/get-reviews`)
    //         .then(res => res.json())
    //         .then((data) => {
    //             setSuggestions(data.data.map((review) => {
    //                 return{productName: review.productName, _id: review._id, type: review.type}
    //             }))
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
        
    // }, [])
    
    // const matchedSuggestions = suggestions.filter((suggestion) => {
    //     if (
    //         value.length > 0 &&
    //         suggestion.productName.toLowerCase().includes(value.toLowerCase())
    //     ) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // })

    const location = window.location;
    useEffect(() => {
        //every time URL changes, if not home page, setValue to empty
        //this makes the result list disapper and empties what was written in the searchbox
        if (location.pathname !== "/") {
            // setValue("");
        }
    }, [location.pathname]);
      //every time location.path is changing, the useEffect will get triggered

    return ( 
        <div>
        <StyledSearch>
            <StyledInput type='text' value={value} ref={refInput}
            onChange={(ev)=>{
                // console.log("onChange", ev.target.value)
                setValue(ev.target.value)
            }}
            onKeyDown={(ev)=>{if (ev.key ==='Enter')
            {
                // console.log('before navigate', matchedSuggestions)
                // refInput.current.value=""
                setNewMatchSug(matchedSuggestions)
                navigate(`/matchedsuggestions`)
                setValue("")
            }
            }}
            />
            <FiSearch/>
        </StyledSearch>
            {value && matchedSuggestions.length>0 && 
            <StyledUl>
                {value && matchedSuggestions.map((suggestion) => {
                    const indexOfVal = suggestion.productName.toLowerCase().indexOf(value.toLowerCase());
                    const firstHalf = suggestion.productName.slice(0, value.length+indexOfVal)
                    const secondHalf = suggestion.productName.slice(indexOfVal+value.length)
                    return (
                        <StyledLi key = {suggestion._id}
                        onClick={() => {
                            navigate(`/review/${suggestion._id}`)
                            setValue("") 
                        }}
                        >
                            <StyledSpan>
                            <Prediction>{firstHalf}</Prediction>
                            {secondHalf} 
                            <StyledPlace>{" "}in {suggestion.type}</StyledPlace>
                            </StyledSpan>
                        </StyledLi>
                    )
                })}
                </StyledUl>}
                
        </div>
    );
}

const StyledPlace = styled.div`
    font-size: 15px;
    font-style:italic;
    color: gray;
    margin-left:5px;
`
const StyledSpan = styled.span`
    display:flex;
    flex-direction: row;
    
    width: 600px;
`
const StyledLi=styled.li`
    padding:5px;
    font-size:15px;
    :hover {
        background-color:rgba(255, 198, 92, .6);
        border-radius:10px;
    }
    
`
const StyledUl = styled.ul`
    width:650px;
    position:absolute;
    background-color: rgba(255, 255, 255, .5);
    list-style-type: none;
    padding:20px;
    border-radius:5px;
`
const StyledInput = styled.input`
    border: none;
    padding:5px;
    border-radius:10px;
    width:300px;
`
const StyledSearch = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    border: 1px solid gray;
    background-color:white;
    gap:5px;
    border-radius:10px;
    position:relative;
    padding:5px;
    border:none;
    background-color: rgba(255, 255, 255, .5);
`
const Prediction = styled.span`
    font-weight: bold;
`;

export default SearchBar;