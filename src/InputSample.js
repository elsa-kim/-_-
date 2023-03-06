import React, { useRef, useState } from "react";

export default function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  //  useRef : 특정 DOM에 접근할 때 사용(JS에서 getElementById, querySelector 등 처럼), 원하는 위치에 ref={} 형태로 작성
  const nameInput = useRef();
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      // 기존의 input 객체 복사
      ...inputs,
      // name 키를 가진 값을 value 로 설정
      [name]: value,
    });
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}
