import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../../utils/Apiservice';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';
function Report() {

    let [startDate,setStartDate]=useState('')
    let [endDate,setEndDate]=useState('')
    
    let [report,setReport]=useState('')
   
    
    const handleGenerateReport=async(req,res)=>{
        try {
            let res = await AxiosService.post('/timelog/report',{
                startDate,
                endDate
            })
            if(res.status==201){
                setReport(res.data)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return<>
   
     <div className='container'>
        <div className='text-center mt-5 mb-3'>
            <h3>Generate Report</h3>
        </div>

        <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <Form.Group className="mb-3" >
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date"  onChange={(e)=>setStartDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date"  onChange={(e)=>setEndDate(e.target.value)}/>
            </Form.Group>

            <Button className='btns w-100'  onClick={()=>handleGenerateReport()}>
               generate Report
            </Button>
         </div>
         
          <div>
       {report ? (
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 col-sm-12">
            <Card className="shadow-sm  rounded-4 mb-4">
              <Card.Body>
                <Card.Title className="text-center mb-3">Reports</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {report.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {report.email}
                </Card.Text>
                <Card.Text>
                  <strong>TotalWork Hours :</strong> {report.totalHours} hrs
                </Card.Text>

                
              </Card.Body>
                
            </Card>
          </div>
        </div>
      ) : (
        <></>
      )
      }
          </div>
     </div>
    </div>
  </>
}

export default Report