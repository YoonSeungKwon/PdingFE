import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FriendsList = ({basicUrl}) => {

  const navigate = new useNavigate();

  const [searchEamil, setSearchEamil] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  
  useEffect(()=>{
    axios.get(basicUrl + '/api/v1/friends/'
    ).then((res)=>{
      console.log(res)
      handleFriendsList();
      if(res.data.length === 0){
        setRequestFriends([]);
      }else{
        const list = res.data;  
        setRequestFriends(list);
      }
    }).catch((error)=>{
      console.log(error)
    })

  },[])

  const handleFriendsList = () =>{
    axios.get(basicUrl + '/api/v1/friends/lists'
    ).then((res)=>{
      console.log(res)
      const list = res.data;
      setFriendsList(list);
    }).catch((error)=>{
      console.log(error)
    })
  }
  
  const handleEmailChange = (e) =>{
    setSearchEamil(e.target.value);
  }

  const handleFriendRequest = (i, email, oauth) =>{
    axios.post(basicUrl + '/api/v1/friends/link', {
      'toUserEmail':email,
      'oauth':oauth
    }).then((res)=>{
      console.log(res)
      alert('친구 신청을 전송하였습니다.')
      setSearchFriends(searchFriends.filter((idx)=>(idx !== i)))
    }).catch((error)=>{
      console.log(error)
      const code = error.response.data.status
      const msg = error.response.data.message
      alert(msg + "   [" + code + "]")
    })
  }

  const handleFriendAccept = (i, email, oauth)=>{
   axios.post(basicUrl + '/api/v1/friends/answer/ok',{
      'fromUserEmail':email,
      'oauth':oauth
   }).then((res)=>{
    console.log(res);
    alert('친구 신청을 수락하였습니다.')
    handleFriendsList();
    setRequestFriends(requestFriends.filter((idx)=>(idx !== i)))
   }).catch((error)=>{
    console.log(error);
   })
  }

  const handleFriendDecline = (i, email, oauth)=>{
    axios.post(basicUrl + '/api/v1/friends/answer/nok',{
       'fromUserEmail':email,
       'oauth':oauth
    }).then((res)=>{
     console.log(res);
     alert('친구 신청을 거절하였습니다.')
     setRequestFriends(requestFriends.filter((idx)=>(idx !== i)))
    }).catch((error)=>{
     console.log(error);
    })
   }

  const handleSearch = (e) =>{
    axios.get(basicUrl + '/api/v1/members/'+searchEamil
    ).then((res)=>{
      console.log(res)
      if(res.data.length === 0){
        alert("존재하지 않는 이메일입니다.")
        setSearchFriends([])
      }else{
        const list = res.data;
        setSearchFriends(list)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.")
    navigate("/");
  }

  const handleBasket = (email, oauth) => {
    navigate('/basket/'+email, {state:[email,oauth]})
  }

  return (
    <>
      <div>
        <div>친구 검색</div>
        <input
          value={searchEamil}
          onChange={handleEmailChange}
        />
        <button onClick={handleSearch}>검색</button>
        <br/>
        {searchFriends.map((idx)=>(
          <div key={idx.email}>
            <img src={idx.profile} alt={idx.email} width='50px'/>
            <span>Email : {idx.email}    </span>
            <span>닉네임  :  {idx.name}   </span>
            <button onClick={() =>handleFriendRequest(idx, idx.email, idx.oauth)}>친구 신청</button>
          </div>
        ))}
      </div>
      <hr/>
      <div>
        <div>받은 친구 요청</div>
        <br/>
        {requestFriends.map((idx)=>(
          <div key={idx.email}>
            <img src={idx.profile} alt={idx.email} width='50px'/>
            <span>Email : {idx.email}    </span>
            <span>닉네임  :  {idx.name}   </span>
            <button onClick={() =>handleFriendAccept(idx, idx.email, idx.oauth)}>수락</button>
            <button onClick={() =>handleFriendDecline(idx, idx.email, idx.oauth)}>거절</button>
          </div>
        ))}
      </div>
      <hr/>
      <button onClick={()=>navigate("/write")}>글쓰기</button>
      <button onClick={()=>handleLogout()}>로그아웃</button>
      <div>
        <div>친구 목록</div>
        <br/>
        {friendsList.map((idx)=>(
          <div key={idx.email} style={{border:"1px solid black",width:"700px"}}>
            <img src={idx.profile} alt={idx.email} width='50px'/>
            <span style={{marginLeft:"50px"}}>Email : {idx.email}    </span>
            <span style={{marginLeft:"50px"}}>Name  :  {idx.name}   </span>
            <button onClick={() =>handleBasket(idx.email, idx.oauth)} style={{float:"right", marginTop:"10px", marginRight:"10px"}}>장바구니 보기</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default FriendsList