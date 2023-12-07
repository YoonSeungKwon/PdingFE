import React from 'react'
import { useNavigate } from 'react-router-dom';

const SavedGifts = () => {
    const navigate = new useNavigate();
    const userEmail = localStorage.getItem('userEmail');


  return (
    <>
    <div className="full-screen all-all-screen">
        <div className='all-screen' >
          <div className='mypageHeader' >
            <div style={{position:'relative', height:'100%'}}>
              <div style={{height:'53px'}}></div>
              <div className='mypageheadertxt'>
              <div style={{position:'absolute', width:'7vw', float:'left', cursor:'pointer'}} onClick={()=>{navigate(-1)}}>
                    <img src='/img/arrow-left-black.png' className='back-btn'/>
                </div>찜한 선물<img src='/img/arrow-left.png' onClick={()=>navigate("/mypage/"+userEmail)} className='mypageHeaderimg' style={{width:'26.26px', height:'24px'}}></img></div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default SavedGifts