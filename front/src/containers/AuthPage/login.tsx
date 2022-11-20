import React, {
    useRef,
    useState,
} from "react";
import TextInput from "../../components/TextInput";
import styled from "styled-components";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import { useUserLogin } from "../../service/users/useUserService";
import { FormGroup } from "./index";
import { useNavigate } from "react-router-dom";
import {
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { loginUser } from "../../module/atom";
import { useToast } from "../../hooks/useToast";

interface input {
    value: string;
    error: boolean;
}

type refType = Partial<{ emailInput: input; passwordInput: input }>;

function Login() {
    const setLoginUser = useSetRecoilState(loginUser);

    const navigator = useNavigate();
    const inputGroupRef = useRef<refType>({});
    const [isActive, setActive] = useState(false);

    function onSetUserEmail(value: string) {
        setLoginUser({ userEmail: value });
    }

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
            onSetActive();
        };
    }

    function onSetActive() {
        if (
            !inputGroupRef?.current?.emailInput?.error &&
            !inputGroupRef?.current?.passwordInput?.error
        ) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    const fetchLoginMutation = useUserLogin();

    function onSubmit() {
        const { emailInput, passwordInput } = inputGroupRef.current;

        const email = emailInput?.value || "";
        const password = passwordInput?.value || "";

        const toast = useToast();

        fetchLoginMutation.mutate(
            { email, password },
            {
                onSuccess(res) {
                    localStorage.setItem("authToken", res.token);
                    onSetUserEmail(email);
                    toast("로그인 성공", { type: "success" });
                },
                onError() {
                    toast("로그인 실패", { type: "error" });
                },
            }
        );
    }

    return (
        <LoginSection>
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
                    <Button
                        disabled={!isActive}
                        styleType={"secondary"}
                        onClick={onSubmit}
                    >
                        로그인
                    </Button>
                    <Button styleType={"primary"} onClick={() => navigator("/signup")}>
                        회원 가입
                    </Button>
                </ButtonGroup>
                <MoveToHomeBtn styleType="light" onClick={() => navigator("/")}>
                    홈으로 이동
                </MoveToHomeBtn>
            </FormGroup>
        </LoginSection>
    );
}

const LoginSection = styled.section`
  display: flex;
  width: 400px;
  margin: 0 auto;
`;

const MoveToHomeBtn = styled(Button)`
  margin-top: 10px;
`;

export default Login;
