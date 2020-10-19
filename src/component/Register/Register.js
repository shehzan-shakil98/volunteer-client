import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Context } from '../../App';
import logo from '../../logos/Group 1329.png';
import './Register.css';

const Register = () => {
    const [user, setUser] = useContext(Context)
    const [organization,setOrganization] = useState()
    const history = useHistory()
    const { register, handleSubmit, watch, errors } = useForm();


    useEffect(() => {
        fetch(`http://localhost:5000/getVolunteerDetail/${user.id}`)
        .then(res => res.json())
            .then(data => {
                let { title, pic, image } = data;
                if (image===undefined) {
                     image = false
                }
                
                let newData = {...user,title:title,pic:pic,image:image}
                console.log(newData);
            setUser(newData);
    })
    }, [])
    
    const onSubmit = data => {
        const volunteerDetails = { ...user, register: data, date: data.date, description: data.description }
        console.log(volunteerDetails)
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(volunteerDetails)
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            history.push('/eventTask')
    }
    
    return (
        <div style={{background: '#F8FAFC',paddingBottom:'50px'}}>
            <img style={{ height: '60px',margin:'50px 0' }} src={logo} alt="" />
            <form onSubmit={handleSubmit(onSubmit)} id="register">
                <h3 style={{ lineHeight: '29px',marginBottom:'50px'}}>Register as a Volunteer</h3>
                <input type="text" name="name" placeholder="full name" id="name" value={user.name}/><br/>
                <input type="email" name="email" placeholder="Email" id="email" value={user.email}/><br/>
                <input type="date" name="date" placeholder="Date" id="date" ref={register({ required: true })}/><br/>
                {errors.date && <span>This field is required</span>}
                <input type="text" require name="description" placeholder="Description" id="description"/><br/>
                {errors.description && <span>This field is required</span>}
                <input type="text" require name="organization" ref={register({ required: true })} placeholder="Organize books at the library."  /><br/>
                {errors.organization && <span>This field is required</span>}
                <button type="submit"  className="bg-primary text-white">Register</button>
            </form>
        </div>
    );
};

export default Register;