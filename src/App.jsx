import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
