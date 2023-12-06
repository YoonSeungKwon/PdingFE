import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetail = ({basicUrl}) => {

  const state = useLocation();
  const navigate = new useNavigate();

  const [now, setNow] = useState(new Date());
  const [details, setDetails] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    console.log(state)
    axios.get(basicUrl + '/api/v1/projects/' + state.state
    ).then((res)=>{
      console.log(res);
      setDetails(res.data);
    
      setInterval(()=>{
        setNow(new Date())
      },1000)

      axios.get(basicUrl + '/api/v1/orders/' + state.state
      ).then((res)=>{
        console.log(res)
        setOrders(res.data)
      }).catch((error)=>{
        console.log(error)
      })

    }).catch((error)=>{
      console.log(error);
    })
  }, []);

  const handlePercentage = () =>{
    return {
      width:((details.curr/details.goal) * 94)+'vw',
      height:'3vh',
      backgroundColor:'#496D68',
      borderRadius:'15px 15px 15px 15px',
      position:'absolute'
    }
  }

  const handleDetailDate = (enddate) =>{
    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    if(temp.getTime() - now.getTime() < 0)
      return '종료';
    return ' 종료까지  ' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시간 남음';
  }
  
  const handleTime = (regdate) => {
    const temp = new Date(regdate.substr(0, 10)+' '+regdate.substr(11, 8))
    const now = new Date();
    if (Math.floor((now.getTime() - temp.getTime()) / (1000*60*60*24)) > 0 )
      return Math.floor((now.getTime() - temp.getTime()) / (1000*60*60*24)) + '일 전'
    else if(parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24)))/(1000*60*60) > 0)
      return parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24))/(1000*60*60)) + '시간 전'
    else
      return parseInt(Math.floor((now.getTime() - temp.getTime()) % (1000*60*60*24))%(1000*60*60))/(1000*60) + 1 + '분 전'
  }

  const handlePay = () =>{
    navigate('/pay/'+ state.state, {state:[details,state.state]})
  }

  return (
    <div style={{width:'100%', backgroundColor:'#D0F0E3'}}>
      <div style={{textAlign:'center', width:'100%', margin:'0 auto'}}>
      {details&&
        <div>
          <div style={{position:'absolute', width:'100%', top:'5vh'}}>
            <div style={{width:'10vw', float:'left', lineHeight:'5vh', cursor:'pointer'}} onClick={()=>{navigate(-1)}}>
              <img src='/img/arrow-left.png' className='back-btn'/>
            </div>
            <div style={{width:'10vw', float:'right', lineHeight:'5vh', cursor:'pointer'}} onClick={()=>{}}>
              <img src='/img/export.png' className='back-btn' style={{marginRight:'5vw'}}/>
            </div>
          </div>

          {/* 이미지 */}
          <div style={{width:'100%'}}>
            <img src={details.img} style={{width:'100%'}}/>
          </div>

          {/* 콘텐츠 */}
          <div style={{width:'100%', height:'100%', backgroundColor:'#FFFFFF', marginTop:'-20%', position:'absolute', borderRadius:'10px 10px'}}>

            {/* 프로필 */}
            <div style={{marginTop:'20px', height:'10vh'}}>
              <div style={{float:'left', marginLeft:'3vw', height:'10vh'}}>
                <img src={details.profile} className='profileBox-small'/>
              </div>
              <span className='font-content font-bold font-block' style={{width:'70vw', textAlign:'start', fontSize:'18px', float:'left', lineHeight:'5vh', marginLeft:'5vw'}}>{details.writer}</span>
              <span className='font-content' style={{width:'70vw', textAlign:'start', fontSize:'11px', color:'#aaaaaa', float:'left', lineHeight:'1vh', marginLeft:'5vw'}}>{handleTime(details.regdate)}</span>
            </div>
            {/* 제목 및 내용 */}
            <div className='font-content font-bold' style={{fontSize:'19px', textAlign:'start', marginLeft:'3vw', marginRight:'3vw'}}>{details.title}</div>
            <div className='font-content'           style={{fontSize:'14px', textAlign:'start', marginLeft:'3vw', marginRight:'3vw'}}>{details.content}</div>
            
            <hr/>
            
            {/* 펀딩 정보 */}
            <div className='font-content' style={{width:'90vw', marginTop:'1vh', height:'3vh', marginLeft:'3vw'}}>
              <span style={{float:'left', color:'#bbbbbb', width:'20vw', textAlign:'start'}}>카테고리</span>
              <span style={{float:'left'}}>{details.category}</span>
            </div>
            <div className='font-content' style={{width:'90vw', marginTop:'1vh', height:'3vh', marginLeft:'3vw'}}>
              <span style={{float:'left', color:'#bbbbbb', width:'20vw', textAlign:'start'}}>상품명</span>
              <span style={{float:'left'}}>{details.option}</span>
            </div>
            <div className='font-content' style={{width:'90vw', marginTop:'1vh', height:'3vh', marginLeft:'3vw'}}>
              <span style={{float:'left', color:'#bbbbbb', width:'20vw', textAlign:'start'}}>프딩일</span>
              <span style={{float:'left'}}>{details.regdate.substr(0,10)}</span>
            </div>
            <div className='font-content' style={{width:'90vw', marginTop:'1vh', height:'3vh', marginLeft:'3vw'}}>
              <span style={{float:'left', color:'#bbbbbb', width:'20vw', textAlign:'start'}}>마감일</span>
              <span style={{float:'left'}}>🗓️{details.enddate.substr(0, 10)} / {handleDetailDate(details.enddate)}</span>
            </div>

            <hr/>

            {/* 텍스트 */}
            <div style={{textAlign:'start'}}>
              <span className='font-content font-bold' style={{display:'block', marginLeft:'3vw', fontSize:'18px'}}>프딩 게이지</span>
              <span className='font-content' style={{display:'block', marginLeft:'3vw', fontSize:'14px'}}>친구의 프딩 게이지를 채워 주세요!🔥</span>
            </div>

            {/* 퍼센트 */}
            <div style={{marginLeft:'3vw', marginTop:'3vh'}}>
              <div style={{width:'92vw', textAlign:'center'}}>
                <span className='font-content' style={{fontSize:'14px', color:'#777777', float:'left'}}>0원</span>
                <span className='font-content' style={{fontSize:'14px', color:'#777777', float:'right'}}>{details.goal}원</span>
              </div>
              <br/>
              <div style={{position:'absolute', overflow:'hidden', width:'92vw', height:'3vh', backgroundColor:'#eeeeee', borderRadius:'15px 15px 15px 15px'}}>
                <div style={handlePercentage()}></div>
              </div>
              <br/>
              <div style={{width:'92vw', textAlign:'center', marginTop:'3vh'}}>
                <span className='font-content' style={{fontSize:'14px', color:'#777777', float:'left'}}>0%</span>
                <span className='font-content' style={{fontSize:'14px', color:'#777777', }}>            50%</span>
                <span className='font-content' style={{fontSize:'14px', color:'#777777', float:'right'}}>100%</span>
              </div>
            </div>

            {/* 텍스트 */}
            <div style={{textAlign:'start', marginTop:'5vh'}}>
              <span className='font-content font-bold' style={{marginLeft:'3vw', fontSize:'18px', lineHeight:'14px'}}>참여 중인 친구</span>
              <span className='font-content font-bold' style={{marginLeft:'1vw', fontSize:'14px', lineHeight:'14px'}}>{details.count} 명</span>
            </div>

            {/* 참여중인 친구 */}
            <div style={{textAlign:'start', marginTop:'3vh', marginLeft:'3vw'}}>
              {orders.map((idx)=>(
                <div key={idx.idx + idx.regdate} style={{height:'8vh'}}>
                  <img src={idx.profile} className='profileBox-small' style={{float:'left'}}/>
                  <div style={{float:'left', height:'8vh'}}>
                    <span className='font-content' style={{display:'block', marginTop:'0', marginLeft:'2vw', lineHeight:'4vh'}}>{idx.member}</span>
                    <span className='font-content' style={{marginBottom:'3vh', marginLeft:'2vw', lineHeight:'3vh', fontSize:'12px', color:'#777777'}}>{idx.message}</span>
                  </div>
                  <span className='font-content' style={{float:'right', fontSize:'14px', color:'#777777'}}>{handleTime(idx.regdate)}</span>
                </div>
              ))}
            </div>

            {/* FooterMap */}
            <div style={{width:'90%', height:'10vh'}}>
            </div>

          </div>
        </div>}
        </div>
        <footer onClick={()=>{handlePay()}} style={{cursor:'pointer'}}>
          <div style={{width:'100vw', height:'10vh', textAlign:'center', backgroundColor:'#496D68', paddingTop:'3vh', borderRadius:'20px 20px 0px 0px'}}>
              <span className='font-bold font-content' style={{fontSize:'20px', color:'#FFFFFF'}}>프딩 참여하기</span>
          </div>
        </footer>
    </div>
  )
}

export default ProductDetail