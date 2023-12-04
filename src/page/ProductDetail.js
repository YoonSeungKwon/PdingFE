import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const ProductDetail = ({basicUrl}) => {

  const {state} = useLocation()
  const [now, setNow] = useState(new Date());
  const [cost, setCost] = useState(0);
  const [details, setDetails] = useState();
  const idxUser = localStorage.getItem('idxUser');
  const userEmail = localStorage.getItem('userEmail');
  const oauth = localStorage.getItem('oauth');

  useEffect(()=>{
    axios.get(basicUrl + '/api/v1/' + userEmail + '/social=' + oauth + '/projects/' + idxUser
    ).then((res)=>{
      console.log(res);
      setDetails(res.data);

      setInterval(()=>{
        setNow(new Date())
      },1000)

    }).catch((error)=>{
      console.log(error);
    })
  }, []);

  const handleDetailDate = (enddate) =>{
    const temp = new Date(enddate.substr(0, 10)+' '+enddate.substr(11, 8)); 
    if(temp.getTime() - now.getTime() < 0)
      return '종료';

    return '종료까지   ' + Math.floor((temp.getTime() - now.getTime()) / (1000*60*60*24)) + '일 ' + Math.floor(((temp.getTime() - now.getTime()) % (1000*60*60*24)) / (1000*60*60))
    + '시 ' + Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) / (1000 * 60)) + '분 ' + parseInt(Math.floor((((temp.getTime() - now.getTime()) % (1000*60*60*24)) % (1000*60*60)) % (1000 * 60))/1000) +'초';
  }

  const handlePay = () => {
    const data = {
      'projectIdx':state[2],
      'total': cost
    }
    axios.post(basicUrl + '/api/v1/orders/', data
    ).then((res)=>{
      console.log(res)
      const popup = window.open(res.data, '_blank', 'width=screen.width/4, height=screen.height/4');
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div style={{width:'100%', height:'100%', margin:'0 auto', padding: '0', textAlign: 'center'}}>
      {details&&
        <div style={{marginTop:'100px'}}>
          <div style={{height:'300px'}}><img src={details.img} style={{height:'300px'}}/></div>
          <div>제목:   {details.title}</div>
          <div>메세지:   {details.content}</div>
          <div>목표금액: {details.goal}</div>
          <div>현재: {(details.curr/details.goal) * 100}%</div>
          <div>{handleDetailDate(details.enddate)}</div>
          <hr/>
          마음 전달하기: <input value={cost} onChange={(e)=>{setCost(e.target.value)}} type='number'/>원
          <button onClick={()=>{handlePay()}}>결제하기</button>
        </div>}
    </div>
  )
}

export default ProductDetail