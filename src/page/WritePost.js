import React, { useState } from 'react'
import axios from 'axios';

const WritePost = ({basicUrl}) => {

  const formData =  new FormData();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [goal, setGoal] = useState(0);
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("");
  const [link, setLink] = useState("");
  const [enddate, setEndDate] = useState();
  const [file, setFile] = useState("");
  
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

    axios.post(basicUrl + '/api/v1/test@test.com/social=false/projects/', formData, {
      headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'},
    }
    ).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error)
    });
  }

  return (
    <>
      제목:     <input value={title}      onChange={e=>setTitle(e.target.value)}/><br/>
      내용:     <input value={content}    onChange={e=>setContent(e.target.value)}/><br/>
      카테고리: <input value={category}   onChange={e=>setCategory(e.target.value)}/><br/>
      옵션:     <input value={option}     onChange={e=>setOption(e.target.value)}/><br/>
      링크:     <input value={link}       onChange={e=>setLink(e.target.value)}/><br/>
      목표금액: <input value={goal}       onChange={e=>setGoal(e.target.value)} type='number'/><br/>
      마감일:   <input value={enddate}    onChange={e=>setEndDate(e.target.value)} type='date'/><br/>
      <input type='file' onChange={e => setFile(e.target.files[0])} accept='image/*'/>
      <input value="제출" type='submit' onClick={handleSubmit}/>
    </>
  )
}

export default WritePost