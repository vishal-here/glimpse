import { Route, Routes } from "react-router-dom";
// import Users from "./users/pages/User";
import Error from "./Error/Error";
import Navbar from "./navigation/Navbar";
// import Places from "./places/pages/Place";
// import NewPlaceTest from "./places/pages/NewPlaceTest";
// import Auth from "./users/pages/Auth";
// import UpdatePlace from "./places/pages/UpdatePlace";
import { AuthContext } from "./context/AuthContext";
import React, { useState, useCallback, useEffect  , Suspense} from "react";
import LoadingBar from "react-top-loading-bar";
import Footer from "./navigation/footer";
import Loading from './utils/Loading'

const Users = React.lazy(()=> import('./users/pages/User'))
const Places = React.lazy(()=> import('./places/pages/Place'))
const NewPlaceTest = React.lazy(()=> import('./places/pages/NewPlaceTest'))
const Auth = React.lazy(()=> import('./users/pages/Auth'))
const UpdatePlace = React.lazy(()=> import('./places/pages/UpdatePlace'))

let logoutTimer;
function App() {
  const [progress, setProgress] = useState(0);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [uid, setUid] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUid(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null)
    setUid(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route
          exact
          path="/place/:pid"
          element={<UpdatePlace fillProgress={setProgress} />}
        />
        <Route
          path="/place/new"
          element={<NewPlaceTest fillProgress={setProgress} />}
        />
        <Route
          exact
          path="/auth"
          element={<Auth fillProgress={setProgress} />}
        />
        <Route
          exact
          path="/place/user/:uid/"
          element={<Places fillProgress={setProgress} />}
        />
        <Route
          path="*"
          element={
            <Users fillProgress={setProgress} checkProgress={progress} />
          }
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route
          exact
          path="place/user/:uid"
          element={<Places fillProgress={setProgress} checkProgress={progress} />}
        />
        <Route
          exact
          path="/"
          element={
            <Users fillProgress={setProgress} checkProgress={progress} />
          }
        />
        <Route
          exact
          path="/auth"
          element={<Auth fillProgress={setProgress} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: uid,
          login: login,
          logout: logout,
        }}
      >
        <Navbar />

        <main>
          <LoadingBar
            color="white"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Suspense fallback= {<Loading size={100}/>}>
          {routes}
          </Suspense>
        </main>
        <Footer fillProgress={setProgress} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
