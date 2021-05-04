import React, {useState, useEffect} from 'react'
import { Card, Button, Form, Container, Col, Row } from 'react-bootstrap';
import { login, getUsers } from '../../store/actions/userActions'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Spinner} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../../styles/login.module.css';
import swal from 'sweetalert'



const Login = () =>  {
    const [values, setValues] = useState({
        email: '',
        password: ''
        })
    const [loading, setLoading] = useState(false)
    const dispacth = useDispatch()
    const history = useHistory();
    const session = useSelector((state) => state);
    const userLog = session && session.userLog
    

    const handleChange = function(e){
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const susses = (log, role)=>{
        if(log){
            if(role === 'admin'){
                return history.push('/userPage');
            }
            return history.push('/userPage');
        }else{
            swal({
                title:"Error al iniciar session",
                text:'Verifica tu usuario o tu contraseña',
                icon: "error"
            })
            return history.push('/');
        }
    }

    console.log(session)

    const handlerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setTimeout(async() => {
            setLoading(false)
            await dispacth(login(values, susses))
        }, 2000);
    }

    useEffect(() => {
        dispacth(getUsers)
    }, [])
    return (
        <div>
            
            
            <Container className={s.cont__form___Princ}>
            <Form onSubmit={handlerSubmit} className={s.cont__form}>
            <div className={s.IconUser}>
            <i class="fas fa-chalkboard-teacher"></i>
            </div>            
            <h2 className={s.title}>Iniciar Sesion</h2>            
            <Form.Group controlId="formBasicEmail">
                <Form.Label className={s.label}>Email</Form.Label>
                <Form.Control className={s.input} type="email" placeholder="Ingresar Correo" name="email" onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label className={s.label}>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresar Contraseña" name="password" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recordarme" />
            </Form.Group>
            <Button className={s.button} type="submit">
                 {loading ? <Spinner color="ligth"/> : "Enviar"} 
            </Button>
            <p onClick={() => history.push('/register')} className={s.parrLog__Reg}>¿ No tienes cuenta ? </p>
            </Form>
            </Container>
        </div>
    )
}


export default Login