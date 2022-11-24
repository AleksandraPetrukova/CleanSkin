import {useAuth0} from '@auth0/auth0-react'
import React from "react";
import styled from "styled-components";

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0()
    return ( 
        !isAuthenticated && (
            <StyledBtn onClick={() => loginWithRedirect()}>
                Sign In
            </StyledBtn>
        )
    );
}

const StyledBtn = styled.button`
    background-color:#2f5730;
    color:white;
    font-size:16px;
    border: none;
    margin-right:40px;
    height:35px;
    width:100px;
    border-radius:10px;
    :hover {
        background-color:#458046;
        font-weight:bold;
    }
`

export default LoginButton;