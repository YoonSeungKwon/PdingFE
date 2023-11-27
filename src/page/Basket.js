import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Basket = ({basicUrl}) => {

  const now = new Date();
  const {state} = useLocation();
  const [project, setProject] = useState([]);

  const navigate = new useNavigate();

  useEffect(()=>{
    axios.get(basicUrl + '/api/v1/' + state[0] + '/social=' + state[1] + '/projects/'
    ).then((res)=>{
      const list = res.data;
      console.log(list);
      setProject(list);
    }).catch((error)=>{
      console.log(error);
      setProject([]);
    })
  }, []);

  const handleDate = (enddate) =>{

    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    if(temp.getTime() - now.getTime() < 0)
      return '종료';

    return '종료까지' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시 ' + Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) / (1000 * 60)) + '분';
  }

  const handleProductPage = (idx) =>{
    navigate('/details/'+idx, {state:[state[0],state[1], idx]});
  }


  return (
    <>
      <div className='category_wrap' style={{margin:'0px auto', marginTop:'50px', marginLeft:'200px' }}>
        {project.map((idx)=>(
          <div key={idx.img} style={{border:'1px solid black', width:'500px', height:'400px', textAlign:'center', marginTop:'20px', marginLeft:'100px', float:'left'}}>
            <h2 style={{marginTop:'20px'}}>{idx.title}</h2>
            <div><img src={idx.img}  style={{width:'200px'}}/></div>
            <h4>{(idx.curr*100) / idx.goal}%</h4>
            <h4>{handleDate(idx.enddate)}</h4>
            {/* <input value={pay} onChange={e=>setPay(e.target.value)} type='number' />:금액 */}
            <button onClick={()=>handleProductPage(idx.idx)}>보기</button>
          </div>  
        ))}
      </div>
    </>
  )
}

export default Basket