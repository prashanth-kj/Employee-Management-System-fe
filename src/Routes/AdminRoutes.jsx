import Dashboard from '../components/Admin/Dashboard'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'
import Employee from '../components/Admin/Employee'
import Create from '../components/Admin/Create'
import Edit from '../components/Admin/Edit'
import Tasks from '../components/Admin/Tasks'
import Task from '../components/Admin/Task'
import Createtask from '../components/Admin/Createtask'
import Edittask from '../components/Admin/Edittask'
import Timelog from '../components/Admin/Timelog'
import Performance from '../components/Admin/Performance'
import Report from '../components/Admin/Report'
import Profile from '../components/Employee/Profile'


function AdminRoutes() {
  return<Routes>
    <Route path='/dashboard' element={<><Sidebar/><Dashboard/></>}/>
    <Route path='/profile' element={<><Sidebar/><Profile/></>}/>
    <Route path='/employee/:id' element={<><Sidebar/><Employee/></>}/>
    <Route path='/employee/create' element={<><Sidebar/><Create/></>}/>
    <Route path='/employee/edit/:id' element={<><Sidebar/><Edit/></>}/>
    <Route path='/tasks' element={<><Sidebar/><Tasks/></>}/>
    <Route path='/task/:id' element={<><Sidebar/><Task/></>}/>
    <Route path='/task/create'element={<><Sidebar/><Createtask/></>}/>
    <Route path='/task/edit/:id' element={<><Sidebar/><Edittask/></>}/>
    <Route path='/timelog/:id' element={<><Sidebar/><Timelog/></>}/>
    <Route path='/performance' element={<><Sidebar/><Performance/></>}/>
    <Route path='/report/:id' element={<><Sidebar/><Report/></>}/>
  </Routes>
}

export default AdminRoutes

