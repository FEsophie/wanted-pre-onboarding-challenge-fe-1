import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import ButtonGroup from "../../components/ButtonGroup";
import {
    useDeleteTodoItem,
    useGetTodoList,
} from "../../service/todos/useTodoService";
import { GetTodoRes } from "../../service/todos/types";
import UpdateTodoItemModal from "./UpdateTodoModal";
import AddTodoItemModal from "./AddTodoModal";
import isNil from "lodash/isNil";
import toast from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

const TODO_LIST_COLUMN = {
    check: <input type={"checkbox"} />,
    title: "제목",
    createdAt: "생성 날짜",
    updatedAt: "수정일자",
} as Record<string, any>;

const tempData = [
    {
        title: "hi",
        content: "hello",
        id: "z3FGrcRL55qDCFnP4KRtn",
        createdAt: "2022-07-24T14:15:55.537Z",
        updatedAt: "2022-07-24T14:15:55.537Z",
    },
    {
        title: "ho",
        content: "hollo",
        id: "z3FGrcRL55qDCFnP3KRtn",
        createdAt: "2022-07-24T14:15:55.537Z",
        updatedAt: "2022-07-24T14:15:55.537Z",
    },
];

function Todos() {
    const [showAddTodoModal, setShowAddTodoModal] = useState(false);
    const [todoData, setTodoData] = useState<GetTodoRes[] | null>(tempData);
    const { data, isSuccess, isLoading, refetch } = useGetTodoList();

    function onClickAddTodoItem() {
        setShowAddTodoModal(true);
    }

    useEffect(() => {
        if (isSuccess) {
            setTodoData(data);
        }
    }, [isSuccess]);

    return (
        <>
            <TodoListContainer>
                <h3>Todo List</h3>
                <TodoList>
                    <TodoListHead />
                    {isLoading && isNil(todoData) ? (
                        <li>불러오는 중....</li>
                    ) : !isSuccess ? (
                        <>
                            {todoData?.map((data) => {
                                return <TodoItem key={data.id} data={data} />;
                            })}
                        </>
                    ) : (
                        <li>조회된 데이터가 없습니다</li>
                    )}
                </TodoList>
                <ButtonGroup className="todo-list-button-group" align={"right"}>
                    <Button
                        className={"add-button"}
                        type="link"
                        styleType="secondary"
                        url={"/"}
                    >
                        홈으로
                    </Button>
                    <Button
                        className={"add-button"}
                        type="button"
                        styleType="primary"
                        onClick={onClickAddTodoItem}
                    >
                        +Todo
                    </Button>
                </ButtonGroup>
            </TodoListContainer>
            <AddTodoItemModal
                show={showAddTodoModal}
                onClose={() => setShowAddTodoModal(false)}
                onLoadTodoList={refetch}
            />
        </>
    );
}

function TodoListHead() {
    return (
        <li className="todo-head-wrp">
            {Object.keys(TODO_LIST_COLUMN).map((key: string) => {
                return (
                    <span key={key} className={`todo-head todo-head-${key}`}>
            {TODO_LIST_COLUMN[key]}
          </span>
                );
            })}
        </li>
    );
}

interface TodoItemProps {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

function TodoItem({ data }: { data: TodoItemProps }) {
    const { id, title, createdAt, updatedAt } = data;
    const [showDetailContId, setShowDetailContId] = useState("");
    const [showDetailCont, setShowDetailCont] = useState(false);

    const navigator = useNavigate();
    const location = useLocation();

    const detailViewId = useMemo(() => {
        const search = location.search || "";
        const query = queryString.parse(search);

        return query.detailViewId || "";
    }, [location.search]);

    function onShowDetail(id: string) {
        if (!showDetailCont) {
            navigator(`/todos?detailViewId=${id}`);
            setShowDetailContId(id);
        } else {
            navigator(`/todos`);
            setShowDetailContId("");
        }
        setShowDetailCont(!showDetailCont);
    }

    useEffect(() => {
        if (detailViewId) {
            setShowDetailContId(detailViewId as string);
        } else {
            setShowDetailContId("");
        }
    }, [detailViewId]);

    return (
        <>
            <li className="todo-item" id={id}>
        <span className="todo-item-check">
          <input type={"checkbox"} />
        </span>
                <span
                    className="todo-item-title"
                    onClick={() => {
                        onShowDetail(id);
                    }}
                >
          {title}
        </span>
                <span className="todo-item-createdAt">{createdAt}</span>
                <span className="todo-item-updatedAt">{updatedAt}</span>
            </li>
            {id === showDetailContId && <TodoItemCont data={data} />}
        </>
    );
}

function TodoItemCont({ data }: { data: TodoItemProps }) {
    const { id, content, title } = data;
    const [isModifyMode, setModifyMode] = useState(false);
    const deleteTodoItemMutation = useDeleteTodoItem();
    const { refetch } = useGetTodoList();

    const toast = useToast();

    function onClickCancelBtn() {
        setModifyMode(false);
    }

    function onClickModifyBtn() {
        setModifyMode(true);
    }

    function onClickDeleteBtn() {
        deleteTodoItemMutation.mutate(id, {
            onSuccess() {
                toast("삭제 성공", { type: "success" });
                refetch();
            },
            onError() {
                toast("삭제 실패", { type: "error" });
            },
        });
    }

    return (
        <TodoItemContent>
            {isModifyMode ? (
                <UpdateTodoItemModal
                    show={isModifyMode}
                    onClose={onClickCancelBtn}
                    onLoadTodoItem={refetch}
                    title={title}
                    id={id}
                    content={content}
                />
            ) : (
                <>
                    <p>{content}</p>
                    <div className="modify-btn-group">
                        <Button
                            type={"button"}
                            styleType={"secondary"}
                            onClick={onClickModifyBtn}
                        >
                            수정
                        </Button>
                        <Button
                            type={"button"}
                            styleType={"dark"}
                            onClick={onClickDeleteBtn}
                        >
                            삭제
                        </Button>
                    </div>
                </>
            )}
        </TodoItemContent>
    );
}

const TodoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: column;

  li {
    line-height: 40px;
  }

  li:first-child {
    border-bottom: 1px solid;
  }

  .todo-head {
    display: inline-flex;
    justify-content: center;

    &-check {
      width: 10%;
    }
    &-title {
      width: 50%;
    }
    &-createdAt {
      width: 20%;
    }
    &-updatedAt {
      width: 20%;
    }
  }

  .todo-item {
    border-bottom: 1px solid lightgray;
    & > * {
      display: inline-flex;
      justify-content: center;
    }
    &-check {
      width: 10%;
    }

    &-title {
      width: 50%;
    }

    &-createdAt {
      width: 20%;
    }

    &-updatedAt {
      width: 20%;
    }
  }
`;

const TodoItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 5%;
  border-bottom: 1px solid lightgray;

  textarea {
    min-height: 150px;
  }

  .modify-btn-group {
    margin-top: 20px;
    align-self: self-end;

    button:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;

  .add-button {
    align-self: self-end;
    margin-right: 20px;
    margin-top: 20px;
  }

  .todo-list-button-group {
    align-self: flex-end;
    width: 200px;
  }
`;

export default Todos;
