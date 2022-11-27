import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/leaf.png"
import {useAuth0} from '@auth0/auth0-react'
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    // console.log(user)
    return ( 
        <StyledCont>
            <StyledLink to="/">
                <StyledImg src={Logo}/>
                <h1>ClearSkin</h1>
            </StyledLink>
            <SearchBar />
            <StyledProfile>
                {!isAuthenticated? <div>Join us!</div>:
                <StyledProfileLink to={`/profile/${user.nickname}`}>
                <div>Hello, {user.given_name}</div>
                </StyledProfileLink>}
                <div>
                    <LoginButton/>
                    <LogoutButton/>
                </div>
            </StyledProfile>
        </StyledCont>
    );
}

const StyledProfile = styled.div`
    display:flex;
    flex-direction:row;
    gap: 20px;
    align-items: center;
`
const StyledProfileLink = styled(NavLink)`
    text-decoration:none;
    color: white;
    font-size: 20px;
    :hover{
        color:#556b1e;
    }
`
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
    background-color:#aac26e;
    
    height: 60px;
    
`

export default Header;