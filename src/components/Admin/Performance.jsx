import React, { useEffect, useState } from 'react';
import AxiosService from '../../utils/Apiservice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Performance() {
  const [employees, setEmployees] = useState([]);
  let navigate =useNavigate();

  const getData = async () => {
    try {
      let res = await AxiosService.get('/admin/employee/performance');
      console.log(res);
      setEmployees(res.data.employeePerformance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container performance-container">
      <h2 className="text-center mt-3 mb-4">Employee Performance</h2>

      <div className="row">
        {
          employees.map((employee) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={employee.employee}>
            <Card className="shadow h-100 " border="info">
              <Card.Body>
                <Card.Title className="text-center employee-name">{employee.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {employee.email}
                </Card.Text>
                <Card.Text>
                  <strong>Total Hours:</strong> {employee.totalHoursWorked}
                </Card.Text>
                <Card.Text>
                  <strong>Total Tasks:</strong> {employee.totalTasks}
                </Card.Text>
                <Card.Text>
                  <strong>Pending Tasks:</strong> {employee.pendingTasks}
                </Card.Text>
                <Card.Text>
                  <strong>In-Progress Tasks:</strong> {employee.inProgressTasks}
                </Card.Text>
                <Card.Text>
                  <strong>Completed Tasks:</strong> {employee.completedTasks}
                </Card.Text>

                <Button className='btns w-100' onClick={()=>navigate(`/admin/report/${employee.employee}`)}>Generate report</Button>
              </Card.Body>

            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Performance;
