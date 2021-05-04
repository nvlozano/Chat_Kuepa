import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Nav/index';
import { getUsers } from '../../store/actions/userActions';
import Chat from '../Chat/Chat'
import s from '../../styles/chat.module.css'



const HomePage = () => {
    const dispacth = useDispatch()
    const session = useSelector((state) => state);
    const name = session.userLog.name
    const role = session.userLog.role
    console.log(name)
    
    useEffect(() => {
        dispacth(getUsers)
    }, [])


    return (
    <div>
        <>
        <Navigation /> 
        <div className={s.contant}>
        <Chat
            nombre={name}
            role={role}
        />
        <div className={s.cont__iframe}>
          <iframe className={s.frameCont} width="100%" height="100%" src="https://www.youtube.com/embed/I7EiEulDV6c?autoplay=1&modestbranding=1&showinfo=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
        </div>
       
        </div>
        </>
    </div>
    )
}

export default HomePage