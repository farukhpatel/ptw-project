import { useRef } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

let todo = [
  { id: 1, title: "Do Laundry" },
  { id: 2, title: "Do Homework" },
  { id: 3, title: "Do Work" },
];

function getTodos() {
  return todo;
}

function postTodo({ id, title }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      todo.push({ id, title });
      resolve(todo);
      // reject("server error");
    }, 1000);
  });
}

function deleteTodo(id) {
  todo = todo.filter((todo) => todo.id !== id);
}
// Create a client
const queryClient = new QueryClient();

function TodosWrapper() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  const textRef = useRef();
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery("todos", getTodos);

  // Mutations
  const mutation = useMutation(postTodo, {
    onSettled: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deletemutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <div>
      <ul>
        {query?.data?.map((todo) => (
          <>
            <li key={todo.id}>{todo.title}</li>
            <button
              onClick={() => {
                deletemutation.mutate(todo.id);
              }}
            >
              delete
            </button>
          </>
        ))}
      </ul>
      <input type="text" ref={textRef} />
      <button
        onClick={() => {
          mutation.mutate({
            id: query?.data?.length + 1,
            title: textRef.current?.value ?? "",
          });
          textRef.current.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default TodosWrapper;
