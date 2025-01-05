import React, { useEffect, useState } from "react";
import AxiosService from "../../utils/Apiservice";
import { Card, Spinner } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {toast} from  'react-toastify';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editform,setEditform]=useState(false);

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')

  const getProfile = async () => {
    try {
      let res = await AxiosService.get("/employee/profile");
      if (res.status === 200) {
        setProfile(res.data.getemployee);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile=async()=>{
    try {
        let res = await AxiosService.put('/employee/profile/edit',{
            name,
            email
        })
        if(res.status==200){
            toast.success(res.data.message);
            getProfile()
        }
    } catch (error) {
        console.log(error)
    }finally{
        setEditform(false)
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mt-5">
       <div className="mb-5">
            {loading ? (
                <div className="text-center">
                <Spinner animation="border"  style={{color:"purple"}} />
                </div>
            ) : profile ? (
                <Card className="shadow-sm" style={{ maxWidth: "400px", margin: "0 auto" }}>
                <div className="d-flex justify-content-between p-3 text-bg-light">
                        <h4 style={{color:"purple"}}>My Profile</h4>
                        <FaUserEdit  style={{color:"purple"}} size={"25px"} onClick={()=> setEditform(true)}/>
                </div>
                <Card.Body>
                    <Card.Text>
                    <strong>Name:</strong> {profile.name}
                    </Card.Text>
                    <Card.Text>
                    <strong>Email:</strong> {profile.email}
                    </Card.Text>
                    <Card.Text>
                    <strong>Role:</strong> {profile.role}
                    </Card.Text>
                </Card.Body>
                </Card>
            ) : (
                <div className="text-center">
                <h4>No Profile Data Available</h4>
                </div>
            )}
       </div>

        <div >
          {
            editform?
            (
                <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
    
                <Button style={{backgroundColor:"purple", border:"1px solid purple"}} onClick={()=>handleEditProfile()}>
                  Save
                </Button>
                </Form>
            ):
            
            (null)
          }
        </div>
    </div>

   

  );
}

export default Profile;
