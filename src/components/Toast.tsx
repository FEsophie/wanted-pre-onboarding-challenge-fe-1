import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import BSToast from "react-bootstrap/Toast";
import styled from "styled-components";
import { ToastProvider } from "../hooks/useToast";

export interface ToastProps {
  id: string;
  autohide?: boolean;
  type?: "success" | "error" | "warning";
  content?: React.ReactNode;
  onAfterDelete?: (id: string) => void;
}

const TOAST_WIDTH = 350;
const AUTO_HIDE_MS = 3000;

function Toast({
  id,
  autohide = true,
  type = "success",
  content,
  onAfterDelete,
}: ToastProps) {
  const [show, setShow] = useState(true);
  const [realShow, setRealShow] = useState(false);
  const icon = useMemo(() => {
    if (type === "success") return "check_circle";
    if (type === "warning") return "info";
    if (type === "error") return "warning";
    return "";
  }, [type]);

  function onClose() {
    setRealShow(() => false);

    setTimeout(() => {
      setShow(false);
      if (onAfterDelete) onAfterDelete(id);
    }, AUTO_HIDE_MS);
  }

  useEffect(
    function onShow() {
      if (show) {
        setTimeout(() => setRealShow(true), 100);
      }
    },
    [show]
  );

  useEffect(function onMount() {
    let timeoutId: NodeJS.Timeout;

    if (autohide) {
      timeoutId = setTimeout(() => {
        if (onAfterDelete) onAfterDelete(id);
      }, AUTO_HIDE_MS);
    }

    return function onUnmount() {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <BSToastWrap show={realShow} type={type} onClose={onClose}>
      <BSToast.Body>
        <ToastWrp>
          {icon && (
            <ToastIconWrapper className="mr-2">
              <span className="material-icons">{icon}</span>
            </ToastIconWrapper>
          )}
          <ToastContentWrapper>{content}</ToastContentWrapper>
          <ToastIconWrapper className="ml-2">
            <span className="material-icons" onClick={onClose} role="button">
              close
            </span>
          </ToastIconWrapper>
        </ToastWrp>
      </BSToast.Body>
    </BSToastWrap>
  );
}

export function ToastContainer({
  list,
  setList,
}: {
  list: ToastProps[];
  setList: React.Dispatch<SetStateAction<ToastProps[]>>;
}) {
  function onAfterDelete(id: string) {
    setList((prevList) => prevList.filter((pl) => pl.id !== id));
  }

  return (
    <ToastContainerWrapper aria-live="polite" aria-atomic="true">
      <ToastContainerInner>
        {list.map((toast) => (
          <Toast
            {...toast}
            onAfterDelete={onAfterDelete}
            key={`toast-container-${toast.id}`}
          />
        ))}
      </ToastContainerInner>
    </ToastContainerWrapper>
  );
}

const BSToastWrap = styled(BSToast)<Pick<ToastProps, "type">>`
  width: ${TOAST_WIDTH}px;
  background-color: ${({ type, theme }) => {
    if (type === "success") return theme.colors.green500;
    if (type === "warning") return theme.colors.yellow400;
    if (type === "error") return theme.colors.red500;
    return "#fff";
  }};
  color: ${({ type, theme }) => (type ? "#fff" : theme.colors.gray700)};
`;

const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 50px;
  right: 25px;
  min-height: 200px;
  z-index: 99999;
`;

const ToastContainerInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: default;
`;

const ToastContentWrapper = styled.div`
  flex-grow: 1;
  min-width: calc(${TOAST_WIDTH}px - (0.75em * 2) - (26px * 2));
  font-size: 1rem;
  line-height: 1.3;
  word-break: keep-all;
`;

const ToastIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  padding-right: 10px;
`;

const ToastWrp = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

export default Toast;
