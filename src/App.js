import './styles.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'


function App() {

  const AuthenticatedRoute = ({ ...props }) => {
    const isUserAuthenticated = () => localStorage.getItem('key');

    return (
      isUserAuthenticated() ? <Route {...props}/> : <Redirect to="/Login" />
    )
  }

  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
        <Route path="/login" component ={Login}/>
        <AuthenticatedRoute path ="/home" component ={Home}/>
      </Switch>
    </div>
  </Router>
    
  );
}

export default App;
