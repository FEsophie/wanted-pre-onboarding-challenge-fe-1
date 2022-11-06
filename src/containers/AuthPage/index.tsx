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

const UserPageContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default UserPage;
