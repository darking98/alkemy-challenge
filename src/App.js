import './styles.css'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

// 1 - It's a good practice to prevent the use of magic strings when possible https://deviq.com/antipatterns/magic-strings
// and the application paths seems like a good candidate for having them as costants in a file to re use them and prevent any issues
// check that just in this file you have both /Login and /login defined. See this for reference: https://stackoverflow.com/questions/39036457/react-create-constants-file
// As an example of casing convention all constants should be uppercase with words separated by underscores ("_"). Example: HOME_PATH, paths.HOME, HOME_PAGE, etc.

function App() {

  // 1 - I think this could be extracted away to a different file as a stand alone component, what do you think?
  const AuthenticatedRoute = ({ ...props }) => {
    // 1- From my perspective I like to think about components in terms lightweight objects that merges logic (algorithms) and presentation (UI)
    // I would either use a container or service to hold all logic around user login/session: https://stackoverflow.com/questions/35855781/having-services-in-react-application
    // this is also true for the code in /components/Login.js

    // 2 -What is key? Would a different name reflect what it holds better?
    const isUserAuthenticated = () => localStorage.getItem('key');

    return (
      isUserAuthenticated() ? <Route {...props}/> : <Redirect to="/Login" />
    )
  }

  return (
    // What happens if a user navigates to http://localhost:3000/alkemy-challenge or http://localhost:3000/asd123 ? 
    // What about adding a wildcard route to match everything else and redirect the user to the home page instead?
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
