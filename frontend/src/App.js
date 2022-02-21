import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import InvantoryPage from './pages/InvantoryPage';
import BagDetails from './pages/BagDetails';

function App() {
  return (
    <>
      <Router>
        <Header />

        <main>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/inventory" component={InvantoryPage} />
            <Route path="/bags/:id" component={BagDetails} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
