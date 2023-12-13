import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const Pay = ({basicUrl}) =>{


    const state = useLocation();
    const formatter = new Intl.NumberFormat('en-US');
    const navigate = useNavigate();

    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [cost, setCost] = useState(0);

    useEffect(()=>{
        console.log(state)
        setDetails(state.state[0])
    },[])

    const btnColor1 ={
        width:'100%',
        height:'100%', 
        borderRadius:'5px 5px 5px 5px', 
        textAlign:'center', 
        lineHeight:'5vh', 
        cursor:'pointer',
        backgroundColor:'#777777'
    }

    const btnColor2 = {
        width:'100%',
        height:'100%', 
        borderRadius:'5px 5px 5px 5px', 
        textAlign:'center', 
        lineHeight:'5vh', 
        cursor:'pointer',
        backgroundColor:'#496D68'
    }


    const handleDetailDate = (enddate) =>{
        const now = new Date(); 
        const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
        if(temp.getTime() - now.getTime() < 0)
          return '종료';
        return Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24));
      }

    const handlePay = () => {
    const data = {
      'projectIdx':state.state[1],
      'total': cost,
      'message': message
    }
    axios.post(basicUrl + '/api/v1/orders/', data
    ).then((res)=>{
      console.log(res)
      window.location.href = res.data;
    }).catch((error)=>{
      console.log(error)
    })
  }


    return(
        <div style={{margin:'0 auto', width:'90vw'}}>
            {/* 타이틀 */}
            <div style={{marginTop:'5vh', height:'5vh'}}>
                <div style={{width:'10vw', float:'left', lineHeight:'5vh', cursor:'pointer'}} onClick={()=>{navigate(-1)}}>
                    <img src='/img/arrow-left-black.png' className='back-btn'/>
                </div>
                <div style={{width:'70vw', textAlign:'center', float:'left'}}>
                    <span className='font-content font-bold' style={{fontSize:'20px', lineHeight:'5vh'}}>결제하기</span>
                </div>
            </div>

            {/* 상품 프로필 */}
            <div style={{marginTop:'4vh', height:'12vh', float:'none'}}>
                <div style={{width:'30vw', float:'left', height:'12vh', overflow:'hidden'}}>
                    <img src={details.img} style={{width:'30vw', borderRadius:'5px 5px 5px 5px'}}/>
                </div>
                <div style={{width:'55vw', float:'left', textAlign:'start', marginLeft:'5vw'}}>
                    <img src={details.profile} className="profileBox-small" style={{width:'3vh', height:'3vh'}}/>
                    <span className='font-content' style={{fontSize:'14px', marginLeft:'3vw'}}>{details.writer}</span>
                    <span className='font-content' style={{display:'block', fontSize:'14px', marginTop:'0.5vh'}}>{details.title}</span>
                    <span className='font-content' style={{fontSize:'14px', marginTop:'0.5vh'}}>{formatter.format(details.goal)}원 
                        {details&&
                        <span style={{color:'#777777', marginLeft:'2vw', fontSize:'12px', lineHeight:'12px'}}>
                        {parseInt((details.curr/details.goal)*100)}% 진행중 · <span style={{color:'red'}}>{handleDetailDate(details.enddate)}</span> 일 남음
                        </span>}
                    </span>
                </div>
            </div>

            {/* 메시지 */}
            <div style={{height:'25vh', marginTop:'5vh', float:'none'}}>
                <div>
                    <span className="font-content font-bold" style={{fontSize:'15px'}}>축하 메시지</span>
                </div>
                <textarea placeholder='축하 메시지를 입력해 주세요.' className='font-content' style={{width:'100%', height:'20vh', fontSize:'12px', outline:'none'
                , border:'1px solid #CCCCCC', borderRadius:'5px 5px 5px 5px', padding:'15px'}} value={message} onChange={(e)=>{setMessage(e.target.value)}}/>                    
            </div>

            {/*결제 수단*/}
            <div style={{height:'15vh', marginTop:'1vh', float:'none'}}>
                <div>
                    <span className="font-content font-bold" style={{fontSize:'15px'}}>결제 수단</span>
                </div>
                <hr />
                <div style={{height:'2vh'}}>
                    <input type="radio" style={{marginLeft:'3vw', height:'1vh'}}/>
                    <span className='font-content font-bold' style={{marginLeft:'4vw', fontSize:'14px'}}>카카오페이</span>
                </div>
                <hr />
            </div>
            
            {/* 최종 금액 */}
            <div style={{marginTop:'3vh', height:'5vh'}}>
                <span className='font-content font-bold' style={{position:'absolute', left: '7vw', marginTop:'1.5vh', color:'#496D68', fontSize:'14px'}}>최종 펀딩 금액</span>
                <span className='font-content font-bold' style={{position:'absolute', right:'7vw', marginTop:'1.5vh', fontSize:'14px'}}>원</span>
                <input type='number' style={{width:'100%', height:'5vh', border:'2px solid #CCCCCC', borderRadius:'5px 5px 5px 5px', textAlign:'end'
                , paddingRight:'10vw',fontSize:'14px', lineHeight:'14px', outline:'none'}} value={cost} onChange={(e)=>{setCost(e.target.value)}}/>
            </div>
            
            {/* 동의 항목 */}
            <div style={{width:'100%', height:'6vh', marginTop:'3vh'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <input type='checkbox' value={isChecked} onChange={()=>setIsChecked(!isChecked)}/>
                    <span className='font-content font-bold' style={{marginLeft:'3vw'}}>[필수] 개인 정보 제 3자 제공 동의</span>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <input type='checkbox'/>
                    <span className='font-content font-bold' style={{marginLeft:'3vw'}}>[선택] 프딩 소식 및 혜택 받아보기</span>
                </div>
            </div>

            {/* 결제 버튼 */}
            <div style={{width:'100%', height:'5vh', marginTop:'5vh'}}>
                <div className={`${isChecked?'btnColor2':'btnColor1'}`}
                onClick={()=>{if(isChecked)handlePay()}}>
                    <span className='font-content' style={{color:'#FFFFFF', fontSize:'14px'}}>{cost}원 펀딩하기</span>
                </div>
            </div>

        </div>
    )


}
export default Pay;