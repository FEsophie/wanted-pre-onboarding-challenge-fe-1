import React from "react";
import styled from "styled-components";
import Login from "./login";

function UserPage() {
    return (
        <UserPageContainer>
            <div>
                <h2>로그인</h2>
                <Login />
            </div>
        </UserPageContainer>
    );
}

export const UserPageContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormGroup = styled.form`
  width: 100%;
  height: 200px;
  border: 2px solid;
  border-radius: 10px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default UserPage;
