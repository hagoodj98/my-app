'use client';
import React, {useState, useEffect, Fragment} from "react"
import Image from "next/image";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import EditSummary from './components/EditSummary';






export default function Home() {


const [entries, setEntries] = useState([]);


  const getEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/`);
      console.log(response);
      
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEntries();
},[]);



  return ( 
      <div>
        <div>
          <h4>Sort By:</h4>
          <Button>Title</Button>
          <Button>Latest</Button>
          <Button>Oldest</Button>
          <Button>Most Popular</Button>
        </div>
        <h1>Jaiquez Book Blog</h1>
        {entries.map((entry, index) => (
          <div key={index}>

            <img src={entry.image_large_url} className="img-fluid" alt="" />
            <DeleteIcon />
            <h1>{entry.title}</h1>
            <p>{entry.summary} <EditSummary /></p>
            <h1>{entry.rating_average}</h1>
          
            <Link href={`/entry/${entry.id}`} color="inherit"><Button variant="outlined">Read More</Button></Link>
          
          </div>  
        ))}
  
      </div>
  );
}
