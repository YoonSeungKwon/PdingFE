import React, { useState, useEffect }  from 'react'
import { useNavigate, Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';

const Main = ({basicUrl}) => {

  const navigate = useNavigate();

  const [showButtons, setShowButtons] = useState(false);

  const [appKey, setAppKey] = useState("");
  const [logoSize, setLogoSize] = useState(400);
  const [logoImage, setLogoImage] = useState("/logos/mainlogo.png");
  const [showBackground, setShowBackground] = useState(false);

  const joinMembership = () => {
    navigate('/Login');
  }

  useEffect(() => {
    axios.get(basicUrl + "/login/oauth2/code/kakao"
    ).then((res)=>{
      console.log(res);
      setAppKey(res.data.key);
    }).catch((error)=>{
      console.log(error);
    })

    const timer = setTimeout(() => {
      setShowButtons(true);
      setLogoSize(300);
      setLogoImage("/logos/logoAndTag.png");
      setShowBackground(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = (e) =>{
    console.log(e)
    const token = e.response.access_token;
    axios.post(basicUrl + "/login/oauth2/code/kakao", token
    ).then((res)=>{
      console.log(res);
      localStorage.setItem('acc_token', res.headers.authorization); 
      localStorage.setItem('ref_token', res.headers.get("x-refresh-token")); 
      localStorage.setItem('userProfile', res.data.profile);
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('oauth', res.data.oauth);
      localStorage.setItem('userEmail', res.data.email);
      navigate('/home/' + res.data.email, {
        state:{
          name: res.data.name,
          profile: res.data.profile,
        }
      })
    }).catch((error)=>{
      console.log(error);
    })
  }

  const handleFailure = (e) =>{
    console.log(e.response);
  }


  return (
    <div className={`Main ${showBackground ? 'show-background' : ''}`} style={{border:'1px solid black'}}>
      <div style={{ textAlign: 'center', marginTop:'-150px'}}>
        <div><img className="MainLogo" style={{width: logoSize +'px'}} src={logoImage} /></div>
      </div>
      {showButtons && (
          <div style={{ textAlign: 'center' }}>
            <div className='mainText'>
            '프딩'은 원하는 선물을 등록하면<br></br>
            친구들이 금액을 채워주는 크라우드 펀딩 형태의<br></br>
            모바일 중점 웹 서비스입니다.
            </div>
            <div className='marginbottonchange'>
              <KakaoLogin
              token={appKey}
              onSuccess={handleSuccess}
              onFail={handleFailure}
              style={{border: '0px', backgroundColor:'transparent'}}
              >
                <img src='/img/kakao_login_large_wide.png' className='kakao-btn' />
              </KakaoLogin>
            </div>
            <div><button className="login-btn-main" style={{borderRadius:'3px'}} onClick={joinMembership}>이메일로 로그인하기</button></div>
            <div><h5 style={{ fontSize: 'medium', textAlign:'center', color:'grey'}}>프딩이 처음이신가요? <Link className='signup_link' to='/Signup'>회원가입</Link></h5></div>
          </div>
      )}
      
    </div>
    

  )
}

export default Main