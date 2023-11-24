import React, { useRef,useState, useEffect }  from 'react'
import { useNavigate, useLocation} from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import FooterNavbar from '../component/FooterNavbar';
import Greenheader from '../component/Greenheader';
import Card from 'react-bootstrap/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { FreeMode, Pagination } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';

const Home = ({basicUrl}) => {

  const navigate = useNavigate();
  const {state} = useLocation();

  const [showButtons, setShowButtons] = useState(false);

  const [appKey, setAppKey] = useState("");

  const joinMembership = () => {
    navigate('/Login');
  }

  useEffect(() => {
    // console.log(state);
    // axios.get(basicUrl + "/login/oauth2/code/kakao"
    // ).then((res)=>{
    //   console.log(res);
    //   setAppKey(res.data.key);
    // }).catch((error)=>{
    //   console.log(error);
    // });

},[]);

  return (
    <div className="full-screen all-all-screen">
      
      <Greenheader></Greenheader>
      <div className='all-screen' >
        <div className='main-items profile-mainment' style={{display: 'flex'}}>
            <div className='row-align' style={{whiteSpace:'nowrap', textAlign:'left'}}>{state.name}님,<br></br>🎓졸업까지 30일 남았어요!</div>
            <div><img src={state.profile} className='row-align'></img></div>
        </div>
        <div className='main-items gift-button-box'>
            <button className='writeButton'style={{marginTop:'1.5vh'}} onClick={()=>navigate("/write")}>
                <p style={{marginTop:'0.4vh'}}>+</p>
            </button>
            <div style={{marginTop:'1.5vh', fontFamily:'pretendard-regular'}}>원하는 선물 등록하기</div>
        </div>
        <div className='main-items best-ten'>
            <div className='mainGiftText'>인기 선물 TOP 10</div>
            <div className='card-box-main'>
                <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    slidesPerView={2}
                    modules={[Scrollbar]}
                    className="mySwiper"
                    spaceBetween={70}
                    freeMode={false}
                    pagination={{
                    clickable: true,
                    }}
                    
                >
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div className='main-items best-ten'>
            <div className='mainGiftText'>이런 선물은 어때요?</div>
            <div className='card-box-main'>
            <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    slidesPerView={2}
                    modules={[Scrollbar]}
                    className="mySwiper"
                    spaceBetween={70}
                    freeMode={false}
                    pagination={{
                    clickable: true,
                    }}
                    
                >
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8">Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title>Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title>Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/dodo.jpg" height="110px" />
                        <Card.Body className="p-2" >
                            <Card.Title>Apple 에어팟 3세대</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
      </div>


      <FooterNavbar></FooterNavbar>
    </div>
    

  )
}

export default Home