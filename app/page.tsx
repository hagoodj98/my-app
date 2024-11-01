'use client';
import React, {useState, useEffect, Fragment} from "react"
import Image from "next/image";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import EditSummary from './components/EditSummary';
import styles from './styles/home.module.css';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';



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
        <div className={styles.sortnav}>
          <h3>Sort By:</h3>
          <div className="d-flex gap-2">
            <Button variant="outlined">Title</Button>
            <Button variant="outlined">Latest</Button>
            <Button variant="outlined">Oldest</Button>
            <Button variant="outlined">Most Popular</Button>
          </div>
        </div>
        <div className={styles.header}>
          <h1 className="text-center">Jaiquez Book Blog</h1>
        </div>
        {entries.map((entry, index) => (
          <div  key={index}>
            <div className="container">
              <div className="d-flex justify-start  justify-content-md-end">
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>
              <div className=" d-flex flex-column gap-3 flex-md-row">
                <div className={styles.div}>
                  <div className="d-flex flex-column align-items-center">
                    <img src={entry.image_large_url} className="img-fluid" alt="" />
                    <div className="mt-3">
                      <h1>{entry.rating_average}<sup>/ 5 <sup><StarIcon /></sup></sup></h1>
                    </div>
                  </div>
                </div>
                <div className={styles.div}>
                  <h1>{entry.title}</h1>
                  <p>{entry.summary} <EditSummary /></p>
                  <Link href={`/entry/${entry.id}`} color="inherit"><Button variant="outlined">Read More</Button></Link>
                </div>
              </div>
            </div>
          </div>  
        ))}
  
      </div>
  );
}
