import React, { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../api/users";
import "./UserProfile.css";

export default function ({ userId }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    await updateUser(user.id, user);
    setEditing(false);
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {editing ? (
        <>
          <input
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
          <input
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>
            Name: {user.first_name} {user.last_name}
          </p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.role === "guest" && (
            <button
              onClick={async () => {
                await updateUser(user.id, { ...user, role: "host" });
                setUser({ ...user, role: "host" });
              }}
            >
              Become a Host
            </button>
          )}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}
