import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReduer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.includes("@") };
    // 타입이 user_input인 액션을 받을 때 마다 value와 isValid를 업데이트
  }
  if (action.type === "input_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
    // user_blur가 포커스를 읽었을 때 입력된 value를 초기화하지 않고 유지하기 위해
  }
  return { value: "", isValid: false };
};
//리듀서 함수 내에는 컴포넌트 함수 내부의 어떤 데이터와도 상호작용하지 않기 때문에 함수 범위 밖에 만들 수 있다

const passwordReducer = (state, action) => {
  if (action.type === "password_input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "password_blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // 비슷한 state들을 하나의 state로 결합하여 reducer로 관리할 수 있다(state의 확장 개념)
  const [emailState, dispatchEmail] = useReducer(emailReduer, {
    value: "",
    isValid: null,
  });

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   console.log("이펙트 러닝");

  //   // return으로 클린업 함수를 만들 수 있다. return 앞에 있는 놈들이 작동하기 전에 트리거 됨. 그러나 첫 작동전에는 먼저 트리거되지 않음. 그리고 만약 두번째 인자가 빈배열이라면 컴포넌트가 DOM에서 제거될 때 실행된다
  //   return () => {
  //     console.log("이펙트러닝 클리너");
  //   };
  // }, [enteredPassword]);
  // // 두번째 인자가 없으면 모든 사이드이펙트에 실행되고 빈 배열이면 렌더될 때 딱 한번 실행, 두번째 인자에 무언가 있다면 그것의 상태가 변할 때 마다 실행됨

  // useEffect(() => {
  //   // 그리고 useEffect는 함수도 리턴할 수 있다
  //   const identifier = setTimeout(() => {
  //     // 여기서 하고싶은 건 setFormIsValid의 조건을 만족하면 500ms 이후에 console.log()를 띄우는 것
  //     console.log("상태감지중");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log("클린업");
  //     clearTimeout(identifier);
  //   };
  //   // 요걸 클린업 함수라고 함 첫번째 사이드 이펙트가 실행된 후 마다 실행됨
  //   // 입력이 있을 때마다 앞에 일어난 사이드 이펙트인 셋타임아웃을 클리어 해주고 500ms동안 상태 변화가 없으면 그건 클리어 안함
  // }, [enteredEmail, enteredPassword]);
  // // 배열을 비워두면 렌더링 될 때 딱 한번만 실행되지만, 배열에 요소를 넣어두면 해당 요소들 모두에 변화가 있을 때 setFormIsValid를 실행한다
  // // 컴포넌트가 처음으로 렌더 되었을 때만이 아니라 상태나 프랍과 같은 데이터가 바뀌었을 때 로직을 다시 실행하는 것이 일반적인 사용법

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", val: event.target.value }); // type필드가 있는 객체를 액션이라고 함

    setFormIsValid(
      passwordState.isValid > 6 && event.target.value.includes("@")
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "password_input", val: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    // isValid가 true일 때
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
    // 액션은 항상 같은 구조를 가져야 함. 여기선 포커스를 읽었다는 것이 중요하기 때문에 val은 넣지 않는다
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "password_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
