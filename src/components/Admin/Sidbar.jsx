import React, { useEffect, useState } from 'react';
import { FaBars, FaBook, FaChalkboardTeacher, FaEllipsisV, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { MdMeetingRoom } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../../_services/User.service';
const Sidbar = () => {
    const[dataUser, setDataUser] = useState([]);
    const[status, setStatus] = useState();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const location = useLocation();
    const [reduice, setReduice] = useState(false);

    const reduiceSidebar = () => {
        const sidebarSolarma =  document.getElementById("sidebarFront");
        const logoS =  document.getElementById("logoS");

        sidebarSolarma.classList.toggle("miniSidebar");
        logoS.classList.toggle("logoReduice");
    }

    const reduiceTab = () => {
        setReduice(true)
    }
    const agrandirTab = () => {
        setReduice(false)
    }
    useEffect(() => {
        UserService.getUser()
        .then(function(res) {
          setDataUser(res.data.user);
          console.log(res.data);
          if (res.data.user.is_admin == true) {
            setStatus('Administrateur')
          } else {
            setStatus('Staff')
          }
        })
        .catch(function(error) {
          window.location.href='/'
          Utils.errorPage(error.response.data.message)
        });
        if(location.pathname === '/admin'){
            setActiveTab('Dashboard')
        }else if (location.pathname === '/admin/prof'){
            setActiveTab('Prof')
        }else if (location.pathname === '/admin/etudiant'){
            setActiveTab('Etudiant')
        }else if (location.pathname === '/admin/classe'){
            setActiveTab('Classe')
        }else if (location.pathname === '/admin/matiere'){
            setActiveTab('Matiere')
        }
    }, [location.pathname])
  return (
    <div className='sidebar-container'>
            <div className='logo-place'>
               <div className='logo' id='logoS'>
                    <div className='logo_min' id='mini-logo'><img src='../media/logo.png' alt='logo'/></div>
               </div>
               <div className='icon-bar'>
                    <div className={`${!reduice ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduiceSidebar(); reduiceTab(); }}><i><FaBars/></i></div>
                    <div className={`${reduice ? "reduce_sidebar" : "desactiveMaxSidebar"}`} onClick={() => { reduiceSidebar(); agrandirTab(); }}><i><FaBars/></i></div>
               </div>
            </div>
            <div className='profile-sidebar'>
                <div className='profile-image'>
                    <div className='' id='profile-image'><img src='../media/user.png' alt='profile'/></div>
                </div>
                <div className={`${!reduice ? "profile-information" : "desactiveMaxSidebar"}`}>
                    <div><span className='info-nom'>{dataUser.email}</span></div>
                    <div><span className='info-fonction'>{status}</span></div>
                </div>
                <div className={`${!reduice ? "profile-parametre" : "desactiveMaxSidebar"}`} id='info-parametre'>
                    <i><FaEllipsisV/></i>
                </div>
            </div>
            <div className='navigation'>
                <div className='titre'><span id='titre-navigation'>Navigation</span></div>
                
                <Link to='/admin'>
                    <li className={`${activeTab === "Dashboard" ? "active" : ""}`} onClick={() => setActiveTab("Dashboard")}>
                        <i className=''><FaTachometerAlt/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Dashboard</span>
                    </li>
                </Link>
                <Link to='#'>
                    <li className={`${activeTab === "Prof" ? "active" : ""}`} onClick={() => setActiveTab("Prof")}>
                        <i className=''><FaChalkboardTeacher/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Professeur</span>
                    </li>
                </Link>
                <Link to='#'>
                    <li className={`${activeTab === "Etudiant" ? "active" : ""}`} onClick={() => setActiveTab("Etudiant")} >
                        <i className=''><PiStudentFill/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Etudiant</span>
                    </li>
                </Link>
                <Link to='#'>
                    <li className={`${activeTab === "Classe" ? "active" : ""}`} onClick={() => setActiveTab("Classe")}>
                        <i className=''><MdMeetingRoom/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Classe</span>
                    </li>
                </Link>
                <Link to='#'>
                    <li className={`${activeTab === "Matiere" ? "active" : ""}`} onClick={() => setActiveTab("Matiere")}>
                        <i className=''><FaBook/></i>
                        <span className={`${!reduice ? "" : "desactiveMaxSidebar"}`}>Matiere</span>
                    </li>
                </Link>  
            </div>
        </div>
  )
}

export default Sidbar;
