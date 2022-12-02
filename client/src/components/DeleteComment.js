import { useEffect, useState } from "react";

import styled from "styled-components";

const DeleteComment = ({_id, comment, reviewId}) => {
    const [reload, setReload] = useState(false);

    const deleteComment = () => {
        fetch ("/delete-comment", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({_id, comment})
            })
    }

    return ( 
        <StyledBtnDivCom>
            <StyledBtnCom onClick={() => deleteComment()}>X</StyledBtnCom>
        </StyledBtnDivCom>
    );
}

const StyledBtnCom = styled.button`
    border:none;
    font-weight:bold;
    color:gray;
    :hover{
        color:#ffc65c;
    }
`
const StyledBtnDivCom = styled.div`
    display:flex;
    justify-content:flex-end;
`

export default DeleteComment;