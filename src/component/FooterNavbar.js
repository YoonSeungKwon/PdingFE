import Home from '../img/navbar/Home.png';
import PressedHome from '../img/navbar/PressedHome.png';
import Pding from '../img/navbar/Pding.png';
import PressedPding from '../img/navbar/PressedPding.png';
import Alarm from '../img/navbar/Alarm.png';
import PressedAlarm from '../img/navbar/PressedAlarm.png';
import Mine from '../img/navbar/Mine.png';
import PressedMine from '../img/navbar/PressedMine.png';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FooterNavbar = () => {
    const [home, setHome] = useState(false);
    const [pding, setPding] = useState(false);
    const [alarm, setAlarm] = useState(false);
    const [mine, setMine] = useState(false);
    const navigate = useNavigate();

    const handleHome = () =>{
        setHome(true);
        setPding(false);
        setAlarm(false);
        setMine(false);
        navigate('/');
    }

    const handlePding = () =>{
        setHome(false);
        setPding(true);
        setAlarm(false);
        setMine(false);
        navigate('/');
    }
    const handleAlarm = (email, oauth) =>{
        setHome(false);
        setPding(false);
        setAlarm(true);
        setMine(false);
        navigate('/basket/'+email, {state:[email,oauth]})
    }
    const handleMine = () =>{
        setHome(false);
        setPding(false);
        setAlarm(false);
        setMine(true);
        navigate('/');
    }

  return (
    <footer style={{ height:'8%', backgroundColor:'white'}}>
            <div className='icons' onClick={handleHome}>
                <img src={home? PressedHome : Home }alt="icon" style={{width:'25%'}}/>
                <p style={home ? { fontWeight:'bold' } : { color: 'black' }}>
                    홈
                </p>
            </div>
            <div className='icons' onClick={handlePding}>
                <img src={pding? PressedPding : Pding }alt="icon"style={{width:'25%'}}/>
                <p style={pding ? { fontWeight:'bold' } : { color: 'black' }}>
                    친구
                </p>
            </div>
            <div className='icons' onClick={handleAlarm}>
                <img src={alarm? PressedAlarm : Alarm }alt="icon"style={{width:'25%'}}/>
                <p style={alarm ? { fontWeight:'bold' } : { color: 'black' }}>
                    알림
                </p>
            </div>
            <div className='icons' onClick={handleMine} style={{ float:'left'}}>
                <img src={mine? PressedMine : Mine }alt="icon"style={{width:'25%'}}/>
                <p style={mine ? { fontWeight:'bold' } : { color: 'black' }}>
                    MY
                </p>
            </div>
    </footer>
  )
}

export default FooterNavbar