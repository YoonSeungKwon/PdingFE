import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Basket = ({basicUrl}) => {
  const [projectList, setProjectList] = useState([]);
  const {state} = useLocation();
  const now = new Date();

  useEffect(()=>{
    console.log(state);
    if (state && state.length > 1) {
    axios.get(basicUrl+'/api/v1/' + state[0] + '/social=' + state[1] + '/projects/'
    ).then((res)=>{
      const list = res.data;
      console.log(list);
      setProjectList(list);
    }).catch((error)=>{
      console.log(error);
      setProjectList([]);
    });
  } else{
    console.error("Invalid state: ", state);
  }}, [state]);

  const handleDate = (enddate) =>{
    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    console.log(enddate)
    if(temp.getTime() - now.getTime() < 0)
      return '종료';
    return '종료까지' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) 
    + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시 ' + Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) / (1000 * 60)) + '분';
  }

  return (
    <div className='category_wrap' style={{margin:'0px auto', marginTop:'50px', marginLeft:'200px' }}>
        {projectList.map((idx)=>(
          <div key={idx.img} style={{border:'1px solid black', width:'500px', height:'400px', textAlign:'center', marginTop:'20px', marginLeft:'100px', float:'left'}}>
            <h2 style={{marginTop:'20px'}}>{idx.title}</h2>
            <div><img src={idx.img}  style={{width:'200px'}}/></div>
            <h4>{(idx.curr*100) / idx.goal}%</h4>
            <h4>{handleDate(idx.enddate)}</h4>
          </div>
        ))}
      </div>
  )
}

export default Basket