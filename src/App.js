import React, { useCallback, useMemo, useReducer, useRef } from "react";
// import Hello from "./Hello";
// import Counter from "./Counter";
// import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중..");
  return users.filter((user) => user.active).length;
}

// useReducer 사용 :
// 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있음
const initialState = {
  inputs: {
    username: "",
    email: "",
  },
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

// reducer : 현재 상태와 액션 객체를 파라미터로 받아와 새로운 상태 반환하는 함수로 reducer에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 됨
// action은 업데이트를 위한 정보 가짐 ; 주로 type 값 지닌 객체 형태로 사용
function reducer(state, action) {
  switch (action.type) {
    // type 값 대문자와 _로 구성하는 관습 존재
    // reducer 함수에서 새로운 상태 만들 때 불변성 지켜줘야함 -> spread 연산자 사용

    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: "",
    email: "",
  });
  // useReducer 사용법
  // state : 앞으로 컴포넌트에서 사용 할 수 있는 상태 가리킴
  // dispatch : 액션 발생시키는 함수 ; dispatch({ type: 'INCREMENT' })와 같이 사용
  // useReducer 첫번째 파라미터는 reducer 함수, 두번째 파라미터는 초기상태
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    onReset();
    nextId.current += 1;
  }, [username, email, onReset]);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;

// 컴포넌트에서 관리하는 값이 여러개가 되어 상태의 구조가 복잡해지면 useReducer로 관리하는게 편함
