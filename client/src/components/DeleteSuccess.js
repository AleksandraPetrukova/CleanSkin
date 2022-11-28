import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteSuccess = () => {
    let seconds = 4;
    const [counter, setCounter] = useState(3)
    const navigate = useNavigate()
    useEffect (() => {
        setTimeout(() => {
        navigate("/");
    }, 3000)
    }, [])
    
    useEffect(() => {
        const timer = 
            counter > 0 && setInterval(() => setCounter(counter-1), 1000);
        return () => clearInterval(timer);
    },[counter])

    return ( 
        <StyledCont>
            
                <StyledBold>Your review delete was successful</StyledBold>
                <div>You will be redirected to the main page in {counter}</div>
            
        </StyledCont>
    );
}

const StyledCont= styled.div`
    display:flex;
    flex-direction:column;
    height: 100vh;
    width:100vw;
    align-items:center;
    justify-content:center;
    font-size: 35px;
`
const StyledBold = styled.div`
    font-weight:bold;
`
export default DeleteSuccess;