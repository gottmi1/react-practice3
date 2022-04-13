import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 리액트가 하는 일 : State에 기반하여 상태가 변할 때 마다 해당 함수를 재실행(렌더)하는 일
  // 사이드 이펙트는 컴포넌트 함수 안에 직접 들어가서는 안된다. 버그나 무한루프, 의도하지 않은 많은 요청이 보내질 수 있기 때문.
  // 따라서 더 좋은 도구가 필요한데 그 hook이 바로 useEffect이다

  useEffect(() => {
    //앱이 시작되면 실행된다 그 후론 디펜던시가 바뀌지 않으면 실행되지 않음
    const storageUser = localStorage.getItem("isLoggedIn");

    if (storageUser === "1") {
      setIsLoggedIn(true); //여기서 상태를 업데이트(업데이트 될 떄 컴포넌트 함수를 재실행 시킴)
    }
    // localStorage에 로그인 한 흔적이 있다면 setIsLoggedIn을 true로
  }, []); // 디펜던시를 비워주면 앱이 실행됐을 때 딱 한번 이 함수가 실행된다

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
