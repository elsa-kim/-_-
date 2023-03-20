import React, { useMemo, useReducer } from "react";
// import Hello from "./Hello";
// import Counter from "./Counter";
// import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
// import useInputs from "./hooks/useInputs";
// Immer 라이브러리 사용 편리하지만 성능적으로 Immer 사용하지 않은 코드가 조금 더 빠름
import produce from "immer";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중..");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "sh",
      email: "ksh96611@naver.com",
      active: true,
    },
    {
      id: 2,
      username: "test",
      email: "test1@naver.com",
      active: false,
    },
    {
      id: 3,
      username: "oo",
      email: "hi@naver.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    // immer 사용
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
