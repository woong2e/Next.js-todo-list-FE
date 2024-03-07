"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
   Input, Button, Popover, PopoverTrigger, PopoverContent, } from "@nextui-org/react";
import { Todo } from "@/types";
import { setNewTodoInput } from "@/store/newTodoInputSlice";
import { setTyping } from "@/store/addEnableSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";

export const TodosTable = ( { todos }: { todos: Todo[] }) => {

  const dispatch = useAppDispatch();
  const inputted = useAppSelector((state) => state.isTyping);
  // console.log(inputted.typing);

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
      inputted.typing ? 
        <Button className="h-14" color="warning">
                추가  
      </Button>
       : DisableTodoButton()
      
    );
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
  }

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="새로운 할일" placeholder="뭐 할건데" 
          onValueChange={(changedInput) => {
            dispatch(setTyping(changedInput.length > 0));
          }}/>
          {AddButton()}
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
    </>
  );
}
