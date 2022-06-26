import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { useSelector } from "react-redux";
import "./style/dark.scss";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate replace to="/" />}
          />
          <Route path="/">
            <Route
              index
              element={user ? <Home /> : <Navigate replace to="/login" />}
            />
            {user && (
              <>
                <Route path="users">
                  <Route index element={<List />} />
                  <Route path=":userId" element={<Single />} />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="provinces">
                  <Route index element={<List />} />
                  <Route path=":provinceId" element={<Single />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route>
                <Route path="cultures">
                  <Route index element={<List />} />
                  <Route path=":cultureId" element={<Single />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route>
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
