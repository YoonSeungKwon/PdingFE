import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FriendsList = ({basicUrl}) => {

  const navigate = new useNavigate();

  const [searchEamil, setSearchEamil] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [myNews, setMyNews] = useState(true);
  const [myFriendsreq, setMyFriendsreq] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  
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
  const handleFriendsReq = () =>{
    setMyFriendsreq(true);
    setMyNews(false);
  }

  const handleMyNews = () => {
    setMyNews(true);
    setMyFriendsreq(false);
  };

    


  return (
    <>
      <div className="full-screen all-all-screen">
          <div className='all-screen' >
            <div className='mypageHeader' >
              <div style={{position:'relative', height:'100%'}}>
                <div style={{height:'20px'}}></div>
                <div className='mypageheadertxt'>
                <div style={{position:'absolute', width:'7vw', float:'left', cursor:'pointer'}} onClick={()=>{navigate(-1)}}>
                    <img src='/img/arrow-left-black.png' className='back-btn'/>
                </div>
                친구 목록<img src='/img/arrow-left.png' onClick={()=>navigate("/mypage/"+userEmail)} className='mypageHeaderimg' style={{width:'26.26px', height:'24px'}}></img></div>
            </div>
          </div>
          <div className='newsBox' >
              <div className={`submenu-news${myNews ? ' active' : ''}`}onClick={handleMyNews} >
                  <p style={myNews ? { color:'#496D68' } : { color: 'grey' }}>
                      친구
                  </p>
              </div>
              <div className={`submenu-news${myFriendsreq ? ' active' : ''}`} onClick={handleFriendsReq}>
                  <p style={myFriendsreq ? { color:'#496D68' } : { color: 'grey' }}>
                      친구 찾기
                  </p>
              </div>
            </div>
            {myFriendsreq &&(
              <>
              <div>
              <div style={{position:'relative',textAlign: 'center', paddingTop:'3vh'}}>
                <input className='input-friend-box'
                value={searchEamil}
                onChange={handleEmailChange}
                placeholder='친구의 이메일을 검색해 보세요.'
                />
                <button className='input-friend-btn' onClick={handleSearch}><span class="material-symbols-outlined" style={{color:'black', marginRight:'2vw'}}>
                  search
                  </span></button>
                              </div>
                {searchFriends.map((idx)=>(
                  <div key={idx.email} style={{width:"100%", padding:"1.2vh 2vh", alignItems: "center", display: "flex" }}>
                    <img src={idx.profile} alt={idx.email} width='64px'/>
                    <div style={{marginLeft:'2vh'}}>
                      <div style={{fontSize:'20px', fontFamily:'pretendard-medium', fontWeight:'500'}}>{idx.name}   </div>
                      <div style={{fontSize:'12px', fontFamily:'pretendard-medium', fontWeight:'400', color:'#7b7b7b'}}>{idx.email}    </div>
                    </div>
                    <button style={{marginLeft: 'auto' , fontFamily:'pretendard-medium', fontSize:'14px', color:'#496D68', backgroundColor:'transparent', border:'0'}} onClick={() =>handleFriendRequest(idx, idx.email, idx.oauth)}>친구 신청</button>
                  </div>
                ))}
            </div>
              </>
            )}
            
          </div>
          {myNews && (
            <>
            <div style={{paddingTop:'5vh'}}>
            {friendsList.map((idx)=>(
              <div key={idx.email} style={{width:"100%", padding:"1.2vh 2vh", alignItems: "center", display: "flex" }}>
                <img src={idx.profile} alt={idx.email} width='64px' style={{marginRight:'2vh'}}/>
                <span style={{fontSize:'20px', fontFamily:'pretendard-medium', fontWeight:'500'}}>{idx.name}   </span>
                <span style={{marginLeft: 'auto' , fontFamily:'pretendard-medium', fontSize:'14px', color:'#7b7b7b'}}>삭제</span>
                {/* <button onClick={() =>handleBasket(idx.email, idx.oauth)} style={{float:"right", marginTop:"10px", marginRight:"10px"}}>장바구니 보기</button> */}
              </div>
            ))}
            </div>
            </>
          )}
          
      </div>
    </>
  )
}

export default FriendsList