import React, {useEffect} from 'react'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col, Navbar, Nav, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import {logout, getUsers} from '../../store/actions/userActions';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import s from '../../styles/home.module.css'



const Navigation = ({nameUser, role, id}) =>  {
    
    
    const session = useSelector((state) => state);
    const dispacth = useDispatch()
    const userssDis = session && session.users
    const userssLog = session && session.userLog
    const cursosDis = session && session.cursos
    const history = useHistory();

    const logoutP = () => {
        dispacth(logout())
        window.location = '/';
        Cookie.remove('userLoad');
        return
    }

    useEffect(() => {
        dispacth(getUsers)
    }, [])

    return (
        <>
    {!userssLog ?
    
     <Navbar bg="gray-100" variant="light" className={s.navHome}>
    <Container>
     <Navbar.Brand href='#' as={Link} to='/'><div className={s.logo}><img src="http://plataforma.kuepa.com/img/kuepastrap/kuepa-ID-RGB-v04.png" alt="Logo"/></div></Navbar.Brand>
     <Nav className="mr-auto">

     </Nav>
     <Nav inline>
         <Nav.Link href='#' as={Link} to='/register'className={s.color}>Registrarse</Nav.Link>
     </Nav>
     </Container>
    </Navbar>:
        userssLog && userssLog.role === "moderador" ?
        <Navbar bg="gray-100" variant="light" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' as={Link} to='/'><div className={s.logo}><img src="http://plataforma.kuepa.com/img/kuepastrap/kuepa-ID-RGB-v04.png" alt="Logo"/></div></Navbar.Brand>
        <Nav className="mr-auto">


        </Nav>
        <Nav inline>

            <Nav.Link href='#'  className={s.color}> Hola!! {session.userLog.role}</Nav.Link>
            <Nav.Link href='#' as={Link} to='/' onClick={logoutP} className={s.color}> Cerrar Sesion </Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        :
        userssLog && userssLog.role === "user" ?
        <Navbar bg="gray-100" variant="light" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' as={Link} to='/'><div className={s.logo}><img src="http://plataforma.kuepa.com/img/kuepastrap/kuepa-ID-RGB-v04.png" alt="Logo"/></div></Navbar.Brand>
        <Nav className="mr-auto">

        

        </Nav>
        <Nav inline>

            <Nav.Link href='#'  className={s.color}> Hola!! {session.userLog.name}</Nav.Link>
            <Nav.Link href='#' as={Link} to='/' onClick={logoutP} className={s.color}> Cerrar Sesion </Nav.Link>
        </Nav>
        </Container>
        </Navbar>
        :
        <Navbar bg="gray-100" variant="light" className={s.navHome}>
        <Container>
        <Navbar.Brand href='#' as={Link} to='/'><div className={s.logo}><img src="http://plataforma.kuepa.com/img/kuepastrap/kuepa-ID-RGB-v04.png" alt="Logo"/></div></Navbar.Brand>
        <Nav className="mr-auto">

        

        </Nav>
        <Nav inline>
            <Nav.Link href='#' as={Link} to='/'> Iniciar Sesion</Nav.Link>
            <Nav.Link href='#' as={Link} to='/register'>Registrarse</Nav.Link>
        </Nav>
        </Container>
        </Navbar>
    }
   
    
      </>
    )
}


export default Navigation