/*
JSX : 리액트에서 생김새 정의할 때 사용하는 문법, HTML처럼 생겼지만 JavaScript임
  리액트 컴포넌트 파일에서 XML 형태로 코드 작성하면 babel이 JSX를 JavaScript로 변환해줌

JSX 기본 규칙
  - 태그는 꼭 닫혀있어야 함 : 태그와 태그 사이 내용 들어가지 않을 때 Self Closing 태그 꼭 사용
  - 두개 이상의 태그는 무조건 하나의 태그로 감싸져있어야 함 -> 불필요하게 div로 감싸는게 좋자않을 수 있음 = 리액트의 Fragment 사용 
    Fragment <></> : 브라우저 상에서 따로 별도의 앨리먼트로 나타나지 않음
  - JSX 안에 자바스크립트 값 사용 : JSX 내부에 자바스크립트 변수 보여줘야 할 때 {}로 감싸기
  - 태그에 style 설정 시 camelCase 형태로 네이밍, 인라인 스타일은 객체 형태로 작성 
  - class 설정 시 className="..." 으로 설정
  - JSX 내부 주석 : {/* 형태로 * /} => 띄어쓰기 없이
  - 열리는 태그 내부에는 // 이런 형태로 주석 가능 ex) <Hello //열리는 태그 내부 주석 작성 />
*/

/*
props : properties 줄임말로 어떠한 값을 컴포넌트에 전달해줘야 할 때 사용

기본 사용법 : props 내부의 값 props.,,,로 접근
  - App.js :
    function App() {
        return (
            <Hello name="react" />
        )
    }
  - Hello.js :
    function Hello(props) {
        return <div>안녕하세요 {props.name}</div>
    }

비구조화 할당(구조 분해)
  - App.js : 
    function App() {
        return (
            <Hello name="react" color="red" />
        )
    }
  - Hello.js :
    function Hello(props) {
        return <div style={{color: props.color }}>안녕하세요 {props.name}</div>
    }
    -> 
    function Hello({color, name}) {
        return <div style={{color}}>안녕하세요 {name}</div>
    }

defaultProps로 기본값 설정
  - Hello.js :
    function Hello({color, name}) {
        return <div style={{color}}>안녕하세요 {name}</div>
    }

    Hello.defaultProps = {
        name: '이름없음'
    }

props.children : 컴포넌트 태그 사이에 넣은 값 조회하고 싶을 때 props.children 조회
  - App.js :
    function App() {
        return (
            <Wrapper>
                <Hello name="react" color="red" />
                <Hello color="pink" />
            </Wrapper>
        )
    }
  - Wrapper.js :
    function Wrapper({children}) {
        return (
            <div>
                {children}
            </div>
        )
    }
*/

/*
조건부 렌더링 : 특정 조건에 따라 다른 결과물 렌더링
  - 삼항연산자 사용하는 것이 기본적(특정 조건에 따라 보여줘야 하는 내용 다를 때)
  - 단순히 특정 조건이 true면 보여주고 아닐 때 숨기는 경우 && 연산자 사용해 처리
  - JSX에서 null, false, undefined 렌더링 할 경우 아무것도 나타나지 않음
  - 컴포넌트 props 값 설정하게 될 때 props 이름만 작성하고 값 설정 생략하면 true로 설정한 것으로 간주
    ex) <Hello name='react' isSpecial /> //isSpecial 이름만 넣어준 것과 isSpecial={true}와 동일한 의미
*/

/*
key 사용 이유 :
  배열 렌더링 할 때 key 없다면 배열 중간에 값 삽입 또는 삭제 시 그 이후 원소들 밀리거나 땡겨지는 방식으로 수정되는데
  key 값 존재하면 수정되지 않는 기존의 값은 그대로 두고 원하는 것에 내용을 삽입하거나 삭제 
*/

// 참고 내용
/*
XML(EXtensible Markup Language) : HTML과 매우 비슷한 문자 기반의 마크업 언어(text-based markup language)
  - HTML처럼 데이터를 보여주는 목적이 아닌, 데이터를 저장하고 전달할 목적으로만 만들어짐
  - XML 태그는 HTML 태그처럼 미리 정의되어 있지 않고, 사용자가 직접 정의할 수 있다

Babel : 자바스크립트 문법 확장해주는 도구

*/
