'use client';

import React, {useState, Fragment} from "react"
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import axios from "axios";
import styles from '../styles/home.module.css';
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




function EditSummary(props) {

    const [show, setShow] = useState(false);
    const [prevSummary, setNewSummary] = useState(props.entrySummary)
    const handleClose = () => {
        setShow(false) 
        setNewSummary(props.entrySummary);
    }
    
        const handleShow = () => setShow(true);
  
    //update summary
    const updateSummary = async e => {
        e.preventDefault();
        try {
            const body = { prevSummary };
            console.log(body);
            const response= await axios({
                method:'PATCH',
                url: `http://localhost:4000/entry/${props.id}`,
                data : {
                    prevSummary: body.prevSummary
                }
                });

                window.location="/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <Button className={styles.edit} variant="primary" onClick={handleShow}>
                <EditOutlinedIcon />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={styles.modal} closeButton>
                <Modal.Title className={styles.modaltitle}>  <span className={worksans.className}>Update Summary</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label className={worksans.className}>Summary</Form.Label>
                    <Form.Control as="textarea" value={prevSummary} onChange={e => setNewSummary(e.target.value)}  rows={3} />
                    </Form.Group>
                    <Button variant="outlined" type="submit"  className={styles.actionbutton} onClick={e => updateSummary(e)}>
                       <span className={worksans.className}> Update</span>
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
        
    )
}

export default EditSummary;