import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {}, // 없어도 상관 없는데 IDE로 빠르게 부를 수 있어서 있으면 좋음
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //앱이 시작되면 실행된다 그 후론 디펜던시가 바뀌지 않으면 실행되지 않음
    const storageUser = localStorage.getItem("isLoggedIn");

    if (storageUser === "1") {
      setIsLoggedIn(true); //여기서 상태를 업데이트(업데이트 될 떄 컴포넌트 함수를 재실행 시킴)
    }
    // localStorage에 로그인 한 흔적이 있다면 setIsLoggedIn을 true로
  }, []); // 디펜던시를 비워주면 앱이 실행됐을 때 딱 한번 이 함수가 실행된다

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };
  // 로그인핸들러,로그아웃핸들러등을 context파일에 몰아두는 방법도 있다.
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
