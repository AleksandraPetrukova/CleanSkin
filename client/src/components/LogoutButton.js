import {useAuth0} from '@auth0/auth0-react'
import React from "react";
import styled from "styled-components";

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0()
    return ( 
        isAuthenticated && (
            <StyledBtn onClick={() => logout()}>
                Sign Out
            </StyledBtn>
        )
    );
}
 
const StyledBtn = styled.button`
    background-color:#556b1e;
    color:white;
    font-size:16px;
    border: none;
    margin-right:40px;
    height:35px;
    width:100px;
    border-radius:10px;
    :hover {

        font-weight:bold;
    }
`
export default LogoutButton;