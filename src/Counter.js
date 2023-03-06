import React, { useState } from "react";

function Counter() {
  // state(상태) : 컴포넌트에서 동적인 값
  // useState(상태의 기본값) 호출 시 배열 반환 => 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    // Setter 함수 사용 시
    // 1. 업데이트 하고 싶은 새로운 값을 파라미터로 넣어줌
    setNumber(number + 1);
  };
  const onDecrease = () => {
    // 2. 기존 값을 어떻게 업데이트 할 지에 대한 함수 등록(함수형 업데이트) ; 나중에 컴포넌트 최적화할 때 사용
    setNumber((prevNumber) => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
