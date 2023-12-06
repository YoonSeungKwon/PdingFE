import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Signup = ({basicUrl}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState('');
  const [check, setCheck] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  
  const navigate = useNavigate();

  const gotoPreview = (e) =>{
    navigate('/');
  }

  const updateIsFormFilled = () => {
    setIsFormFilled(email.trim() !== '' && password.trim() !== '');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    updateIsFormFilled();
  };

  const handleEmailChange = (e) => {
    setCheck(false);
    setEmail(e.target.value);
    updateIsFormFilled();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    updateIsFormFilled();
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    updateIsFormFilled();
  };

  const handleCheck = (e) =>{
    if(email){
      axios.get(basicUrl + '/api/v1/members/check/'+email
      ).then((res)=>{
        console.log(res);
        if(res.data){
          alert("이미 존재하는 이메일 주소 입니다.");
        }else{
          alert("사용 가능한 이메일 주소 입니다.");
          setCheck(true);
        }
      })
    }
    else{
      alert("이메일을 입력해 주세요")
    }
  }


  const register = () => {
    if (name && email && password && password === passwordCheck) {
      if(check){
        axios
        .post( basicUrl + '/api/v1/members/', {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          // Handle success.
          console.log(response)
          console.log('Well done!');
          console.log('User profile', response.data);
          alert(response.data.name + '님 회원가입을 축하드립니다. 로그인 페이지로 이동합니다.')
          navigate("/login");
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response.data);
          const msg = error.response.data.message
          const code = error.response.data.status

          alert(msg + "  [" + code + "]")
        });
      }else{
        alert('이메일 중복 체크를 해 주세요.')
      }
    }
  };
  
  return (
    <div className='loginPage' style={{border:'1px solid black'}}>
      <div className='mysignupPage'>
        <div className='loginText'>
          <button className='btnclas' onClick={gotoPreview}>&lt;</button>
          <div style={{float:'center'}}>회원가입</div>
        </div>
        <div className='Signup'>
          <div>
            <div id='signup_section'>
                {/* 이름 */}
                <div>
                <input type='text' className='input-info-box'  maxLength='10' name='signup_name' autoFocus placeholder='이름' onChange={handleNameChange}/>
                </div>
            </div>
            {/* 이메일 */}
            <div >
              <input type='text' className='input-info-box input-info-box-email'  maxLength='30' name='signup_email' autoFocus placeholder='이메일' onChange={handleEmailChange}/>
              <button className='checking-box' onClick={handleCheck}>중복 체크</button>
            </div>

            {/* 비밀번호 */}
            <div>
              <input type='password' className='input-info-box'  maxLength='15' name='signup_password' autoFocus placeholder='비밀번호' onChange={handlePasswordChange}/>
            </div>
            <div>
              <input type='password' className='input-info-box'  maxLength='15' name='signup_pswCheck' autoFocus placeholder='비밀번호 확인' onChange={handlePasswordCheckChange}/>
            </div>
          </div>
        </div>

        <div>
          <input type='button' value='가입하기' name='sigunup_submit' className={`login-btn ${isFormFilled ? 'filled' : 'unfilled'}`} onClick={register}  disabled={!isFormFilled}/>
        </div>
        </div>
      </div>
  )
}

export default Signup