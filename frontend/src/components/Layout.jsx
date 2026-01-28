import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [userRes, todoRes] = await Promise.all([
          api.get("/user/userInfo"),
          api.get("/todo/fetch"),
        ]);

        setUser(userRes.data.user);
        setTodos(todoRes.data.todos ?? []);
      } catch {
        toast.error("Failed to load app data");
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  const safeTodos = Array.isArray(todos) ? todos.filter(Boolean) : [];

  if (loading) return null; // or a loader

  return (
    <>
      <Navbar user={user} todos={safeTodos} />
      <Outlet context={{ user, todos: safeTodos, setTodos }} />
    </>
  );
}
