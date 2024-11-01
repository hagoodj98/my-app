"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from '@mui/material/Button';
import Link from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Fab from '@mui/material/Fab';
import NoteField from '../../components/NoteField';
import UpdateNote from '../../components/UpdateNote';
import AddIcon from '@mui/icons-material/Add';
import styles from '../../styles/home.module.css'
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';


export default function EntryID () {
    const params = useParams();

    const currentEntry = params.id

    const [specifedEntry, setSpecified] = useState([]);

    const[notes, setNotes] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };
    //console.log(params.id +);

    
    const entryIdAPI = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/aboutentry/${currentEntry}`);
        setNotes(response.data);
        } catch (error) {
          console.log(error);
        }
      }
  
      const specified = async ()=> {
        try {
            const result = await axios.get(`http://localhost:4000/entry/${currentEntry}`);
            setSpecified(result.data);
        } catch (error) {
            console.error(error);
        }
      }
      const deleteNoteAPI = async (id) => {
        console.log(id + "note to delete");
       
         try {
             const deleteNote = await axios({
                 method:'delete',
                 url: `http://localhost:4000/aboutentry/${id}`,
                 });
                 setNotes(notes.filter(note => note.note_id !== id));
         } catch (error) {
           console.log(error);
           
         }
       }
        useEffect(() => {
            specified();
            entryIdAPI();
        },[notes]);


        const theme = createTheme({
            palette: {
              ochre: {
                main: '#E3D026',
                light: '#E9DB5D',
                dark: '#000000',
                contrastText: '#242105',
              },
            },
          });
        return (
    <main>
         <h3 className={styles.header}>AboutThisEntry__</h3>
        <div className="container">
            <div>
              <div>
                {specifedEntry.map((entry, index) => (
                    <div className=' d-flex gap-3 justify-around flex-column p-3 flex-md-row ' key={index}>
                        <div className={styles.aboutimg}>
                            <div className={styles.aboutimg}>
                                <img src={entry.image_large_url} className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className={styles.div}>
                            <div className={styles.aboutentry}>
                                <h2 className="mb-4">{entry.title} | {entry.authors}</h2>
                                <Accordion>
                                    <AccordionSummary  className={styles.accordion}  expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                                        <h5>Published On</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>{entry.publish_date}</p>
                                    </AccordionDetails>
                                </Accordion>    
                                <Accordion>
                                    <AccordionSummary className={styles.accordion} expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                                        <h5>Summary</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>{entry.summary}</p>
                                    </AccordionDetails>
                                </Accordion>        
                                <Accordion>
                                    <AccordionSummary  className={styles.accordion}  expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                                        <h5>Subjects</h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>{entry.subjects}</p>
                                    </AccordionDetails>
                                </Accordion> 
                                <div className="d-flex gap-3 mt-3">
                                    <Link href={"../../"}><Button className={styles.actionbutton} variant="outlined">Back To Blog</Button></Link>
                                    <Link href={`https://www.amazon.com/dp/${entry.isbn}/?tag=internetarchi-20`}><Button className={styles.actionbutton} variant="outlined">Amazon</Button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                  </div>
            </div>
            <hr className={styles.hr}/>
            <div className="p-2">
                <h2>My Notes</h2>
                {notes.map((note, index) => (
                    <div className="d-flex" key={index}>
                        <div>
                            <IconButton className={styles.delete}  onClick={() => deleteNoteAPI(note.note_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <div>
                            <p>{  note.note_submission}</p>
                        </div>
                        <div>
                            <UpdateNote note={note.note_submission} id={note.note_id}/>
                        </div>
                    </div>

                ))}
            </div>
            <div>
                <NoteField   id ={params.id}/>
            </div>
        </div>
        </main>
    )
}


