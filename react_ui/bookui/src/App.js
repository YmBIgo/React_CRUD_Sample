import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Switch, Routes, Route } from 'react-router-dom';
import List from './Component/List'
import New from './Component/New'
import Detail from './Component/Detail'
import Update from './Component/Update'
import Destroy from './Component/Destroy'
import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <div id="App">
        <Header />
        <Routes>
          <Route exact path="/" element={ <List/> } />
          <Route exact path="/new" element={ <New/> } />
          <Route exact path="/books/:id" element={ <Detail/> } />
          <Route exact path="/books/update/:id" element={ <Update/> } />
          <Route exact path="/books/destroy/:id" element={ <Destroy/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
const Header = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">Sample Book</Link>
      <Link to="/new" className="navbar-item">新規投稿</Link>
    </div>
  </nav>
)

export default App;
