import React from 'react';

const Task = ({ tasks }) => {
    const btnStyle = {
        width: '100px',
        marginLeft: '100px',
        padding: '8px 15px',
        backgroundColor: '#E3E3E3',
        borderRadius: '5px',
        border:'none'
    }
    console.log(tasks)
    const handleCancel = (id) => {
        fetch(`http://localhost:5000/cancel/${id}`, {
            method:'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
        })
        window.location.reload();
    }
    return (
        <div className="col-md-5 bg-white m-4" style={{ width: '50%' }}>
        <div className="m-3 row justify-content-between">
                {
                    tasks.image ? <img className="col-md-6" src={`data:image/png;base64,${tasks.image.img}`} style={{ height: '175px', width: '200px' }} alt="" /> :
                        <img className="col-md-6" src={require(`../../images/${tasks.pic}`)} style={{ height: '175px', width: '200px' }} alt="" />
                }
               
            <div className="col-md-6 d-flex flex-column ">
                <h4 >{tasks.title}</h4>
                <p>{tasks.date}</p>
                <button type="submit" onClick={()=>handleCancel(tasks._id)} className="align-items-end mt-auto" style={btnStyle}>Cancel</button>
            </div>
        </div>
    </div>
    );
};

export default Task;