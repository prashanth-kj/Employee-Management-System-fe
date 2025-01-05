import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import AxiosService from '../../utils/Apiservice';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaTasks, FaCheck, FaExclamationTriangle, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Chart from './Chart';

function Home() {
  
  const [checkin, setCheckIn] = useState(() => {
    const savedCheckIn = sessionStorage.getItem('checkin');
    return savedCheckIn === 'true';
  });
  const [work, setWork] = useState('');
  const [performance, setPerformance] = useState(null);

  let navigate = useNavigate();

  const handleCheckIn = async () => {
    try {
      let res = await AxiosService.post('/timelog/clock-in');
      if (res.status === 201) {
        toast.success(res.data.message);
        setCheckIn(true);
        sessionStorage.setItem('checkin', 'true');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to check in.');
    }
  };

  const handleCheckOut = async () => {
    try {
      let res = await AxiosService.post('/timelog/clock-out');
      if (res.status === 201) {
        toast.success(res.data.message);
        setCheckIn(false);
        sessionStorage.setItem('checkin', 'false');
        getTotalWork();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to check out.');
    }
  };

  const getTotalWork = async () => {
    try {
      let res = await AxiosService.get('timelog/totalwork');
      setWork(res.data.totalHours);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch total work hours.');
    }
  };

  const getOverallPerformance = async () => {
    try {
      let res = await AxiosService.get('/task/performance');
      setPerformance(res.data.performance);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch performance data.');
    }
  };

  useEffect(() => {
    getTotalWork();
    getOverallPerformance();
  }, []);

  if (performance === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-3 py-4">
      <h3 className="text-center mb-4">Performance Cards</h3>

      {/* Performance Cards */}
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card border="info" className="h-100">
            <Card.Header>
              <FaTasks /> Total Assigned Tasks
            </Card.Header>
            <Card.Body>
              <Card.Title>{performance.totalTasks}</Card.Title>
              <ProgressBar now={100} variant="info" />
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card border="danger" className="h-100">
            <Card.Header>
              <FaExclamationTriangle /> To-Do
            </Card.Header>
            <Card.Body>
              <Card.Title>{performance.pendingTasks}</Card.Title>
              <ProgressBar
                now={(performance.pendingTasks / performance.totalTasks) * 100}
                variant="danger"
              />
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card border="warning" className="h-100">
            <Card.Header>
              <FaCog /> In-Progress
            </Card.Header>
            <Card.Body>
              <Card.Title>{performance.inProgressTasks}</Card.Title>
              <ProgressBar
                now={(performance.inProgressTasks / performance.totalTasks) * 100}
                variant="warning"
              />
            </Card.Body>
          </Card>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card border="success" className="h-100">
            <Card.Header>
              <FaCheck /> Done
            </Card.Header>
            <Card.Body>
              <Card.Title>{performance.completedTasks}</Card.Title>
              <ProgressBar
                now={(performance.completedTasks / performance.totalTasks) * 100}
                variant="success"
              />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Check-in/Check-out Section */}
      <div className="row mt-5">
        <div className="col-12 col-md-6 mb-4">
          <div className="text-center mt-4">
            <h5>
              {checkin
                ? 'You have already checked in. Ready to finish your work?'
                : "You haven't checked in yet. Ready to start your work?"}
            </h5>

            {checkin ? (
              <Button className="btns mb-3" onClick={handleCheckOut}>
                Check Out
              </Button>
            ) : (
              <Button className="btns mb-3" onClick={handleCheckIn}>
                Check In
              </Button>
            )}

            <p>
              Total Working Hours of Today: <strong>{work}</strong> Hrs
            </p>

            <div>
              <h5>Click to view your tasks!</h5>
              <Button
                variant="secondary"
                onClick={() => navigate('/employee/tasks')}
              >
                View Tasks
              </Button>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="col-12 col-md-6">
          <div className="d-flex justify-content-center align-items-center">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
