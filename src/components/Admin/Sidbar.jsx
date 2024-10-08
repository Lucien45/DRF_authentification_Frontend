import React, { useEffect, useState } from 'react';
import { FaBars, FaBook, FaChalkboardTeacher, FaEllipsisV, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../../_services/User.service';

const Sidebar = () => {
    const [dataUser, setDataUser] = useState([]);
    const [status, setStatus] = useState();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const location = useLocation();
    const [reduce, setReduce] = useState(false);

    const reduceSidebar = () => {
        const sidebar = document.getElementById("sidebarFront");
        const logo = document.getElementById("logoS");

        sidebar.classList.toggle("miniSidebar");
        logo.classList.toggle("logoReduce");
    };

    const reduceTab = () => {
        setReduce(true);
    };
    const expandTab = () => {
        setReduce(false);
    };

    useEffect(() => {
        UserService.getUser()
            .then((res) => {
                setDataUser(res.data.user);
                console.log(dataUser);
                if (res.data.user.is_admin) {
                    setStatus('Administrateur');
                } else {
                    setStatus('Staff');
                }
            })
            .catch((error) => {
                window.location.href = '/';
                Utils.errorPage(error.response.data.message);
            });

        if (location.pathname === '/admin') {
            setActiveTab('Dashboard');
        } else if (location.pathname === '/admin/post') {
            setActiveTab('Post');
        } else if (location.pathname === '/admin/tache') {
            setActiveTab('Tache');
        }
    }, [location.pathname]);

    return (
        <div className="sidebar-container" id='sidebarFront'>
            <div className="logo-place">
                <div className={`logo ${reduce ? "logoReduice" : ""}`} id='logoS'>
                    <div className='logo-content'>
                        <Link to='/admin'>
                            <div className="logo_min" id="mini-logo"><img src="../../../public/media/logo.png" alt="logo" /></div>
                        </Link>
                    </div>
                </div>
                <div className="icon-bar">
                    <div className={`${!reduce ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduceSidebar(); reduceTab(); }}><i><FaBars /></i></div>
                    <div className={`${reduce ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduceSidebar(); expandTab(); }}><i><FaBars /></i></div>
                </div>
            </div>
            <div className="profile-sidebar">
                <div className="profile-image">
                    <div className="" id="profile-image">
                        <img 
                            src={dataUser.image ? `http://localhost:8000/${dataUser.image}` : '../../../public/media/userdefault.png'} 
                            alt={dataUser.username || 'Default User'} 
                        />
                    </div>
                </div>
                <div className={`${!reduce ? "profile-information" : "desactiveMaxSidebar"}`}>
                    <div><span className="info-nom">{dataUser.email}</span></div>
                    <div><span className="info-fonction">{status}</span></div>
                </div>
                <div className={`${!reduce ? "profile-parametre" : "desactiveMaxSidebar"}`} id="info-parametre">
                    <i><FaEllipsisV /></i>
                </div>
            </div>
            <div className="navigation">
                <div className="titre"><span id="titre-navigation">Navigation</span></div>

                <Link to="/admin">
                    <li className={`${activeTab === "Dashboard" ? "active" : ""}`} onClick={() => setActiveTab("Dashboard")}>
                        <i className=""><FaTachometerAlt /></i>
                        <span className={`${!reduce ? "" : "desactiveMaxSidebar"}`}>Dashboard</span>
                    </li>
                </Link>
                <Link to="/admin/post">
                    <li className={`${activeTab === "Post" ? "active" : ""}`} onClick={() => setActiveTab("Post")}>
                        <i className=""><FaChalkboardTeacher /></i>
                        <span className={`${!reduce ? "" : "desactiveMaxSidebar"}`}>Posts</span>
                    </li>
                </Link>
                <Link to="/admin/tache">
                    <li className={`${activeTab === "Tache" ? "active" : ""}`} onClick={() => setActiveTab("Tache")}>
                        <i className=""><PiStudentFill /></i>
                        <span className={`${!reduce ? "" : "desactiveMaxSidebar"}`}>Tache</span>
                    </li>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
