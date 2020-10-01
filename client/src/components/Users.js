import React,{useState, useEffect} from "react";
import axios from "axios";
import DataTable, { createTheme } from 'react-data-table-component';

export default function Users(props){

    const access_token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:3000/api/users", {
            headers: {
              'Authorization': `${access_token}`
            }})
            .then(res =>{
                setUsers(res.data);
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
    },[])

    const [users, setUsers] = useState([])
    const columns = [
        {
            name: 'Name',
            selector: 'Username',
            sortable: true,
          },
          {
            name: 'Department',
            selector: 'Department',
            sortable: true,
            right: true,
          },
    ];
    return(
        <div>
            
            <DataTable
                title="User Database"
                columns={columns}
                data = {users}
            />
        </div>
    )
}

