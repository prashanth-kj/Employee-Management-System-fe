import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AxiosService from '../utils/Apiservice';
import { GrGroup } from "react-icons/gr";
import {toast} from  'react-toastify';


function Signin() {
      let [email,setEmail]= useState("");
      let [password,setPassword]=useState("");
      let [loading,setLoading]=useState(false);
      let navigate =useNavigate();

    let handleLogin = async()=>{
           try {
               setLoading(true);
            let res= await AxiosService.post('/employee/login',{
              email,
              password
           })
           console.log(res)
            if(res.status==201){
              
                console.log("login sucessfull")
                    toast.success(res.data.message);
                  sessionStorage.setItem('token',res.data.token);
                  sessionStorage.setItem('employeeData',JSON.stringify(res.data.employee))
                 
                  if(res.data.employee.role=='admin'){
                        navigate('/admin/dashboard');
                  }else{
                        navigate('/employee/home')
                  }
                 
            }
           } catch (error) {
                  toast.error(error.response.data.message || "Error Occured")
           }finally{
                setLoading(false)
           }
    }


  return <>
      <div className='container ' style={{ height:'100vh'}}>
          <div className='d-flex justify-content-center align-items-center' style={{height:"100%"}}>
               <div className='container-fluid shadow p-4 rounded-5' style={{maxWidth:"400px"}}>
                 <div>
                     <h3 className='text-center' style={{fontFamily:"sans-serif",color:"purple"}}><GrGroup size={"24px"} className='mb-1 mx-2' />EMS App</h3>
                 </div>
                    
                <Form>
                    <Form.Group className="mb-3" >
                      <Form.Label className="form-label">Email address</Form.Label>
                      <Form.Control type="email"  className="form-control" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Password</Form.Label>
                      <Form.Control type="password" className="form-control" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button className="mb-3 w-100" variant="primary" onClick={handleLogin} style={{backgroundColor:"purple", border:"1px solid crimson"}}>
                    {
                       loading ? <Spinner animation='border' size='sm' ></Spinner> : 'Login'
                    }
                    </Button>
                     
                    <Form.Group className="mb-3 text-center">
                      <Form.Label><Link to={'/forgetpassword'} style={{textDecoration:"none" ,color:"purple"}}>ForgetPassword?</Link></Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3 text-center">
                      <Form.Label>Don't have an Account? <Link to={'/signup'} style={{textDecoration:"none" ,color:"purple"}}>Signup</Link></Form.Label>
                    </Form.Group>
                </Form>
               </div>
          </div>
      </div>
  </>
}

export default Signin
