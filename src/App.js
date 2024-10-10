import React,{useState,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate, HashRouter } from 'react-router-dom';
import Places from './components/screens/Places.js';
import Place from './components/screens/Place.js';
import Login from './components/screens/Login.js';
import SignUp from './components/screens/Signup.js';
import NotFound from './components/screens/NotFound.js';
import PrivateRoute from './components/PrivateRoute.js';

export const UserContext = React.createContext();

function App() {
  const [userData,setUserData] = useState({});
  const updateUserData = (action)=>{
    switch(action.type) {
      case "LOGOUT":
        // <Navigate to='/auth/login'/>
        setUserData(null);
        localStorage.clear();
        
      break;
      case "LOGIN":
        setUserData(action.payload);
      break;
      default:
        break;
    }
  }
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setUserData(JSON.parse(localStorage.getItem('user_data')))
    setLoading(false)
  },[]);
  return (
    loading?(<h1>Loading</h1>):(
      <div>
        <UserContext.Provider value={{userData,updateUserData}}>
          <HashRouter>
              <Routes>
                  <Route element={<Places />} path="/" exact />
                  <Route element={<PrivateRoute Component={Place} />} path="/place/:id" exact />
                  {/* <Route element={<Place />} path="/place/:id" exact /> */}
                  <Route element={<Login />} path="/auth/login/" exact />
                  <Route element={<SignUp />} path="/auth/create/" exact />
                  <Route component={NotFound} />
              </Routes>
          </HashRouter>  
        </UserContext.Provider>
      </div>
    )
    
  );
}

export default App;
