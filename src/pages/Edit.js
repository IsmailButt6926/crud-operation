import React, { useEffect,useState,useRef } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams,useNavigate } from 'react-router-dom';
import axios from "axios"
const Edit = () => {
  const params = useParams()
  const studentId = params.id
  const navigate = useNavigate()
//input State
  const [singleStudent,setSingleStudent]= useState({
    id:"",
    name:"",
    email:""
  })

  //get single call through id
  const fetchSingleStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${studentId}`)
      setSingleStudent(response.data)
    } catch (error) {
      console.log("error",error)
    }
  }
  useEffect(()=>{
    fetchSingleStudents()
  },[])

  //put call to update student
  //handleEdit func sy hmm data bhj rhy hain or upar ksi b name sy catch kr lain gy
  const UpdateStudent = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3001/students/${studentId}`,data)
    } catch (error) {
      
    }
   
  }

  const handleChange = (e) => {
    setSingleStudent({
      ...singleStudent,
      [e.target.name]:e.target.value
  })
  console.log("first",singleStudent)
  }

  const handleEdit = () => {
    //data destrucutre kr rhy hain jo hmm ny bhjna hy
    // let {name,email} = singleStudent
    UpdateStudent(singleStudent)
    navigate("/")
  }
  
  return (
    <>
    <h2>Edit Student</h2>
    <Form>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control type="text" placeholder="id" Value={singleStudent?.id} disabled/>
    </Form.Group>


    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control type="text" placeholder="Name" name="name" Value={singleStudent?.name} onChange={handleChange}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Email" name="email" Value={singleStudent?.email} onChange={handleChange}/>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={handleEdit}>
      Edit Student
    </Button>
  </Form>
  </>
  )
}

export default Edit