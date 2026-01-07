// this folder might be removed in future

// import TodoItem from "./TodoItem";
// import { useNavigate } from "react-router-dom";

// function TodoList({ todos, setTodos, loading }) {
//   const navigate = useNavigate();
  
//   if (loading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (todos.length === 0) {
//     return <p className="text-center text-gray-400">No todos yet.</p>;
//   }

//   return (<>
//     <div className="max-h-124 mt-4 border-t pt-3 overflow-y-auto space-y-1">
//     <div className="flex items-center justify-between  sticky top-0 bg-white/90 pb-2 px-2 py-0.5
//           rounded-xl
//           font-medium
//           truncate">
//         <h3 className="text-lg font-semibold text-gray-700">Your Todos</h3>

//         <button
//           onClick={() => navigate("/todo")}
//           className="text-sm text-blue-600 hover:underline font-medium"
//         >
//           Go to todos →
//         </button>
//       </div>
//       {todos.map((todo) => (
//         <TodoItem key={todo._id} todo={todo} setTodos={setTodos} />
//       ))}
//     </div>
//     </>
//   );
// }

// export default TodoList;
