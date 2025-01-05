import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from  'react-toastify';
import AxiosService from '../../utils/Apiservice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
function Employee() {
    
  const [employee,setEmployee]=useState();
  
  const [tasks,setTasks]=useState([])
  const [loading, setLoading] = useState(false);
  const [showtask,setShowTask]=useState(false)

  let params=useParams()
  let navigate =useNavigate()
  
  
  const handleTask=async()=>{
    setLoading(true)
    setShowTask(true)

    try {
     
        let res= await AxiosService.get(`/admin/employee/${params.id}/tasks`)
        
        if(res.status==200){
            setTasks(res.data.tasks)
        }
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
  }

   const handleDelete=async()=>{
      try {
          let res = await AxiosService.delete(`/admin/employee/delete/${params.id}`)
           if(res.status==200){
              toast.success(res.data.message)
              navigate('/admin/dashboard')
           }
      } catch (error) {
        console.log(error)
      }
   }

    const getEmployee=async()=>{
        try {
            let res = await AxiosService.get(`/admin/employee/${params.id}`)
             setEmployee(res.data.employee)
            
        } catch (error) {
            console.log(error)
           toast.error(error.response.data.message || "Error Occured")
        }
    }


  useEffect(()=>{
    if(params.id){
        getEmployee()
    }else{
    toast.error("EmployeeId not found")
    }
  },[])

  return <>
     <div className="container" style={{minHeight:'100vh'}}>
  <div className="row justify-content-center mt-3 mb-5">
    {
      employee ? (
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <Card className="shadow" style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title className="text-center">Employee Details</Card.Title>
              <Card.Text><strong>Name:</strong> {employee.name} </Card.Text>
              <Card.Text><strong>Email:</strong> {employee.email}</Card.Text>
              <Card.Text><strong>Role:</strong> {employee.role}</Card.Text>
              <Card.Text><strong>Created At:</strong> {new Date(employee.createdAt).toLocaleDateString()}</Card.Text>
              <Card.Text><strong>Last Updated At:</strong> {new Date(employee.updatedAt).toLocaleDateString()}</Card.Text>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" className="w-100" onClick={() => navigate(`/admin/employee/edit/${employee._id}`)}>Edit</Button>
                &nbsp; &nbsp; 
                <Button variant="danger" className="w-100" onClick={() => handleDelete()}>Delete</Button>
              </div>
              <div className='mt-3'>
                 <Button  className=" btns w-100" onClick={()=>handleTask()}>view Assigned tasks</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>
          <h3>Employee Not Found</h3>
        </div>
      )
    }
  </div>
  
      <div>
        
       {
         showtask && (
           
            <div>
                  <h4 className='text-center'>Tasks</h4>
             {
                loading ? (
                        <p>Loading tasks...</p>
                    ):(
                        tasks.length? (
                            <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Project</th>
                                <th>Title</th>
                                <th>Deadline</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                             <tbody>
                                {
                                 tasks.map((task,i)=>{
                                     return <tr key={task._id}>
                                        <td>{i + 1}</td>
                                        <td>{task.project}</td>
                                        <td>{task.title}</td>
                                        <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                        <td>{task.status}</td>
            
                                     </tr>
                                 })
                                  
                                }
            
                             </tbody>
                          </Table>   
                        ):(
                            <h3 className='text-center'>No tasks assigned for this employee</h3>
                        )
                    )
                }
            </div>
         )
       }       
      </div>
</div>

  </>
}

export default Employee