import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useHistory } from "react-router-dom"

const Login = ({basicUrl}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isFormFilled, setIsFormFilled] = useState(false);
  
  useEffect(()=>{
    localStorage.clear();
  },[])

  const gotoPreview = (e) =>{
    navigate('/');
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    updateIsFormFilled();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    updateIsFormFilled();
  };

  const updateIsFormFilled = () => {
    setIsFormFilled(email.trim() !== '' && password.trim() !== '');
  };

  const loginning = (e) => {
    e.preventDefault();
    axios
    .post(basicUrl + '/api/v1/members/login', {
      email: email,
      password: password,
    })
    .then((response) => {
    // Handle success.
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    console.log(response);
    
    localStorage.setItem('acc_token', response.headers.authorization); 
    localStorage.setItem('ref_token', response.headers.get("x-refresh-token")); 
    localStorage.setItem('userProfile', response.data.profile);
    localStorage.setItem('userName', response.data.name);
    localStorage.setItem('oauth', response.data.oauth);
    localStorage.setItem('userEmail', email);
      // alert('안녕하세요 '+ response.data.name + ' 님!');

    // navigate('/list/' + response.data.email);
    navigate('/home/' +response.data.email, {
      state:{
        name: response.data.name,
        profile: response.data.profile,
      }
    });
   })
  .catch(error => {
    console.log(error)
    // Handle error.
    const msg = error.response.data.message
    const code = error.response.data.status

    alert(msg + "   [" + code + "]")
    localStorage.clear();
    setEmail("");
    setPassword("");

  });
  }


  return (
    <div className='loginPage'>
      <div className='myloginPage'>
      <div className='loginText'>
          <button className='btnclas' onClick={gotoPreview}>&lt;</button>
          <div style={{float:'center', marginTop:'5px'}}>로그인</div>
        </div>
      <div>
        <div>
          <input type="text"  className='input-info-box' id="email" value={email} autoComplete="username" autoFocus placeholder='아이디를 입력해주세요' onChange={handleEmailChange}/>
        </div>
        <div>
        <input type="password" className='input-info-box' id="password" value={password} autoComplete="current-password" autoFocus placeholder='비밀번호를 입력해주세요' onChange={handlePasswordChange}/>
        </div>
      </div>
      <div>
        <button type='submit' className={`login-btn ${isFormFilled ? 'filled' : 'unfilled'}`} onClick={loginning} disabled={!isFormFilled} >로그인하기</button>
        </div>
        <div>
        <h5 style={{ fontSize: 'medium', textAlign:'center', color:'grey'}}>비밀번호를 잊으셨나요? <Link className='signup_link' to='/Signup'>비밀번호 찾기</Link></h5>
      </div>
      </div>
    </div>
    
    
  );
}

export default Login