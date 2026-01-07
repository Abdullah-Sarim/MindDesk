import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import UserProfile from "./UserProfile";
import TodoStats from "./charts/TodoStats";
import TodoChart from "./charts/TodoStatsChart";

function Sidebar({ user, todos }) {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const safeTodos = Array.isArray(todos) ? todos.filter(Boolean) : [];

  const completed = safeTodos.filter((t) => t.completed).length;
  const remaining = safeTodos.filter((t) => !t.completed).length;

  const saveUser = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    try {
      const { data } = await api.put("/user/username", {
        username: newUsername,
      });

      // update local user object
      user.username = data.user.username;

      setIsEditingUser(false);
      setNewUsername("");
      toast.success("Username updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update username");
    }
  };

  return (
    <div className="hidden lg:block w-full max-w-lg px-6 py-3 md:w-64 md:top-6 mr-1">
      <UserProfile
        user={user}
        isEditingUser={isEditingUser}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        setIsEditingUser={setIsEditingUser}
        saveUsername={saveUser}
      />

      <TodoStats todos={todos} />

      {todos.length > 0 && (
        <TodoChart completed={completed} remaining={remaining} />
      )}
    </div>
  );
}

export default Sidebar;
