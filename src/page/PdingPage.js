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
    navigate('/details/'+idx, {state:[state[0],state[1], idx]});
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
        const list = res.data;
        setSearchFriends(list)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleDate = (enddate) =>{

    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    if(temp.getTime() - now.getTime() < 0)
      return '종료';

    return '종료까지' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시 ' + Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) / (1000 * 60)) + '분';
  }

  const formatEndDate = (endDateString) => {
    const formattedDate = endDateString.split('T')[0];
    return formattedDate;
  }


  return (
    <>
      <div className="full-screen all-all-screen">
        <Greenheader></Greenheader>
          <div className='wantedFix' style={{  width: '100%' }} >
            {/* <div style={{position: 'fixed'}}> */}
            <div style={{position:'relative',textAlign: 'center', paddingTop:'3vh'}}>
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
              <Card className='cardsMain cardsShadow' key={idx.img} onClick={()=>handleProductPage(idx.idx)} style={{ width: '45%', marginBottom: '20px' }}>
                <Card.Img variant="top" src={idx.img} height="100px" width="160px" />
                <Card.Body className="p-2 border-0">
                  <Card.Title className="fs-8"><img width={'24px'} src={idx.profile}></img>{idx.writer}</Card.Title>
                  <Card.Title className="fs-8 " style={{fontSize:'14px', fontWeight:'500', fontFamily:'pretendard-medium'}}>{idx.title}</Card.Title>
                  <div style={{textAlign:'center',display:'flex', justifyContent:'center'}}>
                    <Card.Text style={{ color: '#7DA79D', fontSize:'12px', padding:'0 0.2vh',display:'flex', alignItems:'center'}}>
                      <div style={{marginRight:'0.1vh'}}><img src={'/img/gift-friend.png'} width={'12px'}></img></div>
                      {(idx.curr * 100) / idx.goal}%
                    </Card.Text>
                    <Card.Text style={{ color: '#7b7b7b', fontSize:'12px', padding:'0 0.2vh',display:'flex' , alignItems:'center' }}>
                      <div style={{marginRight:'0.1vh'}}><img src={'/img/profile-2user.png'} width={'12px'}></img></div>
                      {idx.idx}명
                    </Card.Text>
                    <Card.Text style={{ color: '#7b7b7b', fontSize:'12px', padding:'0 0.2vh',display:'flex' , alignItems:'center'}}>
                      <div style={{marginRight:'0.1vh'}}><img src={'/img/calendar-friend.png'} width={'12px'}></img></div>
                      {formatEndDate(idx.enddate)}
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