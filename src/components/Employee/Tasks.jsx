import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/Apiservice'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Tasks() {
   
   const [tasks,setTasks]=useState([])
    let navigate =useNavigate()
    
   const getTasks=async()=>{
        try {
            let res = await AxiosService.get('/task/list')
            console.log(res.data.getTasks)
            setTasks(res.data.getTasks)

        } catch (error) {
            console.log(error)
        }
   }

    const handleDelete=async(id)=>{
        try {
            let res =await AxiosService.delete(`/task/delete/${id}`)
            if(res.status==200){
                toast.success(res.data.message)
                getTasks()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
      
       getTasks()

    },[])

  return <>

     <div className='container'>
         <h2 className='text-center'>My Tasks</h2>
         <hr />
       <div className='mt-2'>
        <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Task</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task,i)=>{
                            return <tr key={task._id}>
                                  <td>{i+1}</td>
                                  <td>{task.project}</td>
                                  <td>{task.title}</td>
                                  <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                  <td>{task.status}</td>
                                  <td>
                                     <Button style={{backgroundColor:"purple",border:'1px solid purple'}} onClick={()=>navigate(`/employee/task/${task._id}`)}>
                                        View
                                     </Button>
                                     &nbsp; &nbsp;
                                     <Button variant='danger' onClick={()=>handleDelete(task._id)}>Delete</Button>
                                  </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
       </div>
   
     </div>
  
  
  </>
}

export default Tasks