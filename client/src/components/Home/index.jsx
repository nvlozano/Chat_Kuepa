import React from 'react'
import s from '../../styles/home.module.css'
import Navigation from '../Nav/index';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Login from '../Login/index';



const Home = () =>  {
    const history = useHistory();
    return (
        <>
        <Navigation className={s.navHome}/>
        <div className={s.bgHome} >
            <div className={s.conten___Home}>
                <Login/>
             
            </div>
        </div>
        </>
    )
}


export default Home