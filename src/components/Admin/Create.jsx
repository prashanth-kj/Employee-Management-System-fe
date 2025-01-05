import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../../utils/Apiservice';
import {toast} from  'react-toastify';
import { useNavigate } from 'react-router-dom';



function Create() {

   let [name,setName]= useState('')
   let [email,setEmail]=useState('')
    
    let navigate =useNavigate()

   const handleCreate=async()=>{
      try {
          let res = await AxiosService.post('/admin/employee',{
            name,
            email
          })

          if(res.status==201){
              toast.success(res.data.message) 
              navigate('/admin/dashboard')
          }
      } catch (error) {
        console.log(error)
      }
   }

  return <>
   <div className="container">

      <div className="text-center mb-4">
        <h2>Create Employee</h2>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button className="btns w-100" onClick={() => handleCreate()}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
      </div>

  
  </>
}

export default Create