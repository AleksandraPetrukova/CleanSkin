import { useState } from "react";
import styled from "styled-components";

const MakeReview = () => {
    const [formData, setFormData] = useState({});
    
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    
    return ( 
        <StyledCont>
            
            <StyledForm>
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
                    
                </div>
            </StyledForm>
        </StyledCont>
    );
}

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