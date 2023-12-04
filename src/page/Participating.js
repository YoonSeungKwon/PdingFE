import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Participating = ({basicUrl}) => {
    const navigate = new useNavigate();
    const userEmail = localStorage.getItem('userEmail');
    const oauth = localStorage.getItem('oauth');
    const [project, setProject] = useState([]);
    const {state} = useLocation();

    useEffect(() => {
        axios.get(basicUrl + 'api/v1/projects/')
      .then((res) => {
        const list = res.data;
        console.log(list);
        setProject(list);
      })
      .catch((error) => {
        console.log(error);
        setProject([]);
      });
      }, []);

      const handleProductPage = (idx) =>{
        navigate('/details/'+idx, {state:[state[0],state[1], idx]});
      }

      const formatEndDate = (endDateString) => {
        const formattedDate = endDateString.split('T')[0];
        return formattedDate;
      }

      
  return (
    <>
    <div className="full-screen all-all-screen">
        <div className='all-screen' >
          <div className='mypageHeader' >
            <div style={{position:'relative', height:'100%'}}>
              <div style={{height:'53px'}}></div>
              <div className='mypageheadertxt'>참여 중인 프딩<img src='/img/arrow-left.png' onClick={()=>navigate("/mypage/"+userEmail)} className='mypageHeaderimg' style={{width:'26.26px', height:'24px'}}></img></div>
            </div>
          </div>
        </div>
    </div>
    <div className='category_wrap pding-all-category-screen' style={{ margin: '0px auto', marginTop: '100px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
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
    </>
  )
}

export default Participating