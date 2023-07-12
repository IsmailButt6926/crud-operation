import React,{useState, useEffect} from 'react'
import Select from "react-select";
import axios from 'axios';
import { useQuery } from 'react-query';

const NewPage = () => {

    const [selectedClient, setSelectedClient] = useState(null)

    const fetchStudents = async () => {
      try {
         const response = await axios.get("http://localhost:3001/students")
      return response
      } catch (error) {
        console.log(error)
      }
    }

    const {data,isLoading,isError} = useQuery(["fetchStudents"], fetchStudents,{
      onSuccess(data){
        const client =data?.data?.[0]
        setSelectedClient({
          ...selectedClient,
          label:client?.name,
          value:client?.id
        })
      }
    })
   
  return (

    <div className="createClientHeader">
      <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: 'grey',
              borderRadius: '14px',
              minWidth: '200px',
              padding: '2.5px'
            }),
                
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#CDCDCD',
              primary: '#CDCDCD',
            },
          })}
          options={data?.data?.map((item,index) => {
            return {
              ...item,
              label:item?.name,
              value:item?.id
            }
          })}
          value={selectedClient}
          onChange={(selected) => setSelectedClient(selected)}
        />
        </div>
  )
}

export default NewPage