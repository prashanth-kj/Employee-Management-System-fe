import React, { useEffect, useState } from 'react'
import AxiosService from '../../utils/Apiservice'
import Table from 'react-bootstrap/Table';


function Timelog() {

   const [timelogs,setTimelogs]=useState([])
   
   const getTimelog=async()=>{
     try {
        let res = await AxiosService.get('/timelog/list')
        console.log(res.data.timeLogs)
        setTimelogs(res.data.timeLogs)
     } catch (error) {
        console.log(error)
     }
   }
 
  useEffect(()=>{
     getTimelog()
  },[])
   
  return <>
   <div className='container'>
           <div className='text-center mt-3 mb-3'>
              <h4>My Timelogs</h4>
           </div>

           <div className='text-center' style={{minHeight:"100vh"}}>
           <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>StartTime</th>
                    <th>EndTime</th>
                    <th>TotalHours (hr)</th>
                    <th>Status</th>
                    </tr>
                </thead>
            <tbody>
                {
                  timelogs.map((timelog,i)=>{
                      return <tr >
                            <td>{i +1}</td>
                            <td>{new Date(timelog.startTime).toLocaleDateString()}</td>
                            <td>{new Date(timelog.endTime).toLocaleDateString()}</td>
                            <td>{timelog.totalHours}</td>
                            <td>{timelog.status}</td>
 
                      </tr>
                  })
                }
            </tbody>
          </Table>
           </div>
   </div>
  
  </>
}

export default Timelog


