import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css"
const Home = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState();

  const [studentvalue, setStudentValue] = useState({
    name: "",
    email: "",
  });

  const [totalPages, setTotalPages] = useState(0)

  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
 

  //new
  const [count, setCount] = useState();
  useEffect(() => {
    setCount(count + 1);
  });
  //get api
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudentData(response.data);
      setTotalPages(Math.ceil(response.length / 10))
    } catch (error) {}
  };

  console.log("totalPages", totalPages);
  // post api
  //idr state ko hmm kisi b name sy catch kr lain gy
  const postData = async (data) => {
    try {
      //or yaha py sath ma data bhj dain gy
      await axios.post(`http://localhost:3001/students`, data);
    } catch (error) {
      console.log("error", error);
    }
  };
  //delete api
  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/students/${id}`
      );
    } catch (error) {}
  };
  //ye useEffect tb chaly ga jab hmre component first time render ho ga
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChnage = (e) => {
    setStudentValue({
      ...studentvalue,
      [e.target.name]: e.target.value,
    });
  };

  const isDataFilled = studentvalue.name && studentvalue.email ? true : false;

  const handleSubmit = () => {
    //name or email destructure kr li apni state ma sy
    let { name, email } = studentvalue;
    //api function ko call kia or usky sth state means data ko bhj dia hy
    postData(studentvalue);
  };

  const handleView = (id) => {
    // navigate("/view/:id");
    navigate(`/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    deleteStudent(id);
    fetchStudents()
  };

  const handleNext = () => {
    navigate("/Newpage")
  }

 
  return (
    <>
      <h1>React crud with api call</h1>

      <h2>Add Students</h2>

      <Form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={studentvalue?.name}
          onChange={handleChnage}
        ></input>
        <br />
        <br />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={studentvalue?.email}
          onChange={handleChnage}
        ></input>
        <br />
        <br />

        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={!isDataFilled}>
          Submit
        </Button>
      </Form>
      <br />

      <h2>Student List</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {studentData?.map((item, index) => {
          return (
            <>
              <tbody key={index}>
                <tr>
                  <td>{item?.id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <Button variant="primary" onClick={() => handleView(item.id)}>
                    View
                  </Button>
                  <Button variant="warning" onClick={() => handleEdit(item.id)}>
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </tr>
              </tbody>
            </>
          );
        })}
      </Table>

      <Button variant="primary" onClick={handleNext}>Next page</Button>

      
    </>
  );
};

export default Home;
