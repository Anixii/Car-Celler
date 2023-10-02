import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import AdminPage from './components/Admin/AdminPage';
import AdminModel from './components/Admin/AdminModel/AdminModel';
import AdminMark from './components/Admin/AdminMark/AdminMark';
import AdminSignIn from './components/Admin/AdminSignIn';
import WithAdminAuth from './hoc/WithAdminAuth';
function App() {
  return (
    <>   
    <Routes> 
      <Route path='/' element={<MainPage/>}/>
      <Route path='/admin' element={<WithAdminAuth><AdminPage/></WithAdminAuth>}/>  
      <Route path='/admin/sign' element={<AdminSignIn/>}/>  
      <Route path='/admin/model' element={<WithAdminAuth><AdminModel/></WithAdminAuth>}/> 
      <Route path='/admin/mark' element={<WithAdminAuth><AdminMark/></WithAdminAuth>}/> 
    </Routes>
    </>
  );
}

export default App;
