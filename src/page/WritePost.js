import React, { useState } from 'react'
import axios from 'axios';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';
import { useNavigate } from 'react-router-dom';

const WritePost = ({basicUrl}) => {

  const formData =  new FormData();
  const navigate = new useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [goal, setGoal] = useState(0);
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("");
  const [link, setLink] = useState("");
  const [enddate, setEndDate] = useState();
  const [file, setFile] = useState("");

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value === 'notSelected' ? '' : e.target.value;
    setCategory(selectedValue);
  };
  
  const handleSubmit = () =>{
    const data = {
      'title':title,
      'content':content,
      'category':category,
      'option':option,
      'link':link,
      'goal':goal,
      'enddate':enddate,
    }
    console.log(data)
    formData.append('file', file)
    formData.append("dto",new Blob([JSON.stringify(data)], {type:'application/json'}))
    console.log(formData)

    axios.post(basicUrl + '/api/v1/projects/', formData, {
      headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'},
    }
    ).then((res)=>{
      console.log(res);
      alert('프딩을 게시하였습니다')
      navigate(-1)
    }).catch((error)=>{
      console.log(error)
    });
  }

  return (
    <>
    <div className='full-screen all-all-screen'>
    <Greenheader></Greenheader>
    <div className='all-screen' style={{paddingLeft:'2vh'}}>
      <div style={{fontFamily:'pretendard-medium', fontSize:'20px', fontWeight:'500'}}>프딩 생성</div>
      <div>
        <div className='Formstyle'>대표 사진<h style={{color:'red'}}>*</h></div>
           <div><input type='file' className='photosubmit' onChange={e => setFile(e.target.files[0])} accept='image/*'/></div>
      </div>
      <div>
        <div className='Formstyle'>제목<h style={{color:'red'}}>*</h></div>
           <div><input value={title} style={{fontSize:'14px'}}  className='FundingBox' placeholder='프딩의 제목을 작성해 주세요.' onChange={e=>setTitle(e.target.value)}/></div>
      </div>
      <div>
        <div className='Formstyle'>소개글<h style={{color:'red'}}>*</h></div>
           <div><input value={content}  style={{fontSize:'14px'}}  className='FundingBox' placeholder='프딩을 위한 소개글을 작성해 주세요.'   onChange={e=>setContent(e.target.value)}/></div>
      </div>
      <div style={{paddingBottom:'2vh'}}>
        <div className='Formstyle' style={{paddingRight:'3vh', marginLeft:'-1vh'}} >카테고리<h style={{color:'red'}}>*</h></div>
          <select className='dropbtn' value={category} onChange={handleCategoryChange}>
            <option value="none" >카테고리를 선택해 주세요.</option>
            <option value="생일">🎂생일</option>
            <option value="졸업">🎓졸업</option>
          </select>
           {/* <div><input value={category} style={{fontSize:'14px'}}   onChange={e=>setCategory(e.target.value)}/></div> */}
      </div>
      <div>
        <div className='Formstyle'>URL<h style={{color:'red'}}>*</h></div>
           <div><input value={link} style={{fontSize:'14px'}}  className='FundingBox' placeholder='받고 싶은 선물의 URL을 입력해 주세요.'   onChange={e=>setLink(e.target.value)}/></div>
      </div>
      <div>
        <div className='Formstyle'>상품명<h style={{color:'red'}}>*</h></div>
           <div><input value={title} style={{fontSize:'14px'}}    className='FundingBox' placeholder='받고 싶은 선물의 상품명을 입력해 주세요.'    onChange={e=>setTitle(e.target.value)}/></div>
      </div>
      <div>
        <div className='Formstyle'>옵션</div>
           <div><input value={option} style={{fontSize:'14px'}}   className='FundingBox'  placeholder='받고 싶은 선물의 옵션이 있다면 입력해 주세요. (색상, 사이즈 등)'   onChange={e=>setOption(e.target.value)}/></div>
      </div>
      <div>
        <div className='Formstyle'>목표 금액<h style={{color:'red'}}>*</h></div>
           <div><input value={goal} className='FundingBox' placeholder='프딩의 목표 금액을 입력해 주세요.'     onChange={e=>setGoal(e.target.value)} type='number'/></div>
      </div>
      <div>
        <div className='Formstyle'>마감일 날짜<h style={{color:'red'}}>*</h></div>
           <div><input value={enddate}    onChange={e=>setEndDate(e.target.value)} type='date'/></div>
      </div>
      <div style={{textAlign:'center',display:'flex', justifyContent:'center', paddingBottom:'2vh', marginLeft:'-1.5vh'}}>
          <button  className='cancelButton'>취소</button>
          <input className='submitButton' value="프딩 생성하기" type='submit' onClick={handleSubmit}/>
      </div>
      </div>
      <FooterNavbar></FooterNavbar>
      </div>
    </>
  )
}

export default WritePost