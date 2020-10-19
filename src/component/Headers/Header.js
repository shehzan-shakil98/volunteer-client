import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '../../App';
import logo from '../../logos/Group 1329.png';
import './Header.css'

const Header = ({ admin }) => {
    const history = useHistory();
    const handleHome = () => {
        history.push('/home')
    }
    
    const handleDonation = () => {
        history.push('/donation')
    }
        
    const handleEvents = () => {
        history.push('/events')
    }
    
    const handleBlog = () => {
        history.push('/blog')
    }
        
    const handleRegister = () => {
        history.push('/register')
    }
    
        const handleAdmin = () => {
            history.push('/admin')
    }
    const [user, setUser] = useContext(Context)
    return (
        <div className="container">
            <Navbar>
                <Navbar.Brand onClick={handleHome}><img style={{height:'60px'}} src={logo} alt=""/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav className="ml-auto nav">
                    <Nav.Link className="text-dark" onClick={handleHome}>Home</Nav.Link>
                    <Nav.Link className="text-dark" onClick={handleDonation}>Donation</Nav.Link>
                    <Nav.Link className="text-dark" onClick={handleEvents}>Events</Nav.Link>
                    <Nav.Link className="text-dark" onClick={handleBlog}>Blog</Nav.Link>
                        {
                            admin&&<>
                            <Nav.Link className="bg-primary text-white rounded" onClick={handleRegister}>Register</Nav.Link>
                            <Nav.Link className="bg-dark text-white rounded" onClick={handleAdmin}>Admin</Nav.Link>
                             </>
                        }
                
                </Nav>
            </Navbar.Collapse>
            </Navbar>

        </div>
    );
};

export default Header;