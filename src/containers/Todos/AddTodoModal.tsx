import React, { useEffect, useState } from "react";
import { useCreateTodoItem } from "../../service/todos/useTodoService";
import { useToast } from "../../hooks/useToast";
import isEmpty from "lodash/isEmpty";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styled from "styled-components";

interface AddTodoItemModalProps {
  show: boolean;
  onClose: () => void;
  onLoadTodoList: () => void;
}

function AddTodoItemModal({
  show,
  onClose,
  onLoadTodoList,
}: AddTodoItemModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const addTodoMutation = useCreateTodoItem();

  const toast = useToast();

  function onSetFormData(type: string) {
    return (v: string) => {
      setFormData((prev) => ({
        ...prev,
        [type]: v,
      }));
    };
  }

  function onAddTodoItem() {
    if (isEmpty(formData["title"])) {
      alert("제목을 입력해주세요");
      return;
    }

    if (isEmpty(formData["content"])) {
      alert("제목을 입력해주세요");
      return;
    }

    addTodoMutation.mutate(formData, {
      onSuccess() {
        toast("할일을 추가하였습니다.", { type: "success" });
        onClose();
        onLoadTodoList();
      },
      onError() {
        toast("예기치 못한 에러로 할 일을 추가할 수 없습니다.", {
          type: "error",
        });
      },
    });
  }

  useEffect(() => {
    return () => {
      setFormData({
        title: "",
        content: "",
      });
    };
  }, [show]);

  return (
    <>
      {show && (
        <AddTodoItemModalContainer>
          <AddTodoItemModalDimmed></AddTodoItemModalDimmed>
          <AddTodoItemModalBody>
            <div>
              <h4>Add Todo Item</h4>
              <TextInput
                type="text"
                text={"제목"}
                value={formData["title"]}
                onChange={onSetFormData("title")}
              />
              <TextArea
                onChange={(e) => onSetFormData("content")(e.target.value)}
              >
                {formData["content"]}
              </TextArea>

              <div className={"add-todo-modal-group"}>
                <Button type={"button"} styleType={"dark"} onClick={onClose}>
                  취소
                </Button>
                <Button
                  type={"button"}
                  styleType={"primary"}
                  onClick={onAddTodoItem}
                >
                  추가
                </Button>
              </div>
            </div>
          </AddTodoItemModalBody>
        </AddTodoItemModalContainer>
      )}
    </>
  );
}

const AddTodoItemModalContainer = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const AddTodoItemModalDimmed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const AddTodoItemModalBody = styled.div`
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  background-color: white;
  display: flex;

  & > div {
    width: 100%;
  }

  .add-todo-modal-group {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;

    button:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 160px;
  display: block;
  margin: 0 auto 20px;
`;

export default AddTodoItemModal;
