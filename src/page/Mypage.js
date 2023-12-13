import React, { useRef,useState, useEffect,setState }  from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';


const Home = ({basicUrl}) => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState('');

  const userProfile = localStorage.getItem('userProfile');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleProfile = () =>{
    const formdata = new FormData();
    formdata.append('file', file)
    axios.post(basicUrl +'/api/v1/members/profile', formdata)
    .then((res)=>{
      console.log(res)
      localStorage.setItem('userProfile', res.data)
      setModal(false)
    }).catch((error)=>{
      console.log(error)
      setModal(false)
    })
  }

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
          {modal && 
                  <div id='modal'>
                    <div id='modal-content'>
                      <button onClick={()=>setModal(false)} id='modal-btn'>X</button>
                      <span className='font-content font-bold' style={{}}>프로필 이미지 변경</span>
                      <div >
                        <input type='file' onChange={(e)=>{setFile(e.target.files[0])}}/>      
                        <input type='submit' onClick={()=>{handleProfile()}}/>            
                      </div>
                    </div>
                  </div>
          }
          <div>
            <img src={userProfile} className=' mypageProfileBox' />
            <div style={{height:'4vh', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'-5vh', marginRight:'-10vh'}}>
              <div className='mypageWriteButton'></div>
              <img src='/img/edit.png' style={{height:'3vh', position:'absolute'}} onClick={()=>setModal(true)}></img>
            </div>
          </div>
          <div style={{whiteSpace:'nowrap', marginTop:'3vh'}}>
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