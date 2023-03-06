import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
    </div>
  );
}

export default function UserList() {
  const users = [
    {
      id: 1,
      username: "sh",
      email: "ksh96611@naver.com",
    },
    {
      id: 2,
      username: "test",
      email: "test1@naver.com",
    },
    {
      id: 3,
      username: "oo",
      email: "hi@naver.com",
    },
  ];
  return (
    <div>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
}
