import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/Apiservice'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Task() {
 
   
    let [task,setTask]=useState('')

    const [showModel,setShowModel]=useState(false)
    const [employees,setEmployees]=useState([])
    const [selectedEmployee,setSelectedEmployee]=useState('')

    let params = useParams();

    let navigate = useNavigate()

   

    const handleAssigntask=async()=>{
       
        try {
            let res = await AxiosService.post(`/admin/employee/task/${params.id}/assign`,{
                selectedEmployee
            })
        
            if(res.status==201){
                 toast.success(res.data.message)
                setShowModel(false)
            }
        } catch (error) {
            toast.error(error.response.data.message || "This Task Already Assigned the member")
            console.log(error)
        }
    }

    const getEmployees = async()=>{
        try {
            let res = await AxiosService.get('/admin/employees')
            console.log(res.data)
            setEmployees(res.data.employees)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete=async()=>{
        try {
            let res = await AxiosService.delete(`/admin/employee/task/delete/${params.id}`)
            if(res.status==200){
                toast.success(res.data.message)
                navigate('/admin/tasks')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getTask=async()=>{
        try {
             let res =await AxiosService.get(`/admin/employee/task/${params.id}`)
             console.log(res)
             if(res.status==200){
                setTask(res.data.task)
             }
        } catch (error) {
            console.log(error)
        }
    }
  useEffect(()=>{
    if(params.id){
        getTask()
    }
  },[])

  useEffect(()=>{
    getEmployees()
  },[])
  return <>
     <div className="container mt-5">
        <h3 className='text-center mb-4'>View tasks</h3>
  <div className="row justify-content-center">
    <div className="col-12 col-sm-10 col-md-8 col-lg-6">
      <Card className="shadow" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center">{task.project}</Card.Title>
          <Card.Text><strong>Title:</strong> {task.title}</Card.Text>
          <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
          <Card.Text><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</Card.Text>
          <Card.Text><strong>Status:</strong> {task.status}</Card.Text>
          <Card.Text><strong>Assigned To:</strong> {task.assignedTo ? task.assignedTo.name : 'Not assigned'}</Card.Text>
          <Card.Text><strong>Created At:</strong> {new Date(task.createdAt).toLocaleDateString()}</Card.Text>
          <div className='d-flex'>
            <Button className="btn-secondary w-100" onClick={()=>navigate(`/admin/task/edit/${task._id}`)}>Edit</Button>
            &nbsp; &nbsp;
            <Button className="btn-danger w-100" onClick={()=>handleDelete()}>Delete</Button>
          </div>
           
          <div>
                <Button className="btn-warning rounded-3 p-2 mt-3 w-100"  onClick={()=>setShowModel(true)}>Click to assign</Button>
          </div>
           
        </Card.Body>


      </Card>

      <div>
            <Modal show={showModel} >
                <Modal.Header>
                    <Modal.Title >Assign Tasks to Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Select aria-label="Default select example" onChange={(e)=>setSelectedEmployee(e.target.value)} value={selectedEmployee}>
                   <option value="" disabled>Select Employee</option>
                    {
                        employees.map((employee)=>{
                           return <option key={employee._id}   value={employee._id}>
                               {employee.name}
                            </option>
                        })
                    }
                </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModel(false)}>Cancel</Button>
                    <Button variant='success' onClick={()=>handleAssigntask()}> Submit</Button>
                </Modal.Footer>
            </Modal>
            </div>
    </div>
  </div>
</div>

  
  </>

}

export default Task