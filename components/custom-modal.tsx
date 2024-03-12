"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
   Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner, Dropdown,
   DropdownTrigger,  DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader,
    ModalBody, ModalFooter, useDisclosure, Checkbox, Link, Switch} from "@nextui-org/react";
import { CustomModalType, Todo } from "@/types";
import { setNewTodoInput } from "@/store/newTodoInputSlice";
import { setIsTyping } from "@/store/addEnableSlice";
import { setIsLoading } from "@/store/loadingSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerticalDotsIcon } from "./icons";
import { setModalState } from "@/store/modalSlice";

const CustomModal = ( { onClose }: {
    onClose: () => void
    }) => {
    const modalState = useAppSelector((state) => state.modalState);
    
    const DetailModal = () =>  {
        return (
            <div>
                <ModalHeader className="flex flex-col gap-1">Detail</ModalHeader>
                <ModalBody>
                <p> 
                    상세모달
                </p>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                </Button>
                <Button color="primary" onPress={onClose}>
                    Action
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
                />
                <div className="flex py-2 space-x-3">
                    <span className="font-bold">완료여부 : </span>
                    <Switch defaultSelected={modalState.focusedTodo?.is_done} aria-label="Automatic updates"/>
                    {modalState.focusedTodo?.is_done ? '완료' : '미완료'}
                </div>
                <div className="flex py-1 space-x-3">
                    <span className="font-bold">작성일 : </span>
                    <p>{`${modalState.focusedTodo?.created_at}`}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning"  onPress={onClose}>
                  수정
                </Button>
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
                <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
                <ModalBody>
                <p> 
                    삭제모달
                </p>
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    닫기
                </Button>
                <Button color="primary" onPress={onClose}>
                    Action
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