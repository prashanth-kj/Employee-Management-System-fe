import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../../utils/Apiservice';
import {toast} from  'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
         let [name,setName]= useState('')
         let [email,setEmail]=useState('')
 
         let params=useParams()
         let navigate =useNavigate()
  
   const getData=async()=>{
    try {
         let res = await AxiosService.get(`/admin/employee/${params.id}`)
         
        if(res.status==200){
            setName(res.data.employee.name)
            setEmail(res.data.employee.email)
        }
    } catch (error) {
        console.log(error)
    }
   }

 const handleEdit=async()=>{
    try {
         let res = await AxiosService.put(`/admin/employee/${params.id}`,{
            name,
            email
         })

         if(res.status==200){
             toast.success(res.data.message)
             navigate('/admin/dashboard')
         }
    } catch (error) {
        console.log(error)
    }
 }

useEffect(()=>{
     if(params.id){
        getData()
     }
},[])     

  return<>

  <div className='container'>
        <h4>Edit</h4>
        <Form style={{width:"400px"}}>
        <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name}  onChange={(e)=>setName(e.target.value)}/>
           
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
           
        </Form.Group>
        <Button className='btns w-100' onClick={()=>handleEdit()}>
            Submit
        </Button>
        </Form>
    </div>
  
  </>
}

export default Edit