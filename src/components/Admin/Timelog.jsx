import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosService from "../../utils/Apiservice";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';



function Timelog() {
  const [timelogs, setTimelogs] = useState([]);
  const params = useParams();
   
  const getTimelog = async () => {
    try {
      const res = await AxiosService.get(`/admin/employee/timelog/${params.id}`);
      setTimelogs(res.data.timelog.timelogs);
      console.log(res.data.timelog.timelogs)
     
    } catch (error) {
      console.error("Error fetching timelog data:", error);
    }
  };


  const updatedTimelogStatus=async(id,status)=>{
    try {
        let res = await AxiosService.put(`/admin/employee/timelog/${id}/${status}`)
        if(res.status==200){
            toast.success(res.data.message)
            getTimelog()
        }

    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (params.id) {
      getTimelog();
    }
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Timelog</h1>
      <div className="text-center">
        {timelogs.length ? (
          <Table striped bordered hover responsive >
            <thead>
              <tr>
                <th>#</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>TotalHours(hrs)</th>
                <th>Status</th>
                <th>IsActive</th>
                <th>Others</th>
              </tr>
            </thead>
            <tbody>
                {
                    timelogs.map((timelog,i)=>{
                        return <tr key={timelog._id} >
                              <td>{i + 1}</td>
                              <td>{new Date(timelog.startTime).toLocaleDateString()}</td>
                              <td>{new Date(timelog.endTime).toLocaleDateString()}</td>
                              <td>{timelog.totalHours}</td>
                              <td>{timelog.status}</td>
                              <td>{timelog.isActive ? "Active" : "No Active"}</td>
                              <td>
                              <div className="d-flex justify-content-center">
                                {
                                  timelog.status !="approved" ? <Button variant='success' className="w-50" onClick={()=>updatedTimelogStatus(timelog._id,"approved")}>Approve</Button>:<></>
                               }
                                &nbsp; 
                                {
                                  timelog.status !="rejected" ? <Button variant='danger' className="w-50"  onClick={()=>updatedTimelogStatus(timelog._id,"rejected")}>Reject</Button>:<></>
                                }
                                &nbsp; 
                                {
                                  timelog.status !="pending" ? <Button variant='warning' className="w-50"  onClick={()=>updatedTimelogStatus(timelog._id,"pending")}>Pending</Button>:<></>
                                }
                                </div>
                              </td>
                        </tr>
                    })
                }
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
      
    </div>
  );
}

export default Timelog;
