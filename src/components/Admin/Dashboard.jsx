import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/Apiservice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
 
   let [employees,setEmployees]=useState([])
   
  let navigate = useNavigate()
   
   const getEmployees=async()=>{
    try {
       let res = await AxiosService.get('/admin/employees')
       
       setEmployees(res.data.employees)
    } catch (error) {
      console.log(error)
    }
   }

   useEffect(()=>{
      
      getEmployees()
   },[])

  return<>
  
     <div className="container" style={{minHeight:'100vh'}}>
   <h2 className='text-center mt-3 mb-3'>All Employees List</h2>

   <div className='d-flex justify-content-end'>
      <Button className='btns mb-4' onClick={()=>navigate('/admin/employee/create')}>Create</Button>
    </div>

  <div className="row">
    {employees.map((employee) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={employee._id}>
        <Card className="shadow h-100" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title className='text-center'>{employee.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {employee.email}
            </Card.Text>
            <Card.Text>
              <strong>Role:</strong> {employee.role}
            </Card.Text>
            <Card.Text>
              <strong>Assigned Tasks:</strong> {employee.assignedTasks.length}
            </Card.Text>
            <Button className='w-100 btns' onClick={()=>navigate(`/admin/employee/${employee._id}`)}> view details</Button>
            <Button className='w-100 btn-warning mt-3' onClick={()=>navigate(`/admin/timelog/${employee._id}`)}> view Timelog</Button>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
</div>

  
  </>
}

export default Dashboard