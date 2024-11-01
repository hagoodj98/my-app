'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Button from '@mui/material/Button';
import axios from "axios";
import Note from '../../components/Notes';
import Input from '../../components/Input'
import TextField from '@mui/material/TextField';


 export default function AboutEntry(context) {
    const params = context.searchParams;
    //console.log(params);
    //console.log(params.title);
    const amazonLink = `https://www.amazon.com/dp/${params.isbn}/?tag=internetarchi-20`
    const currentEntry = params.id;
    
    const [note, setNote] = useState({
        record: "",
        id: currentEntry
    });
    const [notes, setNotes] = useState([]);
      
        const entriesNotesAPI = async () => {
          try {
            const response = await axios.get("http://localhost:4000/aboutthisentry");
            //console.log(response.data.entries);
            setNotes(response.data.entries);
          } catch (error) {
            console.log(error);
            
          }
        }
        useEffect(() => {
            entriesNotesAPI();
          },[])
        const findAllNotes = notes.filter((note) => {
            return note.entry_id == currentEntry;
            })
        
         const submitForm = async (event) => {
           // event.preventDefault();

            const body = handleChangeNote(event)
            console.log("submitted" );
            console.log(body);
            try {
                const response = await axios({
                    method:'post',
                    url: 'http://localhost:4000/addnote',
                    data: {
                        record: body.record,
                        id: body.id
                    },
                    });
                    console.log(response);
            } catch (error) {
                

            }
        }
        
        function handleChangeNote(event) {
            const {name, value}= event.target;
            

            setNote((prevRecord) => {
              return {
                ...prevRecord,
                [name]:value
              };
            });
            return note;
          }
          return(
            <h1>welcome</h1>
          )
/*
    return (
        <div>
            <div>
                <div>
                    <img src={params.imagelarge} alt="" />
                </div>
                <div>
                    <h1>{params.title}</h1>
                    <h4>Summary</h4>
                    <p>{params.summary}</p>
                    <h4>Publish Date</h4>
                    <p>{params.publishdate}</p>
                    <h4>Subjects</h4>
                    <p>{params.subjects}</p>
                    <Link href='/../'><Button variant="outlined">Back</Button></Link>
                    <Link href={amazonLink}><Button variant="outlined">Amazon</Button></Link>
                </div>
            </div>
            <div>
            {findAllNotes.map((note, index) => {
            return(
                <Note
                    key= {index}
                    currentid= {note.note_id}
                    id={note.entry_id}
                    note={note.note_submission}
                />
            )
            })}
            </div>
            <div>
                <form  onSubmit={submitForm}>
                    <div>
                        <TextField type="text" onChange={handleChangeNote} name="record" value={note.record} placeholder="Enter Notes..." />
                    </div>
                    <div>
                        <Button type="submit" variant="outlined">Primary</Button>
                    </div>
                </form>
            </div>
        </div>
    )
*/
}

