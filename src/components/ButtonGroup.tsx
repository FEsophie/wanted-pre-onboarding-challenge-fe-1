import React from "react";
import styled from "styled-components";

interface ButtonGroupProps {
  children: React.ReactNode;
  align?: "center" | "left" | "right";
  type?: "inline" | "block";
}

function ButtonGroup({ children, align = "center", type }: ButtonGroupProps) {
  return <ButtonGroupContainer align={align}>{children}</ButtonGroupContainer>;
}

const ButtonGroupContainer = styled.div<Pick<ButtonGroupProps, "align">>`
  text-align: ${({ align }) => align};

  display: flex;
  & > * {
    width: 80%;
    flex-grow: 1;
    margin-right: 10px;

    &:last-child {
      margin: 0;
    }
  }
`;

export default ButtonGroup;
