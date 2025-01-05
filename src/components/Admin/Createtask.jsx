import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../../utils/Apiservice';
import {toast} from  'react-toastify';
import { useNavigate } from 'react-router-dom';

function Createtask() {
  
    let [title,setTitle]=useState('')
    let [description,setDescription]=useState('')
    let [project,setProject]=useState('')
    let [deadline,setDeadline]=useState('')

    let navigate=useNavigate()

    let handleCreateTask=async()=>{
        try {
            let res = await AxiosService.post('/admin/employee/create',{
                title,
                description,
                project,
                deadline
            })
           
            if(res.status==201){
                toast.success(res.data.message)
                navigate('/admin/tasks')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return <>
    <div className='container'>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" onChange={(e)=>setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Project</Form.Label>
        <Form.Control type="text" placeholder="Enter Project" onChange={(e)=>setProject(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="date"  onChange={(e)=>setDeadline(e.target.value)}/>
      </Form.Group>
      
      
      <Button className='btns w-100' onClick={()=>handleCreateTask()}>
        Create 
      </Button>
    </Form>
    </div>
  </>
}

export default Createtask