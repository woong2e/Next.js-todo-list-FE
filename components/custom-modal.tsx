"use client"

import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
   Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown,
   DropdownTrigger,  DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader,
    ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Switch} from "@nextui-org/react";
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
import { deleteATodo } from "@/data/firestore";

const CustomModal = ( { onClose }: {
    onClose: () => void
    }) => {
    const modalState = useAppSelector((state) => state.modalState);
    const [editedTitle, setEditedTitle] = useState(modalState.focusedTodo?.title);
    const [isDone, setIsDone] = useState(modalState.focusedTodo?.is_done);
    const [isLoading, setIsLoading] = useState(false);
    const notifyTodoAddEvent = (msg: string) => toast.success(msg);
    const router = useRouter();

    const editATodoHandler = async () => {
        setIsLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${modalState.focusedTodo?.id}`, {
          method: "post",
          body: JSON.stringify({ 
            title: editedTitle,
            is_done: isDone,
          }),
          cache: "no-store",
        }); 
        setIsLoading(false);
        router.refresh();
        notifyTodoAddEvent("할일 수정!");
    }

    const deleteATodoHandler = async () => {
        setIsLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${modalState.focusedTodo?.id}`, {
            method: "delete",
            cache: "no-store",
          }); 
        setIsLoading(false);
        router.refresh();
        notifyTodoAddEvent("할일 삭제!");
    }

    const DetailModal = () =>  {
        return (
            <div>
                <ModalHeader className="flex flex-col gap-1">할일 상세</ModalHeader>
                <ModalBody>
                   <p><span className="font-bold">id : </span>{modalState.focusedTodo?.id}</p>
                   <p><span className="font-bold">할일 : </span>{modalState.focusedTodo?.title}</p>
                   <p><span className="font-bold">완료여부 : </span>{modalState.focusedTodo?.is_done ? '⭕' : '❌'}</p>
                   <p><span className="font-bold">생성일 : </span>{`${modalState.focusedTodo?.created_at}`}</p>
                </ModalBody>
                <ModalFooter>
                <Button color="default" onPress={onClose}>
                    닫기
                </Button>
                </ModalFooter>
            </div>
        );
    }

    const EditModal = () =>  {
        return (
            <>
              <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
              <ModalBody>
                <p><span className="font-bold">id : </span>{modalState.focusedTodo?.id}</p>
                <Input
                  isClearable
                  autoFocus
                  isRequired
                  label="할일 내용"
                  placeholder="할일을 입력하세요"
                  variant="bordered"
                  defaultValue={modalState.focusedTodo?.title}
                  onChange={(editedTitle) => {
                    setEditedTitle(editedTitle.target.value);
                    }}
                  onClear={() => setEditedTitle("")}
                />
                <div className="flex py-2 space-x-3">
                    <span className="font-bold">완료여부 : </span>
                    <Switch 
                    color="warning" 
                    defaultSelected={modalState.focusedTodo?.is_done} 
                    onValueChange={(isSelected) => {
                        setIsDone(isSelected);
                    }}
                    aria-label="Automatic updates"/>
                    {modalState.focusedTodo?.is_done ? '완료' : '미완료'}
                    
                </div>
                <div className="flex py-1 space-x-3">
                    <span className="font-bold">작성일 : </span>
                    <p>{`${modalState.focusedTodo?.created_at}`}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                {(editedTitle as string).length > 0 ? 
                    <Button color="warning"  onPress={async () => {
                        await editATodoHandler();
                        onClose();
                        }}>
                    {isLoading ? <Spinner size="sm" color="default" /> : '수정'}
                    </Button> :
                    <Button color="warning" variant="flat">
                        수정
                    </Button> }
                <Button color="default" variant="flat" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </>
        );
    }

    const DeleteModal = () =>  {
        return (
            <div>
                <ModalHeader className="flex flex-col gap-1">할일을 삭제하시겠습니까?</ModalHeader>
                <ModalBody>
                   <p><span className="font-bold">id : </span>{modalState.focusedTodo?.id}</p>
                   <p><span className="font-bold">할일 : </span>{modalState.focusedTodo?.title}</p>
                   <p><span className="font-bold">완료여부 : </span>{modalState.focusedTodo?.is_done ? '⭕' : '❌'}</p>
                   <p><span className="font-bold">생성일 : </span>{`${modalState.focusedTodo?.created_at}`}</p>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="flat" onPress={async () => {
                        await deleteATodoHandler();
                        onClose();
                        }}>
                    {isLoading ? <Spinner size="sm" color="default" /> : '삭제'}
                </Button>
                <Button color="default" onPress={onClose}>
                    닫기
                </Button>
                </ModalFooter>
            </div>
        );
    }

    const getModal = () => {
        switch (modalState.madalType) {
            case 'detail':
                return DetailModal();
            case 'edit':
                return EditModal();
            case 'delete':
                return DeleteModal();
            default:
                return null;
        }
    }
    return (
        <>
            {getModal()}
        </>
    );
}

export default CustomModal;