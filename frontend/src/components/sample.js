import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
//import {Search, Trash, Pencil} from 'react-bootstrap-icons' ;
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  

// Define the Login function.
export const Sample = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
      <div className="container ps-2 border m-3">
        <h1>My First Bootstrap Page</h1>
        <p>This is some text.</p>
      </div>
      <div className="container-fluid py-1 bg-primary text-white">
        <h1>My First Bootstrap Page</h1>
        <p>This is some text.</p>
      </div>
      <div className="container" dir="rtl">
        به سوی آزادی
      </div>
      <div className="container">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard='true'>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2 bg-danger my-2">1</div>
          <div className="col-2 bg-primary my-3">2</div>
          <div className="col-2 bg-danger my-4">3</div>
          <div className="col-6 bg-primary my-5">4</div>
        </div>
        <div className="row">
          <div className="col-4 bg-danger">5</div>
          <div className="col-8 bg-primary">6</div>
        </div>
      </div>
    </>
  );
};
