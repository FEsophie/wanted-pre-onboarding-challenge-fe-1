import TextInput from "../../components/TextInput";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import React, { useRef } from "react";
import { FormGroup } from "../AuthPage";
import styled from "styled-components";
import {
  useUserLogin,
  useUserSignUp,
} from "../../service/users/useUserService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

interface input {
  value: string;
  error: boolean;
}

type refType = Partial<{ emailInput: input; passwordInput: input }>;

function Signup() {
  const navigator = useNavigate();
  const inputGroupRef = useRef<refType>({});
  const fetchSignUpMutation = useUserSignUp();
  const toast = useToast();

  function setInputRef(type: "emailInput" | "passwordInput") {
    return (ref: HTMLInputElement | null, isValid?: boolean) => {
      const value = ref?.value;
      inputGroupRef.current = {
        ...inputGroupRef?.current,
        ...{
          [type]: {
            value,
            error: isValid,
          },
        },
      };
    };
  }

  function onSubmit() {
    const { emailInput, passwordInput } = inputGroupRef.current;

    const email = emailInput?.value || "";
    const password = passwordInput?.value || "";

    fetchSignUpMutation.mutate(
      { email, password },
      {
        onSuccess() {
          toast("회원가입 성공", { type: "success" });
          navigator("/signup?step=complete");
        },
        onError() {
          toast("회원가입 실패", { type: "error" });
        },
      }
    );
  }

  return (
    <SignUpSection>
      <FormGroup>
        <TextInput
          id={"id-input"}
          text="아이디(이메일)"
          placeholder={"이메일을 입력해주세요"}
          onRef={setInputRef("emailInput")}
          errorMessage={"@,.이 포함된 이메일 유형을 입력해주세요."}
          type="email"
          onChange={setInputRef("emailInput")}
        />
        <TextInput
          id={"pwd-input"}
          onRef={setInputRef("passwordInput")}
          type="password"
          text="비밀번호"
          placeholder={"비밀번호를 입력해주세요"}
          emptyMessage={"비밀번호를 입력해주세요"}
          minLength={8}
          onChange={setInputRef("passwordInput")}
        />
        <ButtonGroup align="right">
          <Button styleType={"light"} onClick={() => navigator(-1)}>
            취소
          </Button>
          <Button styleType={"primary"} onClick={onSubmit}>
            회원 가입
          </Button>
        </ButtonGroup>
      </FormGroup>
    </SignUpSection>
  );
}

const SignUpSection = styled.section`
  display: flex;
  width: 400px;
  margin: 0 auto;
`;

export default Signup;
