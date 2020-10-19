import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../App';
import img from "../../images/animalShelter.png";


const Volunteer = ({ task }) => {

    function get_random_color() 
{
    var r = function () { return Math.floor(Math.random()*256) };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
    }
    const [user,setUser] = useContext(Context)
    const style = {
        position: 'absolute',
        width: '270px',
        height: '80px',
        top:'240px',
        zIndex:'1',
        background: `${get_random_color()}`,
        borderRadius: '0px 0px 10px 10px'
    }
    const handleTarget = (id) => {
        const newUser = { id: id };

        setUser(newUser)
    }

    return (
        <div className="col-md-3 my-2" style={{ position: 'relative' }}>
          
            <Link to='/register' onClick={() => handleTarget(task._id)}  >
                {
                    task.image ? <img style={{ height: '320px', width: '270px' }} src={`data:image/png;base64,${task.image.img}`} alt="" /> :
                    <img  style={{ height: '320px', width: '270px' }} src={require(`../../images/${task.pic}`)} alt="" />
                }
                
                <div  className="description" style={style}>
                    <p ><span  style={{color:'white',fontSize:'20px',marginTop:'20px'}}>{task.title}</span></p>
                </div>
            </Link>
        </div>
    );
};

export default Volunteer;