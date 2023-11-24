import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Signup = ({basicUrl}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState('');
  const [check, setCheck] = useState(false);
  
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setCheck(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleCheck = (e) =>{
    if(email){
      axios.get({basicUrl} + '/api/v1/members/check/'+email
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
        .post( {basicUrl} + '/api/v1/members/', {
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
    <div>
        <div>
          <h3 id='signup_title'> 회원가입 (Signup) </h3>
        </div>
        <div className='Signup'>
          <div>
            <div id='signup_section'>
                {/* 이름 */}
                <div>
                <h5> 이름 </h5>
                <input type='text' maxLength='10' name='signup_name' onChange={handleNameChange}/>
                </div>
            </div>
            {/* 이메일 */}
            <div>
              <h5> 이메일 </h5>
              <input type='text' maxLength='15' name='signup_email' onChange={handleEmailChange}/> @
              <select name='signup_email_select'>
                <option value='gmail.com'> gmail.com </option>
                <option value='naver.com'> naver.com </option>
                <option value='write'> 직접 입력 </option>
              </select>
              <button onClick={handleCheck}>중복 체크</button>
            </div>

            {/* 비밀번호 */}
            <div>
              <h5> 비밀번호 </h5>
              <input type='password' maxLength='15' name='signup_password' onChange={handlePasswordChange}/>
            </div>
            <div>
              <h5> 비밀번호 확인 </h5>
              <input type='password' maxLength='15' name='signup_pswCheck' onChange={handlePasswordCheckChange}/>
            </div>
          </div>
        </div>

        <div>
          <input type='button' value='가입하기' name='sigunup_submit'onClick={register} disabled={!(name && email && password && password === passwordCheck)}/>
        </div>
      </div>
  )
}

export default Signup