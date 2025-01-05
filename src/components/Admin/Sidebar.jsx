import React  from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useLogout from '../../Hooks/useLogout';
import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Sidebar() {

      let employeeData=JSON.parse(sessionStorage.getItem('employeeData'))
      let navigate= useNavigate()
      let logout = useLogout();


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand onClick={()=>navigate('/admin/dashboard')} style={{fontFamily:"sans-serif",color:"purple"}}> <GrGroup size={"24px"} className='mb-1 mx-2' />EMS App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/admin/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={()=>navigate('/admin/tasks')}>Tasks</Nav.Link>
            <Nav.Link onClick={()=>navigate('/admin/Performance')}>Performance</Nav.Link>
          </Nav>
          <Nav.Item>
            <Dropdown>
                <Dropdown.Toggle
                    id="profile-dropdown"
                    variant="light"
                    style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                    }}
                    >
                   <CgProfile size={"30px"} style={{ fontFamily: "sans-serif", color: "purple" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                <Dropdown.Item onClick={()=>navigate('/admin/profile')}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
             </Dropdown>
         </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar