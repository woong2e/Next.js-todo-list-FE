"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
   Input, Button, Popover, PopoverTrigger, PopoverContent, Spinner } from "@nextui-org/react";
import { Todo } from "@/types";
import { setNewTodoInput } from "@/store/newTodoInputSlice";
import { setIsTyping } from "@/store/addEnableSlice";
import { setIsLoading } from "@/store/loadingSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useRouter } from "next/navigation";

export const TodosTable = ( { todos }: { todos: Todo[] }) => {

  const dispatch = useAppDispatch();    
  const isInputted = useAppSelector((state) => state.isTyping);
  const inputedTitle = useAppSelector((state) => state.newTodoInput);
  const isLoading = useAppSelector((state) => state.isLoading);
  const router = useRouter();

  const addTodoHandler = async () => {
    dispatch(setIsLoading(true));
    await new Promise((f) => setTimeout(f, 800));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "post",
      body: JSON.stringify({ 
        title: inputedTitle.newTodoInput 
      }),
      cache: "no-store",
    }); 
    dispatch(setNewTodoInput('')); 
    dispatch(setIsTyping(false));
    router.refresh();
    dispatch(setIsLoading(false));
  }

  const TodoRaw = (aTodo: Todo) => {
      return (
      <TableRow key={ aTodo.id }>
        <TableCell>{ aTodo.id.slice(0,4) }</TableCell>
        <TableCell>{ aTodo.title }</TableCell>
        <TableCell>{ aTodo.is_done ? "⭕" : "❌" }</TableCell>
        <TableCell>{ `${ aTodo.created_at }` }</TableCell>
      </TableRow>
      )};
  
  const AddButton = () => {
    return (
      isInputted.isTyping ? 
        <Button className="h-14" color="warning"
        onPress={async () => {
          await addTodoHandler()
        }}>
        
                추가  
      </Button>
       : DisableTodoButton()
      
    );
  };

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

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="새로운 할일" placeholder="뭐 할건데" 
          onValueChange={(changedInput) => {
            dispatch(setIsTyping(changedInput.length > 0));
            dispatch(setNewTodoInput(changedInput)); 
          }}
          value={inputedTitle.newTodoInput}/>
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
