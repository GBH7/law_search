import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./Search";
import HomeScreen from "./HomeScreen";
import Saved from "./Saved";

import React, {useState} from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const addToDo = (todo) => {
    setToDos((prevToDos) => [todo, ...prevToDos]);
  };

  return (
    <Router>
      <div>
        <h1>판결문 검색 서비스</h1>
        <hr />
        <nav>
          <ul style={{ display: "flex", listStyle: "none" }}>
            <li style={{ margin: "0 10px" }}>
              <Link to="/">홈</Link>
            </li>
            <li style={{ margin: "0 10px" }}>
              <Link to="/ai-search">AI 판례 검색</Link>
            </li>
            <li style={{ margin: "0 10px" }}>
              <Link to="/saved">저장한 판례</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/ai-search">
            <Search addToDo={addToDo}/>
          </Route>
          <Route path="/saved">
            <Saved />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
