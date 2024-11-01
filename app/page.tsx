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
import AddIcon from '@mui/icons-material/Add';
import Footer from './components/footer';

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
          <h3 className="mx-2">Sort By:</h3>
          <div className="d-flex gap-2">
            <Button variant="text">Title</Button>
            <Button variant="text">Latest</Button>
            <Button variant="text">Oldest</Button>
            <Button variant="text">Most Popular</Button>
          </div>
        </div>
        <div className={styles.header}>
          <h1 className="text-center">Jaiquez Book Blog</h1>
        </div>
        {entries.map((entry, index) => (
          <div  key={index}>
            <div className="container">
            
              <div className={styles.entry}> 
                <div className="d-flex justify-start  justify-content-md-end">
                  <IconButton className={styles.delete} aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <div className=" d-flex flex-column gap-3 flex-md-row">
                  <div className={styles.div}>
                    <div className="d-flex flex-column align-items-center">
                      <img src={entry.image_large_url} className="img-fluid" alt="" />
                      <div className="mt-3">
                        <h1>{entry.rating_average}<sup>/ 5 <sup><StarIcon className={styles.star}/></sup></sup></h1>
                      </div>
                    </div>
                  </div>
                  <div className={styles.div}>
                    <div className=" p-3">
                      <h2 className={styles.h2}>{entry.title}</h2>
                      <p>{entry.summary} <EditSummary entrySummary={entry.summary} /></p>
                      <p>Started on: <span className={styles.time}>{entry.entry_created}</span></p>
                      <Link href={`/entry/${entry.id}`} color="inherit"><Button className={styles.readmore} variant="outlined">Read More</Button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        ))}
        <div className="d-flex justify-center p-2">
          <Link href="/findentry"><Button className={styles.add}><AddIcon fontSize="large" /></Button></Link>
        </div>
        <Footer />
      </div>
  );
}
