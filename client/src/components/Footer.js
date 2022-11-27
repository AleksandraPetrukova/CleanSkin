import styled from "styled-components";

const Footer = () => {
    return ( 
        <StyledCont>
            <StyledText>MAKE YOUR SKIN <StyledGlow>(GLOW)</StyledGlow></StyledText>
            <div>
                <div>About</div>
                <div>Our Story</div>
                <div>Contact Us</div>
                <div>Join Our Team</div>
                <div>Terms of Service</div>
                <div>Privacy Policy</div>
                <div>Accessibility</div>
            </div>
            <div>
                <div>cleanskin@cleanskin.com</div>
                <div>0000 Generic Street, office 777</div>
                <div>Montreal, Canada</div>
            </div>
        </StyledCont>
     );
}

const StyledCont = styled.div`
    /* background-color:rgba(170, 194, 110, .5); */
    border-top: 1px solid gray;
    margin-top:50px;
    color:black;
    height: 200px;
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    gap: 100px;
    
`
const StyledText = styled.div`
    display: flex;
    flex-direction:column;
    /* margin-left: 300px;
    margin-top: 30px; */
`
const StyledGlow = styled.span`
font-size: 40px;
    animation: change 4s infinite;
    @keyframes change {
        0% {color: #33AB5F; left:0px; top:0px;}
        25% {color: #8CDBA9; left:200px; top: 0px;}
        50% {color: #fc8953; left: 200px; top: 200px;}
        75% {color: #ffc65c; left: 0px; top: 200px;}
        100% {color: #33AB5F;left:0px; top:0px;}
    }
`
export default Footer;