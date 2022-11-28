import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const DeleteReview = ({showDeleteOption, setShowDeleteOption, _id}) => {
    const navigate = useNavigate()
    const deleteReview = () => {
        fetch ("/delete-review", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({_id})
            })
            
            .then(data => {
                navigate("/deletesuccess")
            })
        
    }

    return ( 
        <StyledTest>
            <div>Are you sure you want to delete your review? You won't be able to return it back.</div>
            <StyledBtns>
                <StyledYes onClick={() => deleteReview()}>Yes</StyledYes>
                <StyledNo onClick={() => setShowDeleteOption(false)}>No</StyledNo>
            </StyledBtns>
        </StyledTest>
    );
}

const StyledYes = styled.button`
    width:60px;
    background-color:rgba(85, 107, 30, .6);
    border: none;
    border-radius:5px;
    padding:5px;
    font-size:15px;
    :hover{
        font-size: 17px;
        
    }
`
const StyledNo = styled.button`
    width:60px;
    background-color:rgba(255, 0, 0, .4);
    border: none;
    border-radius:5px;
    padding:5px;
    font-size:15px;
    :hover{
        font-size: 17px;
    }
`
const StyledBtns = styled.div`
    display:flex;
    flex-direction:row;
    gap:30px;
    justify-content:center;
`
const StyledTest =styled.div`
    background-color:rgba(255, 0, 0, .25);
    border: 2px solid rgba(255, 0, 0, .4);
    border-radius:10px;
    padding:10px;
    display:flex;
    flex-direction: column;
    gap: 10px;
`
 
export default DeleteReview;