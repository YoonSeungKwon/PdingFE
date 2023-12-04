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
          <div style={{paddingTop:'3vh'}}><img src={userProfile} className=' mypageProfileBox'></img>
            <div><button style={{paddingBottom:'2vh'}} className='mypageWriteButton'onClick={()=>navigate("/write")}>
                  <img src='/img/edit.png' width={'20px'} style={{paddingBottom:'2vh'}}></img>
              </button></div>
              </div>
          <div style={{whiteSpace:'nowrap',fontWeight:'500', fontSize:'20px', fontFamily:'pretendard-regular', paddingTop:'1.5vh'}}>{userName}</div>
          <div style={{fontSize:'16px', fontWeight:'400', color:'#7b7b7b',fontFamily:'pretendard-regular'}}>{userEmail}</div>
        </div>
      
        <div className='mypageMenu'>
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