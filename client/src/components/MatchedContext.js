import { createContext, useEffect, useState } from "react";

export const MatchedContext = createContext(null)

export const MatchedProvider = ({children}) => {
    
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [newMatchSug, setNewMatchSug] = useState(null)
    // console.log(value)
    // console.log(suggestions)
    useEffect(() => {
        fetch(`/get-reviews`)
            .then(res => res.json())
            .then((data) => {
                setSuggestions(data.data.map((review) => {
                    return{rating: review.rating, displayName: review.displayName, productName: review.productName, _id: review._id, type: review.type}
                }))
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    const matchedSuggestions = suggestions.filter((suggestion) => {
        if (
            // value.length > 0 &&
            suggestion.productName.toLowerCase().includes(value.toLowerCase())
        ) {
            return true;
        }
        else {
            return false;
        }
    })
    // console.log("value", value)
    // console.log("MC", matchedSuggestions)
    return (
        <MatchedContext.Provider value={{newMatchSug,setNewMatchSug,matchedSuggestions, value, setValue, suggestions, setSuggestions}}>
            {children}
        </MatchedContext.Provider>
    )
}