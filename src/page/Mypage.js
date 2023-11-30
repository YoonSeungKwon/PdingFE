import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';


const FriendsList = ({basicUrl}) => {

  const navigate = new useNavigate();
  const {state} = useLocation();
  const [searchEamil, setSearchEamil] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [project, setProject] = useState([]);
  const oauth = localStorage.getItem('oauth');
  const userEmail = localStorage.getItem('userEmail');
  const now = new Date();

  
  useEffect(()=>{
    axios.get(basicUrl + '/api/v1/' + userEmail + '/social=' + oauth + '/projects/'
    ).then((res)=>{
      const list = res.data;
      console.log(list);
      setProject(list);
    }).catch((error)=>{
      console.log(error);
      setProject([]);
    })
  }, []);
  
  const handleEmailChange = (e) =>{
    setSearchEamil(e.target.value);
  }
  const handleProductPage = (idx) =>{
    navigate('/details/'+idx, {state:[state[0],state[1], idx]});
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
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


  return (
    <>
      <div className="full-screen all-all-screen">
        <Greenheader></Greenheader>
          <div className='wantedFix' style={{ position: 'fixed',  width: '100%' }} >
            {/* <div style={{position: 'fixed'}}> */}
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
                <div className='pding-subment'>친구들의 선물 펀딩에 참여하여 특별한 추억을 만들어 보세요! 🎁 </div>
            </div>
            <br/>
            <div  style={{textAlign:'center',display:'flex', paddingBottom:'2vh', marginLeft:'2vh'}}>
              <button className='category-btn'>전체</button>
              <button className='category-btn'>생일</button>
              <button className={`category-btn ${selectedCategory === "졸업" ? "selected" : ""}`}
              onClick={() => handleCategoryChange("졸업")}>졸업</button>
            </div>
      </div>

            <div className='category_wrap all-screen' style={{margin:'0px auto', marginTop:'50px', marginLeft:'200px',marginTop: '100px' }}>
              {project.map((idx)=>(
                <div key={idx.img} style={{border:'1px solid black', width:'200px', height:'200px', textAlign:'center', marginTop:'20px', marginLeft:'100px', float:'left'}}>
                  <h2 style={{marginTop:'20px'}}>{idx.title}</h2>
                  <div><img src={idx.img}  style={{width:'200px'}}/></div>
                  <h4>{(idx.curr*100) / idx.goal}%</h4>
                  <h4>{handleDate(idx.enddate)}</h4>
                  {/* <input value={pay} onChange={e=>setPay(e.target.value)} type='number' />:금액 */}
                  <button onClick={()=>handleProductPage(idx.idx)}>보기</button>
                </div>  
              ))}
          </div>
            
            
          <FooterNavbar></FooterNavbar>
      </div>
    </>
  )
}

export default FriendsList