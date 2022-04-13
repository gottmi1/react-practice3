import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("이펙트 러닝");

    // return으로 클린업 함수를 만들 수 있다. return 앞에 있는 놈들이 작동하기 전에 트리거 됨. 그러나 첫 작동전에는 먼저 트리거되지 않음. 그리고 만약 두번째 인자가 빈배열이라면 컴포넌트가 DOM에서 제거될 때 실행된다
    return () => {
      console.log("이펙트러닝 클리너");
    };
  }, [enteredPassword]);
  // 두번째 인자가 없으면 모든 사이드이펙트에 실행되고 빈 배열이면 렌더될 때 딱 한번 실행, 두번째 인자에 무언가 있다면 그것의 상태가 변할 때 마다 실행됨

  useEffect(() => {
    // 그리고 useEffect는 함수도 리턴할 수 있다
    const identifier = setTimeout(() => {
      // 여기서 하고싶은 건 setFormIsValid의 조건을 만족하면 500ms 이후에 console.log()를 띄우는 것
      console.log("상태감지중");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log("클린업");
      clearTimeout(identifier);
    };
    // 요걸 클린업 함수라고 함 첫번째 사이드 이펙트가 실행된 후 마다 실행됨
    // 입력이 있을 때마다 앞에 일어난 사이드 이펙트인 셋타임아웃을 클리어 해주고 500ms동안 상태 변화가 없으면 그건 클리어 안함
  }, [enteredEmail, enteredPassword]);
  // 배열을 비워두면 렌더링 될 때 딱 한번만 실행되지만, 배열에 요소를 넣어두면 해당 요소들 모두에 변화가 있을 때 setFormIsValid를 실행한다
  // 컴포넌트가 처음으로 렌더 되었을 때만이 아니라 상태나 프랍과 같은 데이터가 바뀌었을 때 로직을 다시 실행하는 것이 일반적인 사용법

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
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
