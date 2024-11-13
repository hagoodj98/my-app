'use client';

import React, {useState} from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation'
import styles from '../styles/home.module.css'
import TextField from '@mui/material/TextField';
import Footer from '../components/footer';
import { Work_Sans, Anton } from "next/font/google";

const antonSC = Anton({
subsets: ['latin'],
display: 'swap',
weight: '400',

})
const worksans =  Work_Sans({
  subsets:['latin'],
  display: 'swap',
})



export default function TextControlsExample() {
    const router = useRouter();
    const [bookInfo, setBookInfo] = useState({
        isbn: "",
        summary: "",
    });
    const [error, setError] = useState("");
    
    const onSubmitForm  = async event => {
        event.preventDefault();
        try {
            const body = bookInfo;
            const response = await axios({
            method:'post',
            url: 'http://localhost:4000/newentry',
            data: {
                isbn: body.isbn,
                summary: body.summary
            },
            //headers: {"Content-Type": "application/json"},
            });
            console.log(response);
            if (response.data === "Entry does not exist, try again") {
              setError(response.data);
              router.push("/findentry")
            }
             else if (response.data === "Entry already exists, try again") {
              setError(response.data);
              router.push("/findentry")
            }
            else {
            router.push('../');
            }
            //console.log(response);
        } catch (err) {
            console.error(err);
        }
      }
   


    function handleChange(event) {
        const { name, value } = event.target;
        setBookInfo((prevBook) => {
          return {
            ...prevBook,
            [name]: value,
          };
        });
        return bookInfo;
      }

    return (
      <main>
        <div className='container d-flex flex-column'>
          <div className={styles.findentrybuttoncontainer}>
            <div className={styles.entrybuttonexit}>
              <Button href='../' variant="outlined">Back To Blog</Button>
            </div>
          </div>
          
          <div className={styles.addentry}>
            <div className={styles.form}>
            <h2 className='m-2'><span className={antonSC.className}>Find Book</span></h2>
            <div className={styles.d}>
              <Form onSubmit={onSubmitForm}>
                <Form.Group  controlId="exampleForm.ControlInput1">
                  {error === "Entry already exists, try again" ? <TextField name="isbn" error onChange={handleChange}  fullWidth helperText={error} value={bookInfo.isbn} required   id="fullWidth" label="Error" variant="outlined" />
                    : 
                    error === "Entry does not exist, try again" ? <TextField error  name="isbn" id="outlined-error-helper-text" fullWidth  onChange={handleChange} value={bookInfo.isbn} required label="Error"  helperText={error}/> 
                    : 
                    <TextField name="isbn" onChange={handleChange} value={bookInfo.isbn} required  fullWidth  id="fullWidth" label="Enter the ISBN" variant="outlined" />
                  }
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as={"textarea"} name="summary" required  onChange={handleChange} placeholder='Enter Summary...' value={bookInfo.summary}  rows={3} />
                </Form.Group>
                <div className='d-flex justify-center'>
                  <Button className={worksans.className} type='submit' variant="outlined">Add Entry</Button>
                </div>
              </Form>
            </div>
            </div>
             
            </div>
        </div>
        <Footer />
      </main>
    );
  }
  // <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Entry does not exist."/>
//  <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Entry already exist."/>

          