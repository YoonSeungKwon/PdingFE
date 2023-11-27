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

  const handleBasket = (email, oauth) => {
    navigate('/basket/'+email, {state:[email,oauth]})
  }

  return (
    <>
      <div className="full-screen all-all-screen">
        <Greenheader></Greenheader>
          <div className='all-screen' >
            <div style={{position:'relative',textAlign: 'center', paddingTop:'2vh'}}>
                <input className='input-friend-box'
                value={searchEamil}
                onChange={handleEmailChange}
                placeholder='친구의 이름을 검색해 보세요.'
                />
                <button className='input-friend-btn'><span class="material-symbols-outlined">
search
</span></button>
            </div>
            <br/>
            <div style={{marginLeft:'2vh'}}>
                <div className='pding-ment'>친구들의 프딩</div>
                <div className='pding-subment'>친구들의 선물 펀딩에 참여하여 특별한 추억을 만들어 보세요!</div>
            </div>
            <br/>
            
            
          <FooterNavbar></FooterNavbar>
      </div>
      </div>
    </>
  )
}

export default FriendsList