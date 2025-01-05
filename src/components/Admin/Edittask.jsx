import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../../utils/Apiservice';
import {toast} from  'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function Edittask() {
   
    let [title,setTitle]=useState('')
    let [description,setDescription]=useState('')
    let [project,setProject]=useState('')
    let [deadline,setDeadline]=useState('')
    
    let params=useParams()
    let navigate=useNavigate()
     
  
    const handleEditTask=async()=>{
        try {
            let res =await AxiosService.put(`/admin/employee/task/${params.id}`,{
                title,
                description,
                project,
                deadline
            })

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
            
             if(res.status==200){
               setTitle(res.data.task.title)
               setDescription(res.data.task.description)
               setProject(res.data.task.project)
               
            const deadline = new Date(res.data.task.deadline);
            const formattedDate = deadline.toISOString().split('T')[0];  // Format as yyyy-MM-dd
            setDeadline(formattedDate);


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
      
  return <>
   
   <div className='container'>
       <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Project</Form.Label>
                <Form.Control type="text" placeholder="Enter Project" value={project} onChange={(e)=>setProject(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Deadline</Form.Label>
                <Form.Control type="date"  value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
            </Form.Group>
            
            
            <Button className='btns w-100' onClick={()=>handleEditTask()}>
                Edit 
            </Button>
    </Form>
    </div>
    
  </>
}

export default Edittask