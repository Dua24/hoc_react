import './App.scss';
import Header from './components/Header/header';
import { Outlet, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container">

        </div>
        <div className="app-contain">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>



    </div>
  );
}


export default App;
