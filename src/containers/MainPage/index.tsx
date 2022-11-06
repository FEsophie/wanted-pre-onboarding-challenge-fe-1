import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";

function MainPage() {
  return (
    <MainPageContainer>
      <div>
        <h1>
          <span>welcome to</span> wanted-project
        </h1>
        <LoginBtn type="link" url="/auth" styleType={"primary"}>
          로그인하러 가기
        </LoginBtn>
      </div>
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const LoginBtn = styled(Button)``;

export default MainPage;
