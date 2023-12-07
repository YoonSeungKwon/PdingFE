import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';

const FriendsList = ({basicUrl}) => {

  const navigate = new useNavigate();

  const [searchEamil, setSearchEamil] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [myNews, setMyNews] = useState(true);
  const [myFriendsreq, setMyFriendsreq] = useState(false);



  useEffect(() => {
    if (myFriendsreq) {
      axios.get(basicUrl + '/api/v1/friends/').then((res) => {
        console.log(res);
        handleFriendsList();
        if (res.data.length === 0) {
          setRequestFriends([]);
        } else {
          const list = res.data;
          setRequestFriends(list);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [myFriendsreq]);

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
  
  const handleFriendsReq = () =>{
    setMyFriendsreq(true);
    setMyNews(false);
  }

  const handleMyNews = () => {
    setMyNews(true);
    setMyFriendsreq(false);
  };



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

   const handleTime = (regdate) => {
    const temp = new Date(regdate.substr(0, 10)+' '+regdate.substr(11, 8))
    const now = new Date();
    console.log(temp)
    if (Math.floor((now.getTime() - temp.getTime()) / (1000*60*60*24)) > 0 )
      return Math.floor((now.getTime() - temp.getTime()) / (1000*60*60*24)) + '일 전'
    else if(parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24)))/(1000*60*60) > 0)
      return parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24))/(1000*60*60)) + '시간 전'
    else
      return parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24))%(1000*60*60))/(1000*60) + 1 + '분 전'
  }

  return (
    <>
      <div className="full-screen all-alert-screen">
        <Greenheader></Greenheader>
          <div style={{position: 'relative'}} >
            <div className='newsBox' style={{textAlign:'center', display:'flex'}}>
              <div className={`submenu-news${myNews ? ' active' : ''}`} onClick={handleMyNews}>
                  <p style={myNews ? { color:'#496D68' } : { color: 'grey' }}>
                      내 소식
                  </p>
              </div>
              <div className={`submenu-news${myFriendsreq ? ' active' : ''}`} onClick={handleFriendsReq}>
                  <p style={myFriendsreq ? { color:'#496D68' } : { color: 'grey' }}>
                      친구 요청
                  </p>
              </div>
            </div>
            {myNews && (
               <>
              <div style={{ display: 'flex', alignItems: 'center', height: '88px' }}>
                <div style={{ paddingLeft: '2vh' }}><img src={'/img/Feel.png'} width='64px' height='64px' /></div>
                <div style={{ paddingLeft: '2vh', paddingTop: '1vh' }}>
                  <span className='PartFund'><b>정재필</b>님이 회원님의 프딩에 참여했어요.   </span>
                  <p className='hoursAgo'>몇시간 전</p>
                </div>
              </div>
      
              <div style={{ display: 'flex', alignItems: 'center', height: '88px' }}>
                <div style={{ paddingLeft: '2vh' }}><img src={'/img/Yunji.png'} width='64px' height='64px' /></div>
                <div style={{ paddingLeft: '2vh', paddingTop: '1vh' }}>
                  <span className='PartFund'><b>김윤지</b>님이 새로운 프딩을 올렸어요.   </span>
                  <p className='hoursAgo'>몇시간 전</p>
                </div>
              </div>
              </>
          )}


          {myFriendsreq && (
            <div>
            {requestFriends.map((idx)=>(
              <div key={idx.email} style={{display:'flex', textAlign:'center',alignItems:'center', height:'88px'}}>
                  <div style={{paddingLeft:'2vh'}}><img src={idx.profile} alt={idx.email} width='64px' height='64px'/></div>
                  <div style={{paddingLeft:'2vh', paddingTop:'1vh'}}>
                    <div className='newsName' style={{float:'left'}}>{idx.name}  </div>
                    <br/>
                    <div className='hoursAgo' style={{float:'left'}}>{handleTime(idx.regdate)}</div>
                  </div>
                  <div style={{marginLeft: 'auto'}}>
                    <button className='newsButton' style={{color:'#7b7b7b'}} onClick={() =>handleFriendDecline(idx, idx.email, idx.oauth)}>거절하기</button>
                    <button className='newsButton' style={{color:'#496D68'}} onClick={() =>handleFriendAccept(idx, idx.email, idx.oauth)}>수락하기</button>
                  </div>
              </div>
            ))}
          </div>
          )}


          </div> 
          
            
          <FooterNavbar></FooterNavbar>
      </div>
    </>
  )
}

export default FriendsList