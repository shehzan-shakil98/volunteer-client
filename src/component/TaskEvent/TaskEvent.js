import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import Header from '../Headers/Header';
import { useLoading,SpinningCircles } from '@agney/react-loading';
import Task from '../Task/Task';

const TaskEvent = () => {

    const[user, setUser ] = useContext(Context)
    const [volunteerDetail, setVolunteerDetail] = useState([]);
    const [loader, setLoader] = useState(true);
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <SpinningCircles width="50" />,
      });
    useEffect(() => {
        fetch('http://localhost:5000/eventTask?email=' + sessionStorage.getItem('email'))
        .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    setLoader(false);
            setVolunteerDetail(data)
           }
        })
    }, [])
    console.log(volunteerDetail)

    return (
        <div style={{background: '#F8FAFC',height:'100%'}}>
            <div className="container">
                <Header></Header>
                <div className="row justify-content-center">
                    {
                        loader &&    <section {...containerProps}>
                        {indicatorEl} 
                      </section>
                    }
                {
                        volunteerDetail.map(tasks => <Task tasks={tasks}></Task>)
            }
                </div>
         </div>
        </div>
    );
};

export default TaskEvent;