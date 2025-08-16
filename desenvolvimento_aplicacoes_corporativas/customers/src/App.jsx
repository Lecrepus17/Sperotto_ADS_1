import * as React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";
const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ]);
  const handleRemoveUser = (userId) => {
    setUsers((state) => state.filter((user) => user.id !== userId));
    //Navega para a rota /users
    navigate("/users");
  };
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users users={users} />}>
          <Route
            path=":userId"
            element={<User onRemoveUser={handleRemoveUser} />}
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
export default App;
