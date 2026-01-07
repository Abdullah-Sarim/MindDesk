import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";
import Notes from "./pages/Notes";
import Todos from "./pages/Todos";
import TodoPage from "./pages/TodoPage";
import NoteDetail from "./components/notesComponents/NoteDetail";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* <Toaster position="top-right" /> */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "20px",
            padding: "15px 18px",
            minWidth: "300px",
            borderRadius: "10px",
          },
          duration: 1500,
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ecfdf5",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
          },
        }}
      />
    </>
  );
}

export default App;
