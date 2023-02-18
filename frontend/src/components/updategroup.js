import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
//import {Search, Trash, Pencil} from 'react-bootstrap-icons' ;
import * as Icon from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  


export const UpdateGroup = (props) => {


    return (
        <Modal show={props.show} fullscreen={props.fullscreen} onHide={props.onHide} backdrop='static' keyboard='false'>
        <Modal.Header closeButton>
          <Modal.Title>{props.title ? props.title : 'Title'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handle}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSave}>
            {props.editMode ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}