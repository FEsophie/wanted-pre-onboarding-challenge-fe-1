import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import { selectLoginUser } from "../../module/atom";
import { useRecoilValue } from "recoil";

function MainPage() {
  const [isSetAuthToken, setIsSetAuthToken] = useState(false);

  const user = useRecoilValue(selectLoginUser);

  function onClickClearToken() {
    localStorage.removeItem("authToken");
    setIsSetAuthToken(false);
  }

  useEffect(() => {
    const auth = localStorage.getItem("authToken");

    if (auth) {
      setIsSetAuthToken(true);
    } else {
      setIsSetAuthToken(false);
    }
  }, []);

  return (
    <MainPageContainer>
      <div>
        <h1>
          <span>welcome to</span> wanted-project
        </h1>
        {!isSetAuthToken ? (
          <LoginBtn type="link" url="/auth" styleType={"primary"}>
            로그인하러 가기
          </LoginBtn>
        ) : (
          <div>
            <p>로그인 완료</p>
            <ButtonGroup>
              <LoginBtn type="link" url="/todos" styleType={"primary"}>
                Todo 작성 하러 가기
              </LoginBtn>
              <Button
                type="button"
                styleType={"light"}
                onClick={onClickClearToken}
              >
                로그아웃
              </Button>
            </ButtonGroup>
          </div>
        )}
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
