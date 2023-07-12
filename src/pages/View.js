import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

const View = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  console.log("Params id", id);

  const [singleStudent, setSingleStudent] = useState({
    name:"",
    email:""
  });

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${id}`);
      setSingleStudent(response.data);
    } catch (error) {

    }
  };
  console.log("Single Data", singleStudent);
  useEffect(() => {
    fetchStudent();
  }, []);
  return (
    <div>
      <h2>Student Details</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th> Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{singleStudent?.id}</td>
            <td>{singleStudent?.name}</td>
            <td>{singleStudent?.email}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => navigate("/") }>Back to home</Button>
    </div>
  );
};

export default View;
