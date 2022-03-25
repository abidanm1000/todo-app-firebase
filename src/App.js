import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

function App() {

  return (
    // Main router that allows the routes to connect and work
    <BrowserRouter>
      <div className='App'>
        {/* Makes sure only ONE route shows at any one time*/}
        <Routes>
          {/* Set up the route that will show a page */}
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/" element={<SignIn />}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
