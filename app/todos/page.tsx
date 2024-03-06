import { title } from "@/components/primitives";
import { TodosTable } from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

async function fetchTodosApiCall() {
	const response = await fetch('http://localhost:3000/api/todos');

	return response.json();
}

export default async function TodosPage() {
	const response = await fetchTodosApiCall();
	return (	
		<div className="flex flex-col space-y-8">
			<h1 className={title()}>Todos</h1>
			<TodosTable todos={response.data}/>
		</div>
	);
}

