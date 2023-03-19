import React, { useCallback, useMemo, useRef, useState } from "react";
// import Hello from "./Hello";
// import Counter from "./Counter";
// import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중..");
  return users.filter((user) => user.active).length;
}

// 상태 업데이트 로직은 App 컴포넌트 내부에서 이뤄짐, 상태 업데이트 할 때 useState 사용
function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  // useCallback : 특정 함수 새로 만들지 않고 재사용하고 싶을 때 사용, 함수 안에서 사용하는 상태나 props 있으면 꼭 deps 배열안에 포함 시켜야 함
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    // 배열 삽입
    // 1. spread 연산자 사용
    // setUsers([...users, user]);

    // 2. concat 함수 사용 ; 기존 배열 수정하지 않고 새로운 원소 추가된 새로운 배열 만듦, 배열이름.concat(합치고싶은 배열)
    setUsers((users) => users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setUsers((users) => users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
  }, []);
  // useMemo : 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수, 두번째 파라미터에는 deps 배열
  // => 배열 안 내용 바뀌면 등록한 함수 호출해 값 연산, 안바뀌면 이전 연산값 재사용
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      {/* <div className="App"> */}
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
      {/*  </div> */}
    </>
  );
}

// export default App;

// 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean값이라면 useState로 관리하는게 편힘
