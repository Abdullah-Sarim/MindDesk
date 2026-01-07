function UserProfile({
  user,
  isEditingUser,
  newUsername,
  setNewUsername,
  setIsEditingUser,
  saveUsername,
}) {
  if (!user) return null;

  return (
    <div className="mb-3 w-full max-w-lg bg-white/80 backdrop-blur-md px-4 py-3 rounded-lg shadow text-sm text-gray-900  md:sticky md:top-6 md:mr-7">
      {isEditingUser ? (
        <div>
          <div className="flex items-center gap-2">
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border px-2 py-1 rounded text-sm w-full"
            />
            <button onClick={saveUsername} className="text-green-600">
              ✔
            </button>
            <button
              onClick={() => setIsEditingUser(false)}
              className="text-red-500"
            >
              ✖
            </button>
          </div>
          <div>
            <p className="text-[14px] flex items-center gap-1">
              <span className="text-[15px] font-semibold">Email:</span>
              {user.email}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-[14px] flex items-center gap-2">
            <span className="text-[15px] font-semibold">User:</span>
            {user.username}
            <button
              onClick={() => {
                setNewUsername(user.username);
                setIsEditingUser(true);
              }}
              className="text-xs text-blue-500"
            >
              ✏️
            </button>
          </p>
          <p className="text-[14px] flex items-center gap-1">
            <span className="text-[15px] font-semibold">Email:</span>
            {user.email}
          </p>
        </>
      )}
    </div>
  );
}

export default UserProfile;
