import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/leaf.png"

import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {

    return ( 
        <StyledCont>
            <StyledLink to="/">
                <StyledImg src={Logo}/>
                <h1>ClearSkin</h1>
            </StyledLink>
            <SearchBar 
            
            />
            <div>
                <LoginButton/>
                <LogoutButton/>
            </div>
        </StyledCont>
    );
}

const StyledImg = styled.img`
    height:40px;
    color: white;
`
const StyledLink = styled(NavLink)`
    text-decoration:none;
    color: white;
    display:flex;
    flex-direction: row;
    align-items: center;
    
`
const StyledCont = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    background-color:#9fe3a1;
    
    height: 60px;
    
`

export default Header;