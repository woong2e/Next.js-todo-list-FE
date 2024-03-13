import { title } from "@/components/primitives";
import { TodosTable } from "@/components/todos-table";

async function fetchTodosApiCall() {
	const response = await fetch(`${process.env.BASE_URL}/api/todos`,
	 { cache: 'no-store' });

	const contentTypeHeaderValue = response.headers.get('content-type');

	if (contentTypeHeaderValue?.includes("text/html")) {
		return null;
    }
	return response.json();
}

export default async function TodosPage() {
	const response = await fetchTodosApiCall();

	const fetchedTodos = response.data ?? [];
	return (	
		<div className="flex flex-col space-y-8">
			<h1 className={title()}>Todos</h1>
			<TodosTable todos={fetchedTodos}/>
		</div>
	);
}

