import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import AxiosService from '../utils/Apiservice';
import {toast} from  'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GrGroup } from "react-icons/gr";

function Signup() {
        
     let [name,setName]=useState("");   
     let [email,setEmail]=useState("");
     let [password,setPassword]=useState("");
     let [loading,setLoading]=useState(false);
     let navigate= useNavigate();

    let handleCreate= async ()=>{
        try {
              setLoading(true);
          let res= await AxiosService.post('/employee/register',{
              name,
              email,
              password
          })

             if(res.status==201){
                   toast.success(res.data.message);
                   navigate('/')
             }
        } catch (error) {
             console.log(error)
          toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
    }
     
  return <>
      <div className='container' style={{height:"100Vh"}}>
            <div className='d-flex justify-content-center align-items-center' style={{height:"100%"}}>
                <div className='container-fluid shadow p-4 rounded-5' style={{maxWidth:"400px"}}>
                    <div>
                       <h3 className='text-center' style={{fontFamily:"sans-serif",color:"purple"}}><GrGroup size={"24px"} className='mb-1 mx-2' />EMS App</h3>
                    </div>
                    
                 <Form>
                    <Form.Group className="mb-3" >
                      <Form.Label  className="form-label">Name</Form.Label>
                      <Form.Control type="text" className="form-control" placeholder="Enter your First Name" onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Label className="form-label">Email </Form.Label>
                      <Form.Control type="email" className="form-control"  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Password</Form.Label>
                      <Form.Control type="password" className="form-control"  placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
                    </Form.Group>

                    <Button className="mb-3 w-100"  onClick={()=>handleCreate()} style={{backgroundColor:"purple", border:"1px solid cadetblue"}}> 
                      {
                        loading ? <Spinner animation='border' size='sm' ></Spinner> : 'SignUp'
                      }
                    </Button>

                </Form>

                </div>
            </div>
      </div>
  </>
}

export default Signup