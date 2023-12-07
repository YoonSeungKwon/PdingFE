import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';
import Card from 'react-bootstrap/Card';


const FriendsList = ({basicUrl}) => {

  const navigate = new useNavigate();
  const {state} = useLocation();
  const [searchEamil, setSearchEamil] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedButton, setSelectedButton] = useState("전체");
  const [project, setProject] = useState([]);
  const [modal, setModal] = useState(false);
  const now = new Date();


  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);
  
  const fetchData = (category) => {
    axios.get(basicUrl + `/api/v1/projects/friends`)
      .then((res) => {
        const list = res.data;
        
        setProject(list);
        console.log(list);
        setSelectedCategory(category);
        setSelectedButton(category);

        setProject(prevProject => {
          return category === '전체' ? list : list.filter(item => item.category === category);
        });
  
        localStorage.setItem('idxUser', list.idx);
      })
      .catch((error) => {
        console.log(error);
        setProject([]);
      });
  };
  
  const handleEmailChange = (e) =>{
    setSearchEamil(e.target.value);
  }
  const handleProductPage = (idx) =>{
    console.log(idx)
    navigate('/details/'+idx.idx, {state:idx.idx});
  }

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  //   setSelectedButton(category);
  //   const filteredProjects = category === '전체' ? project : project.filter(item => item.category === category);

  //   setProject(filteredProjects);
  //   fetchData(project);
  //   console.log(filteredProjects);

    
  // };

  
  const handleSearch = (e) =>{
    axios.get(basicUrl + '/api/v1/members/'+searchEamil
    ).then((res)=>{
      console.log(res)
      if(res.data.length === 0){
        alert("존재하지 않는 이메일입니다.")
        setSearchFriends([])
      }else{
        setModal(true);
        const list = res.data;
        setSearchFriends(list)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleFriendRequest = (i, email, oauth) =>{
    setModal(false);
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

  const handleDate = (enddate) =>{

    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    if(temp.getTime() - now.getTime() < 0)
      return '종료';

    return '종료까지' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시 ' + Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) / (1000 * 60)) + '분';
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

  const formatEndDate = (endDateString) => {
    const formattedDate = endDateString.split('T')[0];
    return formattedDate;
  }


  return (
    <>
      <div className="full-screen all-all-screen">
        <Greenheader></Greenheader>
          <div  style={{width: '100%', top:'10vh'}} >
            {/* <div style={{position: 'fixed'}}> */}
            {modal && 
                  <div id='modal'>
                    <div id='modal-content'>
                      <button onClick={()=>setModal(false)} id='modal-btn'>X</button>
                      {searchFriends.map((idx)=>(
                        <div key={idx.email} className='modal-friend' style={{marginTop:'50px'}}>
                          <img src={idx.profile} alt={idx.email} style={{float:'left', marginLeft:'5vw', width:'64px', border:'1px solid #cccccc', borderRadius:'50%'}}/>
                          <span className='newsName' style={{float:'left',marginLeft:'2vw'}}>{idx.name}</span>
                          <span className='hoursAgo' style={{float:'left',marginLeft:'2vw'}}>{handleTime(idx.lastVisit)}</span>
                          <button className='newsButton' style={{marginRight:'2vw', float:'right', color:'#496D68'}} onClick={() =>handleFriendRequest(idx, idx.email, idx.oauth)}>친구 신청</button>
                          <br/>
                          <div className='hoursAgo' style={{float:'left',marginLeft:'3vw'}}>{idx.email}</div>
                        </div>
                      ))}
                    </div>
                  </div>
            }
            <div style={{position:'relative',textAlign: 'center', paddingTop:'3vh'}}>
                <div className='input-wrap'>
                  <input className='input-friend-box'
                  value={searchEamil}
                  onChange={handleEmailChange}
                  placeholder='친구의 이름을 검색해 보세요.'
                  />
                  <button className='input-friend-btn' onClick={()=>{handleSearch()}}>
                    <span className="material-symbols-outlined">
                      search
                    </span>
                  </button>
                </div>
            </div>
            <br/>
            <div style={{marginLeft:'2vh'}}>
                <div className='pding-ment'>친구들의 프딩</div>
                <div className='pding-subment'>친구들의 선물 펀딩에 참여하여 특별한 추억을 만들어 보세요! 🎁 </div>
            </div>
            <br/>
            <div  style={{textAlign:'center',display:'flex', paddingBottom:'2vh', marginLeft:'2vh'}}>
              <button className={`category-btn ${selectedButton === '전체' ? 'selected' : ''}`} onClick={() => fetchData('전체')}>전체</button>
              <button className={`category-btn ${selectedButton === '생일' ? 'selected' : ''}`} onClick={() => fetchData('생일')}>생일</button>
              <button className={`category-btn ${selectedButton === '졸업' ? 'selected' : ''}`} onClick={() => fetchData('졸업')}>졸업</button>
            </div>
      </div>

          <div className=' pding-all-category-screen'>
            {project.map((idx) => (
              <Card className='cardsMain cardsShadow' key={idx.img} onClick={()=>handleProductPage(idx)} style={{ width: '45%', marginBottom: '20px' }}>
                <div style={{width:'100%', height:'40%', overflow:'hidden', borderRadius:'5px 5px 5px 5px', backgroundColor:'#cccccc', textAlign:'center', display:'flex', justifyContent:'center'}}>
                  <Card.Img variant="top" src={idx.img} width="100%"/>
                </div>
                <Card.Body className="p-2 border-0 card-body-h">
                  <Card.Title className="fs-8" style={{height:'7vh'}}>
                    <div>
                      <img src={idx.profile} className='card-profile'/>
                      <span className='card-title font-content' style={{marginLeft:'2vw'}}>{idx.writer}</span>
                    </div>  
                  </Card.Title>
                  <Card.Title className="fs-8 " style={{fontWeight:'500', fontFamily:'pretendard-medium',height:'7vh'}}>
                    <span className='card-content'>
                      {idx.title}
                    </span>
                  </Card.Title>
                  <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', height:'4vh'}}>
                    <Card.Text style={{ color: '#7DA79D', padding:'0 0.2vh', float:'left'}}>
                      <div style={{marginRight:'0.1vh'}}>
                        <img src={'/img/gift-friend.png'} className='card-img-small'/>
                        <span className='card-info'>{(idx.curr * 100) / idx.goal}%</span>
                      </div>
                    </Card.Text>
                    <Card.Text style={{ color: '#7b7b7b', padding:'0 0.2vh', float:'left'}}>
                      <div style={{marginRight:'0.1vh'}}>
                        <img src={'/img/profile-2user.png'} className='card-img-small'/>
                        <span className='card-info'>{idx.count}명</span>
                      </div>
                    </Card.Text>
                    <Card.Text style={{ color: '#7b7b7b', padding:'0 0.2vh', float:'right'}}>
                      <div style={{marginRight:'0.1vh'}}>
                        <img src={'/img/calendar-friend.png'} className='card-img-small'/>
                        <span className='card-info'>{formatEndDate(idx.enddate)}</span>
                      </div>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
            
          <FooterNavbar></FooterNavbar>
      </div>
    </>
  )
}

export default FriendsList