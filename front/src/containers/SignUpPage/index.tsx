import React from "react";
import Signup from "./signup";
import { UserPageContainer } from "../AuthPage";

function SignUpPage() {
    return (
        <UserPageContainer>
            <div>
                <h2>회원 가입</h2>
                <Signup />
            </div>
        </UserPageContainer>
    );
}

export default SignUpPage;
