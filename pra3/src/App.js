import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // // 리액트가 하는 일 : State에 기반하여 상태가 변할 때 마다 해당 함수를 재실행(렌더)하는 일
  // // 사이드 이펙트는 컴포넌트 함수 안에 직접 들어가서는 안된다. 버그나 무한루프, 의도하지 않은 많은 요청이 보내질 수 있기 때문.
  // // 따라서 더 좋은 도구가 필요한데 그 hook이 바로 useEffect이다
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* 이렇게 하면 모든 컴포넌트에서 해당 컨텍스트에 접근할 수 있고 이게 있으면 리액트 프로그먼트는 없어도 됨 이 과정이 가장 선행되어야 하는 공급 과정 */}
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
