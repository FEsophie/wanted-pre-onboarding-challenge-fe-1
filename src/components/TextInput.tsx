import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Utils from "../utils";
import styled from "styled-components";

interface TextInputProps {
  id?: string;
  text?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onFocus?: () => void;
  onEnter?: () => void;
  onChange?: (param?: any) => void;
  errorMessage?: string;
  emptyMessage?: string;
  onRef?: (ref: HTMLInputElement | null, v?: boolean) => void;
  minLength?: number;
  maxLength?: number;
}

function TextInput({
  id,
  text,
  value,
  type = "text",
  onFocus,
  onEnter,
  placeholder,
  errorMessage,
  emptyMessage,
  onRef,
  minLength,
  maxLength,
  onChange,
}: TextInputProps) {
  const uuid = id ? id : Utils.uuidV4();
  const [textValue, setTextValue] = useState("" || value);

  const [error, setError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);

  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = textRef.current;

    if (type === "email") {
      const isValid = Utils.isValidEmail(textRef.current?.value);
      onRef?.(input, !isValid);
    } else if (type === "password") {
      const isValid = textRef.current?.value.length! >= minLength!;
      onRef?.(input, !isValid);

      if (!isValid) {
        setMinLengthError(true);
      }
    } else {
      onRef?.(input);
    }

    setError(false);
    setMinLengthError(false);
    setMaxLengthError(false);
  }, [textRef.current?.value]);

  return (
    <InputGroupContainer>
      <InputGroup>
        {text && <Label htmlFor={uuid}>{text}</Label>}
        <Input
          placeholder={placeholder || ""}
          type={type}
          id={uuid}
          value={textValue}
          ref={textRef}
          onChange={(e) => {
            setTextValue(e.target.value);
          }}
          onFocus={onFocus}
        />
      </InputGroup>
      {minLengthError && minLength && (
        <p className="error-message">{`글자수를 ${minLength}이상 입력해주세요`}</p>
      )}
      {maxLengthError && maxLength && (
        <p className="error-message">{`글자수를 ${maxLength}이내로 입력해주세요`}</p>
      )}
      {error && <p className="error-message">{errorMessage}</p>}
    </InputGroupContainer>
  );
}

const InputGroupContainer = styled.div`
  text-align: left;

  .error-message {
    color: red;
  }
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  padding-left: 10px;
  background-color: white;
  flex-grow: 1;
  font-size: 14px;
  line-height: 28px;
  border: none;
  color: black;
  border-bottom: 1px solid gray;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: black !important;
  }
`;

export default TextInput;
