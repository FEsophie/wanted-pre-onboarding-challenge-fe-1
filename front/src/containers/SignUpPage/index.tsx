import React, { useEffect, useMemo } from "react";
import Signup from "./signup";
import { UserPageContainer } from "../AuthPage";
import { useLocation } from "react-router-dom";
import Button from "../../components/Button";

function SignUpPage() {
  const location = useLocation();

  const isCompleteSignUp = useMemo(
    () => location.search.includes("step=complete"),
    [location.search]
  );
  return (
    <UserPageContainer>
      {isCompleteSignUp ? (
        <div>
          <p>회원 가입 완료</p>
          <Button type={"link"} url={"/auth"} styleType={"primary"}>
            로그인 하러가기
          </Button>
        </div>
      ) : (
        <div>
          <h2>회원 가입</h2>
          <Signup />
        </div>
      )}
    </UserPageContainer>
  );
}

export default SignUpPage;
