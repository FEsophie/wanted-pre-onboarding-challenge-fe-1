import React from "react";
import { Link } from "react-router-dom";
import Utils from "../utils";
import styled, { css } from "styled-components";

interface ButtonProps {
  id?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "link";
  styleType?: "primary" | "secondary" | "dark" | "light";
  isFilled?: boolean;
  onClick?: () => void;
  url?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function Button(props: ButtonProps) {
  const {
    id,
    size = "md",
    type = "button",
    styleType,
    onClick,
    children,
    isFilled = true,
    disabled,
    className,
  } = props;

  const uuid = id ? id : Utils.uuidV4();

  if (type === "button") {
    return (
      <StyledButton
        id={uuid}
        disabled={disabled}
        className={`btn  ${
          isFilled ? `btn-${styleType}` : `btn-outline-${styleType}`
        } btn-${size} ${disabled ? "btn-disabled" : ""} ${className}`}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        {children}
      </StyledButton>
    );
  } else {
    return <LinkButton {...props} id={uuid} />;
  }
}

function LinkButton(props: ButtonProps) {
  const {
    id,
    size = "md",
    type = "button",
    styleType,
    onClick,
    url = "/",
    children,
    isFilled = true,
    className,
  } = props;

  return (
    <StyledLinkBtn
      id={id}
      to={url}
      className={`btn  ${
        isFilled ? `btn-${styleType}` : `btn-outline-${styleType}`
      } btn-${size} ${className}`}
    >
      {children}
    </StyledLinkBtn>
  );
}

const typeCSS = css`
  &.btn {
    border: none;
    padding: 10px 20px;
    background: transparent;
    border-radius: 6px;
    font-weight: 700;
  }

  &.btn-sm {
    font-size: 12px;
  }

  &.btn-md {
    font-size: 14px;
  }

  &.btn-lg {
    font-size: 16px;
  }

  &.btn-outline-secondary {
    color: black;
    border: 1px solid black;
  }

  &.btn-outline-primary {
    color: purple;
    border: 1px solid purple;
  }

  &.btn-outline-dark {
    color: darkgray;
    border: 1px solid darkgray;
  }

  &.btn-outline-light {
    color: lightgray;
    border: 1px solid lightgray;
  }

  &.btn-secondary {
    background: black;
    color: white;
  }

  &.btn-primary {
    background: purple;
    color: white;
  }

  &.btn-dark {
    background: darkgray;
    color: white;
  }

  &.btn-light {
    background: lightgray;
    color: white;
  }

  &.btn-disabled {
    background: #ddd !important;
  }
`;

const StyledButton = styled.button`
  border: none;

  ${typeCSS}
`;

const StyledLinkBtn = styled(Link)`
  color: black;
  text-decoration: none;

  ${typeCSS}
`;

export default Button;
