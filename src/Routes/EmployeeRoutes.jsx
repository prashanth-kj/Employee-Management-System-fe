import React from 'react'
import Home from '../components/Employee/Home'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Employee/Sidebar'
import Profile from '../components/Employee/Profile'
import Tasks from '../components/Employee/Tasks'
import Taskcard from '../components/Employee/Taskcard'
import Timelog from '../components/Employee/Timelog'
import Report from '../components/Employee/Report'
import { Chart } from 'chart.js'

function EmployeeRoutes() {
  return <Routes>
     
    <Route path='/home' element={<><Sidebar/><Home/></>}/>
    <Route path='/profile' element={<><Sidebar/><Profile/></>}/>
    <Route path='/tasks' element={<><Sidebar/><Tasks/></>}/>
    <Route path='/task/:id' element={<><Sidebar/><Taskcard/></>}/>
    <Route path='/timelog' element={<><Sidebar/><Timelog/></>}/>
    <Route path='/report' element={<><Sidebar/><Report/></>}/>
    <Route path='/workchart' element={<><Sidebar/><Chart/></>}/>

  </Routes>
}

export default EmployeeRoutes