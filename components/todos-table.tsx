"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { Todo } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { setNewTodoInput } from "@/store/newTodoInputSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";

export const TodosTable = ( { todos }: { todos: Todo[] }) => {

  const dispatch = useAppDispatch();
  const inputed = useAppSelector((state) => state.newTodoInput)
  

  const TodoRaw = (aTodo: Todo) => {
      return (
      <TableRow key={ aTodo.id }>
        <TableCell>{ aTodo.id.slice(0,4) }</TableCell>
        <TableCell>{ aTodo.title }</TableCell>
        <TableCell>{ aTodo.is_done ? "⭕" : "❌" }</TableCell>
        <TableCell>{ `${ aTodo.created_at }` }</TableCell>
      </TableRow>
      )};

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="새로운 할일" placeholder="뭐 할건데" 
          value={dispatch(setNewTodoInput(inputed))}/>
        <Button className="h-14" color="warning">
          추가  
        </Button>
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
