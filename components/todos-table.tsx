"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
   Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown,
   DropdownTrigger,  DropdownMenu, DropdownItem, Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { CustomModalType, Todo } from "@/types";
import { setTodoInput } from "@/store/todoInputSlice";
import { setIsTyping } from "@/store/buttonClickEnableSlice";
import { setIsLoading } from "@/store/loadingSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerticalDotsIcon } from "./icons";
import { setModalState } from "@/store/modalSlice";
import CustomModal from "./custom-modal";

export const TodosTable = ( { todos }: { todos: Todo[] }) => {

  const dispatch = useAppDispatch();    
  const isInputted = useAppSelector((state) => state.isTyping);
  const inputedTitle = useAppSelector((state) => state.todoInput);
  const isLoading = useAppSelector((state) => state.isLoading);
  const modalState = useAppSelector((state) => state.modalState);
  const router = useRouter();
  const notifyTodoAddEvent = (msg: string) => toast.success(msg);

  const addTodoHandler = async () => {
    dispatch(setIsLoading(true));
    await new Promise((f) => setTimeout(f, 800));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "post",
      body: JSON.stringify({ 
        title: inputedTitle.todoInput 
      }),
      cache: "no-store",
    }); 
    dispatch(setTodoInput('')); 
    dispatch(setIsTyping(false));
    router.refresh();
    dispatch(setIsLoading(false)); 
    notifyTodoAddEvent("할일 추가!");
  }

  const DisableTodoButton = () => {
    return (
      <Popover placement="top" showArrow={true}>
            <PopoverTrigger>
            <Button className="h-14" color="default">
                추가  
             </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">😶</div>
                <div className="text-tiny">할일 적으세요^^</div>
              </div>
            </PopoverContent>
          </Popover>
    );
  };

  const AddButton = () => {
    return (
      isInputted.isTyping ? 
      <div>
        <Button className="h-14" color="warning"
        onPress={async () => {
          await addTodoHandler()
        }}>
        
                추가  
      </Button>
      </div>
       : DisableTodoButton()
        
    );
  };

  const applyIsDoneUI = (isDone : boolean) => {
    return (
      isDone ? "line-through text-gray-900/50 dark: text-white-500/40" : ""
    );
  }

  const TodoRaw = (aTodo: Todo) => {
    return (
    <TableRow key={ aTodo.id }>
      <TableCell className={applyIsDoneUI(aTodo.is_done)}>{ aTodo.id.slice(0,4) }</TableCell>
      <TableCell className={applyIsDoneUI(aTodo.is_done)}>{ aTodo.title }</TableCell>
      <TableCell>{ aTodo.is_done ? "⭕" : "❌" }</TableCell>
      <TableCell className={applyIsDoneUI(aTodo.is_done)}>{ `${ aTodo.created_at }` }</TableCell>
      <TableCell>
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={ (key) => {
              dispatch(setModalState({focusedTodo: aTodo,
                 madalType: key as CustomModalType,
                }));
              onOpen();
            }}>
              <DropdownItem key="detail">상세보기</DropdownItem>
              <DropdownItem key="edit">수정</DropdownItem>
              <DropdownItem key="delete">삭제</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </TableCell>
    </TableRow>
    )};

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const ModalComponent = () => {
    return(
      <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            (modalState.focusedTodo && <CustomModal onClose={onClose}/>)
          )}
        </ModalContent>
      </Modal>
    </>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <ModalComponent />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="새로운 할일" placeholder="무엇을 할 예정인가요" 
          onValueChange={(changedInput) => {
            dispatch(setIsTyping(changedInput.length > 0));
            dispatch(setTodoInput(changedInput)); 
          }}
          value={inputedTitle.todoInput}/>
          {AddButton()}
      </div>  
      <div className="h-6">
      {isLoading.isLoaging && <Spinner size="sm" color="warning" />}
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>아이디</TableColumn>
          <TableColumn>할 일</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>등록일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"일정이 없습니다."}>
          {todos && todos.map((aTodo: Todo) => (
            TodoRaw(aTodo)
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
