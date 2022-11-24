import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`/get-reviews`)
            .then(res => res.json())
            .then((data) => {
                setSuggestions(data.data.map((review) => {
                    return{productName: review.productName, _id: review._id, type: review.type}
                }))
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, [])
    
    const matchedSuggestions = suggestions.filter((suggestion) => {
        if (
            value.length > 0 &&
            suggestion.productName.toLowerCase().includes(value.toLowerCase())
        ) {
            return true;
        }
        else {
            return false;
        }
    })


    return ( 
        <div>
        <StyledSearch>
            <StyledInput type='text' value={value}
            onChange={(ev)=>setValue(ev.target.value)}
            onKeyDown={(ev)=>{if (ev.key ==='Enter')
            {navigate(`/matchedsuggestions`)
            }
            }}
            />
            <FiSearch/>
        </StyledSearch>
            {matchedSuggestions.length>0 && <ul>
                {matchedSuggestions.map((suggestion) => {
                    const indexOfVal = suggestion.productName.toLowerCase().indexOf(value.toLowerCase());
                    const firstHalf = suggestion.productName.slice(0, value.length+indexOfVal)
                    const secondHalf = suggestion.productName.slice(indexOfVal+value.length)
                    return (
                        <li key = {suggestion._id}
                        onClick={() => {
                            navigate(`/review/${suggestion._id}`)
                        }}
                        >
                            <span>
                            <Prediction>{firstHalf}</Prediction>
                            {secondHalf}
                            <div>{suggestion.type}</div>
                            </span>
                        </li>
                    )
                })}
                </ul>}
                
        </div>
    );
}

const StyledInput = styled.input`
    border: none;
    padding:5px;
    border-radius:10px;
`
const StyledSearch = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    border: 1px solid gray;
    background-color:white;
    gap:5px;
    border-radius:10px;
    

`
const Prediction = styled.span`
    font-weight: bold;
`;

export default SearchBar;