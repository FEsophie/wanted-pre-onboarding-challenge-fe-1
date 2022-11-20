import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";

function NotFound() {
  return (
    <NotFoundContainer>
      <div>
        <h1>잘못된 페이지입니다</h1>
        <Button type="link" url={"/"} styleType={"secondary"}>
          홈 화면으로 돌아 가기
        </Button>
      </div>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default NotFound;
