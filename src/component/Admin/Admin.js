import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../logos/Group 1329.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserCog,faTrash } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';
import VulonteerList from '../VulonteerList/VulonteerList';
import AddEvent from '../AddEvent/AddEvent';
import { useLoading,ThreeDots} from '@agney/react-loading';

const Admin = () => {
    const [adminAddEvent, setAdminAddEvent] = useState({
        admin: true,
        addEvents:false,
    })
    const handleAdmin = () => {
        setAdminAddEvent({
            admin: true,
            addEvents:false
        })
    };
    const handleAddEvent = () => {
        setAdminAddEvent({
            admin: false,
            addEvents:true,
         })
    };
    const [volunteer, setVolunteer] = useState([]);
    const[loader,setLoader] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/allVolunteer')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLoader(false);
                    setVolunteer(data)
                }
        })
    }, [volunteer])
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <ThreeDots width="50" />,
      });
    
    return (
        <div className="row">
            <div style={{margin:'50px',width:'15%'}}>
                <Link to="/home"><img style={{ height: '60px' }} src={logo} alt="" /></Link>
                <div className="row" style={{marginLeft:'20px',marginTop:'50px'}}>
                    <span onClick={handleAdmin} style={{color:'black'}} className="active"><FontAwesomeIcon icon={faUserCog}></FontAwesomeIcon> Volunteer register list</span>
                    <span onClick={handleAddEvent} style={{color:'black'}}className="admin"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Event</span>
                </div>
                
            </div>
            <div style={{width:'78%'}}>
                <h3 style={{ marginTop: '50px' }}>Volunteer register list</h3>
                <div style={{ background: '#F8FAFC', height: '100vh', width: '100%', paddingTop: '50px' }}>
                    {
                        loader &&     <section {...containerProps}>
                        {indicatorEl} 
                      </section>
                    }
                    {
                        (adminAddEvent.admin && loader===false) && <>
                            <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>EmailId</th>
                                    <th>Registration Date</th>
                                    <th>Volunteer List</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                                {
                                    volunteer.map(volunteer => <VulonteerList value={volunteer}></VulonteerList>)
                                }
                
                            </table>
                            
                        </>
                    }
                    {
                        adminAddEvent.addEvents&&<AddEvent></AddEvent>
                    }
                </div>
            
            </div>
            
        </div>
    );
};

export default Admin;