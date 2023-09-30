import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import AdminPage from './components/Admin/AdminPage';
import AdminModel from './components/Admin/AdminModel/AdminModel';
import AdminMark from './components/Admin/AdminMark/AdminMark';

function App() {
  return (
    <>   
    <Routes> 
      <Route path='/' element={<MainPage/>}/>
      <Route path='/admin' element={<AdminPage/>}/> 
      <Route path='/admin/model' element={<AdminModel/>}/> 
      <Route path='/admin/mark' element={<AdminMark/>}/> 
    </Routes>
    </>
  );
}

export default App;
