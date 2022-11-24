import { useState } from "react";
import styled from "styled-components";

const MakeReview = () => {

    const url = "https://api.cloudinary.com/v1_1/dcecm3xxu/image/upload";
    const form = document.querySelector("form");

    const [formData, setFormData] = useState({});
    let numbers =[];
    for (let i = 1; i <= 10; i++) {
        numbers.push(i);
    }
    //two fetches cloudinary post async await in context
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const handleSubmit = async () => {
        e.preventdefault();
        const files = document.querySelector("[type=file]").files;
        const formData = new FormData();

    }
    return ( 
        <StyledCont>
            
            <StyledForm onSubmit={handleSubmit}>
                <StyledHeading>Write your review:</StyledHeading>
                <StyledCard>
                    <StyledLabel>Product Name:</StyledLabel>
                    <StyledInput type="text" id="productName" name="productName" onChange={(e) => {setFormData({...formData, [e.target.id] : e.target.value})}}/>
                </StyledCard>
                <StyledCard>
                    <StyledLabel>Type:</StyledLabel>
                    <select type="text" id="type" name="type" onChange={(e) => {setFormData({...formData, [e.target.id] : e.target.value})}}>
                        <option value="">Select type of the product</option>
                        <option value="Cleansers">Cleansers</option>
                        <option value="Toners">Toners</option>
                        <option value="Essences">Essences</option>
                        <option value="Moisturizers">Moisturizers</option>
                        <option value="Treatments">Treatments</option>
                        <option value="Exfoliators">Exfoliators</option>
                        <option value="Masks">Masks</option>
                    </select>
                </StyledCard>
                <StyledCard>
                    <StyledLabel>Your review:</StyledLabel>
                    <textarea type="text" id="review" name="review" onChange={(e) => {setFormData({...formData, [e.target.id] : e.target.value})}}/>
                </StyledCard>
                <div>
                    <label>Your rating:</label>
                    <StyledRowNumb>
                        {numbers.map((number) => {
                            return (
                                <StyledRating>
                                    <input type="radio" name="radiobutton" value={number} onChange={(e) => {setFormData({...formData, rating : e.target.value})}}/>
                                    <label>{number}</label>
                                </StyledRating>
                            )
                        })}
                    </StyledRowNumb>
                </div>
                <div>Upload your image</div>
                <button>Upload your image</button>
            </StyledForm>
        </StyledCont>
    );
}

const StyledRating = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    gap:5px;
    font-weight:bold;
`
const StyledRowNumb = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
`
const StyledCard = styled.div`
    display: flex;
    gap: 20px;
    margin:10px;
`
const StyledLabel = styled.label`
    flex:1;
`
const StyledInput = styled.input`
    flex:2;
`
const StyledHeading = styled.div`
    font-size:30px;
    border-bottom:3px solid lightgray;
    margin-bottom:40px;
`
const StyledForm = styled.form`
    border: 2px solid lightgray;
    padding: 50px;
`
const StyledCont = styled.div`
    display: flex;
    justify-content:center;
    width: 100%;
    height:100vh;
    align-items:center;
    flex-direction:column;
    
`
export default MakeReview;