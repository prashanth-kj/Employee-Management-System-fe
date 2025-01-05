import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/Apiservice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Tasks() {
  
const [tasks,setTasks]=useState([])

let navigate =useNavigate()


const getTasks=async()=>{
      try {
         let res = await AxiosService.get('/admin/employee/tasks')
         console.log(res)
         setTasks(res.data.tasks)
      } catch (error) {
        console.log(error)
      }
}

useEffect(()=>{
 
 getTasks()
  
},[])

 return <>
   
   <div className="container" style={{minHeight:'100vh'}}>
   <h2 className='text-center mt-3 mb-3'>All Tasks List</h2>

   <div className='d-flex justify-content-end'>
      <Button className='btns mb-4' onClick={()=>navigate('/admin/task/create')}>create Task</Button>
    </div>

  <div className="row">
    {tasks.map((task) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={task._id}>
        <Card className="shadow h-100" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title className='text-center'>{task.project}</Card.Title>
            <Card.Text>
              <strong>Title:</strong> {task.title}
            </Card.Text>
            <Card.Text>
              <strong>Deadline:</strong>{new Date(task.deadline).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong> {task.status}
            </Card.Text>
            <Card.Text>
              <strong>Assigned to:</strong> {task.assignedTo ? task.assignedTo.name : 'Not assigned'}
            </Card.Text>
            <Button className='w-100 btns' onClick={()=>navigate(`/admin/task/${task._id}`)}>View Task</Button>

           

          </Card.Body>

        </Card>

         
         </div>
    ))}
  </div>
</div>

 </>
}

export default Tasks