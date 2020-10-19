import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './AddEvent.css';
import { useLoading,SpinningCircles, } from '@agney/react-loading';

const AddEvent = () => {
    const history = useHistory();
    const[loader,setLoader] = useState(false)
    const addEventStyle = {
        width: '95%',
        margin: '0 auto',
        backgroundColor: 'white',
        boxSizing: 'border-box',
    }
    
    const [file,setFile] = useState(null)
    const handleChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <SpinningCircles width="50" />,
      });
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        setLoader(true);
        console.log(data.date)
        const formData = new FormData()
        formData.append('files', file)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('date', data.date)
      
        fetch('http://localhost:5000/newService', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setLoader(false);
                history.push('/')
          }
        })
    };
    return (
        <>
            {
                loader ? <section {...containerProps}>
                    {indicatorEl}
                </section> :
                    <form onSubmit={handleSubmit(onSubmit)} style={addEventStyle} id="addEvent" className="row justify-content-between">
            
                        <div className="col-md-5">
                            <label for="title">Event Title</label>
                            <input type="text" name="title" id="title" ref={register({ required: true })} placeholder="Event title" />
                            <label for="description">Event Description</label>
                            <input type="text" name="description" ref={register({ required: true })} id="description" placeholder="Event Description" />
                        </div>
                        <div className="col-md-5">
                            <label for="date">Event Date</label>
                            <input type="date" name="date" ref={register({ required: true })} id="date" placeholder="Event date" />
                            <label for="img">Banner</label>
                            <input onChange={handleChange} style={{ border: '1px solid lightgray', }} type="file" ref={register({ required: true })} id="img" name="img" accept="image/*" />
                            <button style={{ border: "none", borderRadius: '5px', padding: '5px 15px' }} className="bg-primary text-white" type="submit">Submit</button>
                        </div>
                    </form>
            }
        </>
    );
};

export default AddEvent;