import styled from "styled-components";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <StyledCont>
            <StyledText>MAKE YOUR SKIN <StyledGlow>(GLOW)</StyledGlow></StyledText>
            <div>
                <StyledAbout>About</StyledAbout>
                <StyledHover>Our Story</StyledHover>
                <StyledHover>Contact Us</StyledHover>
                <StyledHover>Join Our Team</StyledHover>
                <StyledHover>Terms of Service</StyledHover>
                <StyledHover>Privacy Policy</StyledHover>
                <StyledHover>Accessibility</StyledHover>
            </div>
            <div>
                <StyledIcons>
                    <a  href="https://github.com/AleksandraPetrukova" target="_blank">
                    <FiGithub/>
                    </a>
                    <a href="https://www.linkedin.com/in/aleksandra-petrukova-7b1135255/">
                    <FiLinkedin/>
                    </a>
                </StyledIcons>
                <div>cleanskin@cleanskin.com</div>
                <div>0000 Generic Street, office 777</div>
                <div>Montreal, Canada</div>
            </div>
        </StyledCont>
    );
}

const StyledIcons = styled.div`
    font-size: 25px;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    margin-bottom:20px;
    
`
const StyledHover = styled.div`
    :hover {
        text-decoration:underline;
    }
`
const StyledAbout = styled.div`
    font-weight:bold;
`
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