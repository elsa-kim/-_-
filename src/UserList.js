import React, { useEffect } from "react";

const User = React.memo(function ({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);
  return (
    <div>
      <b style={{ cursor: "pointer", color: user.active ? "green" : "black" }} onClick={() => onToggle(user.id)}>
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

export default React.memo(function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {/* key 값 없으면 경고 메세지 ; 각 고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링 될 수 있기 때문 */}
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
      {/* 배열 안 원소가 갖는 고유 값 없으면 맵 콜백의 두번째 파라미터 인덱스를 키로 사용가능 */}
      {/* {users.map((user, index) => (
        <User user={user} key={index} />
      ))} */}
    </div>
  );
});
