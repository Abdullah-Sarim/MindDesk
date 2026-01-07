import { useNavigate } from "react-router-dom";

export default function NotesTitleList({ notes, onSelectNote }) {
  const navigate = useNavigate();

  if (!notes || notes.length === 0) return null;

  const sortedNotes = [...notes].sort((a, b) => {
    if (Boolean(b.pinned) !== Boolean(a.pinned)) {
      return b.pinned ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="mt-4 border-t pt-3">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3 mr-1 sticky top-0 bg-white/90 pb-2 px-2 py-0.5
          rounded-xl
          font-medium
          truncate">
        <h3 className="text-lg font-semibold text-gray-700">Your Notes</h3>

        <button
          onClick={() => navigate("/notes")}
          className="text-sm text-purple-600 hover:underline font-medium"
        >
          Go to notes →
        </button>
      </div>

      {/* LIST */}
      <div className="max-h-105 overflow-y-auto pr-1">
        <ul className="space-y-1">
          {sortedNotes.map((note) => {
            const noteId = note._id || note.id; // ✅ FIX

            return (
              <li
  key={note.id || note._id}
  onClick={() => onSelectNote(note)}
  title={note.title}
  className="
    cursor-pointer
    bg-white
    border
    border-gray-200
    rounded-xl
    px-4 py-3
    shadow-sm
    hover:shadow-md
    hover:border-purple-300
    transition
    flex items-center justify-between
  "
>
  {/* LEFT: pin + title */}
  {/* <div className="flex items-center gap-2 truncate">
    {note.pinned && <span title="Pinned">📌</span>}
    <span className="text-purple-700 font-medium truncate">
      {note.title}
    </span>
  </div> */}

<div className="flex items-center gap-2 flex-wrap max-w-full">
  {note.pinned && <span title="Pinned">📌</span>}
  
  <span className="text-purple-700 font-medium truncate">
      {note.title}
    </span>
  {(note.tags || []).length > 0 ? (
    note.tags.slice(0, 3).map((tag) => (
      <span
        key={tag}
        className="
          text-xs
          bg-purple-100
          text-purple-700
          px-2 py-0.5 ml-2
          rounded-full
          font-medium
          truncate
        "
      >
        #{tag}
      </span>
    ))
  ) : (
    <span className="text-sm text-gray-400 ml-2 italic">
      No tags
    </span>
  )}
</div>


  {/* RIGHT: open indicator */}
  <span className="text-gray-400 group-hover:text-purple-600">
    →
  </span>
</li>

            );
          })}
        </ul>
      </div>
    </div>
  );
}

// export default function NotesTitleList({ notes, onSelectNote }) {
//   if (!notes || notes.length === 0) return null;

//   const sortedNotes = [...notes].sort((a, b) => {
//     if (Boolean(b.pinned) !== Boolean(a.pinned)) {
//       return b.pinned ? 1 : -1;
//     }
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });

//   return (
//     <div className="mt-4 border-t pt-3">
//       <div className="flex items-center justify-between mb-2">
//         <h3 className="text-lg font-semibold text-gray-700">
//           📒 Your Notes
//         </h3>

//         <span className="text-sm text-purple-600">
//           Click to open
//         </span>
//       </div>

//       <div className="max-h-60 overflow-y-auto pr-1">
//         <ul className="space-y-1">
//           {sortedNotes.map((note) => (
//             <li
//               key={note.id || note._id}
//               onClick={() => onSelectNote(note)}
//               className="cursor-pointer text-purple-700 hover:underline truncate"
//             >
//               {note.pinned && "📌 "}• {note.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
