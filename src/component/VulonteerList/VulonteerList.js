import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const VulonteerList = ({ value }) => {

    const location = useHistory();
    const trash = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method:'DELETE'
        })
            .then(res => res.json())
            .then(data => {
        })
        window.location.reload();
    }
    return (
        <>

            <tbody>
                <tr>
                    <tbody>{value.name}</tbody>
                    <td>{value.email}</td>
                    <td>{value.date}</td>
                    <td>{value.title}</td>
                    <td onClick={()=>trash(value._id)}><FontAwesomeIcon style={{color:'red'}} icon={faTrash}></FontAwesomeIcon></td>
                </tr>
            </tbody>
        </>
    );
};

export default VulonteerList;