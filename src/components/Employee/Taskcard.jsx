import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AxiosService from '../../utils/Apiservice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Taskcard() {
  
    let [task,setTask]=useState()
    let params=useParams();
    let navigate=useNavigate();
  
    const getTask=async(req,res)=>{
        try {
            let res = await AxiosService.get(`/task/${params.id}`)
            console.log(res)
            setTask(res.data.task)
        } catch (error) {
            console.log(error)
        }
    }
    
    const updatedTask = async(status)=>{
        try {
            let res = await AxiosService.put(`/task/${params.id}/status/${status}`)
            console.log(res)
            if(res.status==200){
                 toast.success(res.data.message)
                 navigate('/employee/tasks')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

   useEffect(()=>{
   if(params.id){
      getTask()
   }else{
      toast.error("task Id not found")
   }
        
    
   },[])

  return <>
      <div className="container mt-4">
        <div>
            <h3 className='text-center'>Task details</h3>
        </div>
      {task ? (
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <Card className="shadow-sm  rounded-4 mb-4">
              <Card.Body>
                <Card.Title className="text-center mb-3">{task.title}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {task.description}
                </Card.Text>
                <Card.Text>
                  <strong>Project:</strong> {task.project}
                </Card.Text>
                <Card.Text>
                  <strong>Deadline:</strong>{' '}
                  {new Date(task.deadline).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {task.status}
                </Card.Text>

                <div className="d-flex justify-content-between mt-5 mb-4">
                  {
                    task.status !="Done" ? <Button variant='success' className='w-50' onClick={()=>updatedTask("Done")}>Done</Button>:<></>
                  }
                  &nbsp; 
                  {
                    task.status !="To-Do" ? <Button variant='danger' className='w-50' onClick={()=>updatedTask("To-Do")}>To-Do</Button>:<></>
                  }
                  &nbsp; 
                  {
                    task.status !="In-Progress" ? <Button variant='warning'  className='w-50' onClick={()=>updatedTask("In-Progress")}>In-Progress</Button>:<></>
                  }
                  &nbsp; 
                </div>
              </Card.Body>
                
            </Card>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12 text-center">
            <h2>Task not found</h2>
          </div>
        </div>
      )}
    </div>
  
  </>
}

export default Taskcard