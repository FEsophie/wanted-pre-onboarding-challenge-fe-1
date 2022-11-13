import React, { useEffect, useState } from "react";
import {
    useCreateTodoItem,
    useGetTodoItemById,
    useUpdateTodoItem,
} from "../../service/todos/useTodoService";
import { useToast } from "../../hooks/useToast";
import isEmpty from "lodash/isEmpty";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import styled from "styled-components";

interface UpdateTodoItemModalProps {
    id: string;
    show: boolean;
    onClose: () => void;
    onLoadTodoItem: () => void;
    title: string;
    content: string;
}

function UpdateTodoItemModal({
                                 id,
                                 show,
                                 onClose,
                                 onLoadTodoItem,
                                 content,
                                 title,
                             }: UpdateTodoItemModalProps) {
    const [formData, setFormData] = useState({
        title: title || "",
        content: content || "",
    });

    const updateTodoMutation = useUpdateTodoItem(id);

    const toast = useToast();

    function onSetFormData(type: string) {
        return (v: string) => {
            setFormData((prev) => ({
                ...prev,
                [type]: v,
            }));
        };
    }

    function onUpdateTodoItem() {
        if (isEmpty(formData["title"])) {
            alert("제목을 입력해주세요");
            return;
        }

        if (isEmpty(formData["content"])) {
            alert("제목을 입력해주세요");
            return;
        }

        updateTodoMutation.mutate(formData, {
            onSuccess() {
                toast("할일을 수정하였습니다.", { type: "success" });
                onClose();
                onLoadTodoItem();
            },
            onError() {
                toast("예기치 못한 에러로 할 일을 수정할 수 없습니다.", {
                    type: "error",
                });
            },
        });
    }

    useEffect(() => {
        setFormData({
            title: title,
            content: content,
        });

        console.log(formData);

        return () => {
            setFormData({
                title: "",
                content: "",
            });
        };
    }, [show, title, content]);

    return (
        <>
            {show && (
                <UpdateTodoItemModalContainer>
                    <UpdateTodoItemModalDimmed></UpdateTodoItemModalDimmed>
                    <UpdateTodoItemModalBody>
                        <div>
                            <h4>Update Todo Item</h4>
                            <TextInput
                                type="text"
                                text={"제목"}
                                value={formData["title"]}
                                onChange={onSetFormData("title")}
                            />
                            <TextArea
                                value={formData["content"]}
                                onChange={(e) => onSetFormData("content")(e.target.value)}
                            >
                                {formData["content"]}
                            </TextArea>

                            <div className="modify-btn-group">
                                <Button
                                    className={"cancel-btn"}
                                    type={"button"}
                                    styleType={"light"}
                                    onClick={onClose}
                                >
                                    취소
                                </Button>
                                <Button
                                    type={"button"}
                                    styleType={"secondary"}
                                    onClick={onUpdateTodoItem}
                                >
                                    수정
                                </Button>
                            </div>
                        </div>
                    </UpdateTodoItemModalBody>
                </UpdateTodoItemModalContainer>
            )}
        </>
    );
}

const UpdateTodoItemModalContainer = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const UpdateTodoItemModalDimmed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const UpdateTodoItemModalBody = styled.div`
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

  .modify-btn-group {
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

export default UpdateTodoItemModal;
