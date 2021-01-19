import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, useHistory} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

// const Route = (props) => {
//   const location = window.location;
//   if(location.pathname === props.path) {
//     return props.component;
//   }
// }

const Contacts = () => {
  return <h2>Contacts</h2>
}

const Main = () => {
  return <div>
    <h2>Main</h2>
    <Link to='/contacts'>To contacts page</Link>
  </div>
}

const news = [{
  title: "Локдаун скоро закончится",
  id: 1
},{
  title: "Снег пошел",
  id: 2
},{
  title: "Подарки еще не закончились",
  id: 3
}]

const NewsList = (props) => {
  return (
    <div>
      {news.map((n) => (
        <p>
          <Link to={`${props.match.path}/${n.id}`}> {n.title} </Link>
        </p>
      ))}
    </div>
  )
}

const News = (props) => {
  return (
    <div>
      <Switch>
        <Route path={`${props.match.path}`} exact component={NewsList}></Route>
        <Route path={`${props.match.path}/:id`} component={Single}></Route>
      </Switch>
    </div>
  )
}

const Single = (props) => {
  const currentNews = news.find((n) => n.id.toString() === props.match.params.id);
    return (
    <div>
      <h3>News №{props.match.params.id}</h3>
      <div>{currentNews?.title}</div>
    </div>
  )
}

const NotFound = () => {
  return (
    <div> Not Found </div>
  )
}

const PrivateRoute = (props) => {
  const history = useHistory();
  const makeLogOut = () => {
    localStorage.removeItem("isLogged");
    history.push("/login");
  }
  const isLogged = localStorage.getItem('isLogged');
  if(isLogged) {
    return (
      <div>
        <Link to="/contacts">Contacts</Link>
        <NavLink className='app-link' 
                 to="/main" 
                 activeClassName='active-link'>
            Main
        </NavLink>
        <NavLink className='app-link' 
                 to="/news" 
                 activeClassName='active-link'>
            News
        </NavLink>
        <h1>My Super App</h1>
        <button onClick={makeLogOut}>Log out</button>
        <Route {...props}/>
      </div>
    )
  }
  return <Redirect to='/login'/>
}

const Login = (props) => {
  const isLogged = localStorage.getItem("isLogged");
  const makeLogin = () => {
    localStorage.setItem("isLogged", true)
    props.history.push("/main");
  };
  if(isLogged) {
    return <Redirect to='/main'/>
  }
  return (
    <div>
      <button onClick={makeLogin}>Login</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Router >
        <Switch>
          <Route path='/login' component={Login}/>
          <PrivateRoute path="/contacts" component={Contacts}/>
          <PrivateRoute path="/news" component={News}/>
          <PrivateRoute path="/main" component={Main}/>
          <Route path="/" exact render={() => <Redirect to='/main'/>}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
