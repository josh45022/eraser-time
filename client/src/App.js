import logo from './logo.svg';
import {useContext} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import './App.css';
import Auth from "./components/Auth.js"
import YourPosts from "./components/YourPosts.js"
import Public from "./components/Public.js"
import NavBar from "./components/NavBar.js"
import {UserContext} from "./context/UserContext.js"
import Profile from "./components/Profile.js"
function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {token?
            <Redirect to="/yourposts"/>
            :
            <>
            <Auth />
            </>
          }
        </Route>

        <Route exact path="/yourposts">
            <h1 className="title">Eraser Time!</h1>
            <NavBar />
            <YourPosts />
        </Route>

        <Route exact path="/public">
            <h1 className="title">Eraser Time!</h1>
            <NavBar />
            <Public />
        </Route>
        <Route exact path="/profile">
            <h1 className="title">Eraser Time!</h1>
            <NavBar />
            <Profile />
        </Route>
      </Switch>

      
    </div>
  )
}

export default App;
