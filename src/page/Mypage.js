import React, { useRef,useState, useEffect,setState }  from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = ({basicUrl}) => {

  const navigate = useNavigate();
  const {state} = useLocation();

  const userProfile = localStorage.getItem('userProfile');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.")
    navigate("/");
  }

  useEffect(() => { 
     console.log({state});

},[]);

  return (
    <div className="full-screen all-mypage-screen">
      <Greenheader></Greenheader>
      
      <div className='all-screen' style={{position: 'relative'}}>
        <div className='mypageProfile' style={{textAlign:'center', alignItems:'center', backgroundColor:'#f5f5f5', justifyContent:'center'}}>
          <div>
            <img src={userProfile} className=' mypageProfileBox' />
            <div style={{marginTop:'2vh', height:'4vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div className='mypageWriteButton'onClick={()=>navigate("/write")}></div>
              <img src='/img/edit.png' style={{height:'2vh', position:'absolute'}}></img>
            </div>
          </div>
          <div style={{whiteSpace:'nowrap'}}>
            <span className='font-content font-bold' style={{fontSize:'3vh', display:'block'}}>{userName}</span>
            <span className='font-content' style={{color:'#7b7b7b', fontSize:'2vh'}}>{userEmail}</span>
          </div>
        </div>
      
        <div className='mypageMenu' style={{paddingTop:'3vh'}}>
            <div className='mypageMenuText' onClick={()=>navigate("/list/"+userEmail)}>친구 목록<img src='/img/arrow-right.png' className='imgclas' style={{width:'24px'}}></img></div>
            <div className='mypageMenuText' onClick={()=>navigate("/ongoing/"+userEmail)}>진행 중인 프딩<img src='/img/arrow-right.png' className='imgclas' style={{width:'24px'}}></img></div>
            <div className='mypageMenuText' onClick={()=>navigate("/participate/"+userEmail)}>참여 중인 프딩<img src='/img/arrow-right.png' className='imgclas' style={{width:'24px'}}></img></div>
            <div className='mypageMenuText' onClick={()=>navigate("/saved/"+userEmail)}>찜한 선물<img src='/img/arrow-right.png' className='imgclas' style={{width:'24px'}}></img></div>
            <div className='mypageMenuText' onClick={()=>handleLogout()}>로그아웃<img src='/img/logout@2x.png' className='imgclas' style={{width:'24px'}}></img></div>
        </div>
      </div>
    <FooterNavbar></FooterNavbar>

    </div>
    

  )
}

export default Home