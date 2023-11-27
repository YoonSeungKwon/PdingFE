import Home from '../img/navbar/Home.png';
import PressedHome from '../img/navbar/PressedHome.png';
import Pding from '../img/navbar/Pding.png';
import PressedPding from '../img/navbar/PressedPding.png';
import Alarm from '../img/navbar/Alarm.png';
import PressedAlarm from '../img/navbar/PressedAlarm.png';
import Mine from '../img/navbar/Mine.png';
import PressedMine from '../img/navbar/PressedMine.png';

import { useState , useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const FooterNavbar = () => {
    const [home, setHome] = useState(false);
    const [pding, setPding] = useState(false);
    const [alarm, setAlarm] = useState(false);
    const [mine, setMine] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
      const pathname = location.pathname;
      setHome(pathname === '/home/' + userEmail);
      setPding(pathname === '/pding/' + userEmail);
      setAlarm(pathname === '/news/' + userEmail);
      setMine(pathname === '/basket/' + userEmail);
    }, [location.pathname, userEmail]);

    const resetState = () => {
        setHome(false);
        setPding(false);
        setAlarm(false);
        setMine(false);
      };

      const handleNavigation = (path, stateUpdater) => {
        resetState();
        stateUpdater(true);
        navigate(path + userEmail);
      };
    
      const handleHome = () => {
        handleNavigation('/home/', setHome);
      };
    
      const handlePding = () => {
        handleNavigation('/pding/', setPding);
      };
    
      const handleAlarm = () => {
        handleNavigation('/news/', setAlarm);
      };
    
      const handleMine = (userEmail) => {
        resetState();
        navigate('/basket/' + userEmail, {state:[userEmail,true]});
      };
    

  return (
    <footer style={{ height:'8%', backgroundColor:'white'}}>
            <div className='icons' onClick={handleHome}>
                <img src={home? PressedHome : Home }alt="icon" style={{width:'25%'}}/>
                <p style={home ? { color:'#496D68' } : { color: 'grey' }}>
                    홈
                </p>
            </div>
            <div className='icons' onClick={handlePding}>
                <img src={pding? PressedPding : Pding }alt="icon"style={{width:'25%'}}/>
                <p style={pding ? { color:'#496D68' } : { color: 'grey' }}>
                    친구
                </p>
            </div>
            <div className='icons' onClick={handleAlarm}>
                <img src={alarm? PressedAlarm : Alarm }alt="icon"style={{width:'25%'}}/>
                <p style={alarm ? { color:'#496D68' } : { color: 'grey' }}>
                    알림
                </p>
            </div>
            <div className='icons' onClick={handleMine} style={{ float:'left'}}>
                <img src={mine? PressedMine : Mine }alt="icon"style={{width:'25%'}}/>
                <p style={mine ? { color:'#496D68' } : { color: 'grey' }}>
                    MY
                </p>
            </div>
    </footer>
    
  )
}

export default FooterNavbar