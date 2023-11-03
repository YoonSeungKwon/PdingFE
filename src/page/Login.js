import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useHistory } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setError = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginning = (e) => {
    e.preventDefault();
  if (!email || !password) {
    setError("이메일 또는 패스워드를 적어주세요.");
    return;
  }
  axios
  .post('http://localhost:3000/login', {

    email: email,
    password: password,
  })
  .then(response => {
    // Handle success.
    const { accessToken } = response.data;
    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    localStorage.setItem('token', response.data.jwt); 
    
    navigate('/list');
  })
  .catch(error => {
    // Handle error.
    if (error.response) {
      setError(error.response.data.message[0].messages[0].message);
    } else {
      setError("이메일 또는 패스워드가 틀렸습니다. 다시 시도해 주세요.");
    }
    setEmail("");
    setPassword("");
  });
  }

  
  return (
    <form>
      <div>
        ID
        <input type="text" id="email"  autoComplete="username" autoFocus placeholder='아이디를 입력해주세요' onChange={handleEmailChange}/>
      </div>
      <div>
      password
      <input type="password" id="password"  autoComplete="current-password" autoFocus placeholder='비밀번호를 입력해주세요' onChange={handlePasswordChange}/>
      </div>
      <button type='submit' onClick={loginning} >로그인</button>
      <h5><Link to='/Signup'>회원가입</Link></h5>
    </form>
    
  )
}

export default Login