import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TextInput from "../../components/TextInput";
import styled from "styled-components";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";

interface input {
  [key: string]: string | boolean;
}

type refType = Partial<{ email: input; password: input }>;

function Login() {
  const inputGroupRef = useRef<refType>({});
  const [isActive, setActive] = useState(false);
  function setInputRef(type: "email" | "password") {
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
      onSetActive();
    };
  }

  function onSetActive() {
    if (
      !inputGroupRef?.current?.email?.error &&
      !inputGroupRef?.current?.password?.error
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  function onSubmit() {
    const { email, password } = inputGroupRef.current;
  }

  return (
    <LoginSection>
      <FormGroup>
        <TextInput
          id={"id-input"}
          text="아이디(이메일)"
          placeholder={"이메일을 입력해주세요"}
          onRef={setInputRef("email")}
          errorMessage={"@,.이 포함된 이메일 유형을 입력해주세요."}
          type="email"
          onChange={setInputRef("email")}
        />
        <TextInput
          id={"pwd-input"}
          onRef={setInputRef("password")}
          type="password"
          text="비밀번호"
          placeholder={"비밀번호를 입력해주세요"}
          emptyMessage={"비밀번호를 입력해주세요"}
          minLength={8}
          onChange={setInputRef("password")}
        />
        <ButtonGroup align="right">
          <Button
            disabled={!isActive}
            styleType={"secondary"}
            onClick={onSubmit}
          >
            로그인
          </Button>
          <Button styleType={"primary"} onClick={() => {}}>
            회원 가입
          </Button>
        </ButtonGroup>
      </FormGroup>
    </LoginSection>
  );
}

const FormGroup = styled.form`
  width: 100%;
  height: 200px;
  border: 2px solid;
  border-radius: 10px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginSection = styled.section`
  display: flex;
  width: 400px;
  margin: 0 auto;
`;

export default Login;
