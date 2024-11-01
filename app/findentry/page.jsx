'use client';

import React, {useState} from 'react'
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/navigation'

export default function TextControlsExample() {
    const router = useRouter();
    const [bookInfo, setBookInfo] = useState({
        isbn: "",
        summary: "",
    });
    //console.log(bookInfo.isbn);
    
    
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
            //console.log(response);
            router.push('../');
        } catch (error) {
         console.log(error);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
     
        //console.log(name);
       // console.log(value);
        
   
        setBookInfo((prevBook) => {
          return {
            ...prevBook,
            [name]: value,
          };
        });
        return bookInfo;
      }

    return (
      <form onSubmit={onSubmitForm}>
          <input type="text"  name="isbn" onChange={handleChange} value={bookInfo.isbn} placeholder="name@example.com" />
          <textarea  name="summary"  onChange={handleChange} value={bookInfo.summary}  rows={3} />
        <Button  type='submit' variant="primary">Secondary</Button>
      </form>
    );
  }
  
