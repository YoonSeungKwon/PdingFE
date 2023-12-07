import React, { useRef,useState, useEffect,setState }  from 'react'
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
  const userProfile = localStorage.getItem('userProfile');
  const userName = localStorage.getItem('userName');

  const joinMembership = () => {
    navigate('/Login');
  }

  useEffect(() => { 
    if(localStorage.getItem('userEmail') === null){
        alert('로그인이 필요한 서비스입니다.')
        navigate('/Login')
    }
     console.log({state});
},[]);

  return (
    <div className="full-screen all-all-screen">
      <Greenheader></Greenheader>
      
      <div className='all-screen' >
        <div className='main-items profile-mainment' style={{display: 'flex'}}>
            <div className='row-align' style={{whiteSpace:'nowrap', textAlign:'left'}}>{userName}님,<br></br>🎓<b>졸업</b>까지 <b style={{color:'#F54E3F'}}>30</b>일 남았어요!</div>
            <div><img src={userProfile} className='row-align profileBox'></img></div>
        </div>
        <div className='main-items gift-button-box'>
            <button className='writeButton'style={{marginTop:'2vh'}} onClick={()=>navigate("/write")}>
                <span style={{fontSize:'30px', lineHeight:'30px'}}>+</span>
            </button>
            <div className='wantedGift'>원하는 선물 프딩하러 가기</div>
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
                    slidesOffsetAfter={75}
                    pagination={{
                    clickable: true,
                    }}
                    
                >
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/airpod.png"  height="100px" width="160px" />
                        <Card.Body className="p-2 border-0" >
                            <Card.Title className="fs-8  text-truncate">Apple 에어팟 3세대 2022년형</Card.Title>
                            <Card.Title className="fs-8">235,690원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #음악 #힐링
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/camera.png"  height="100px" width="160px" />
                        <Card.Body className="p-2">
                            <Card.Title className="fs-8 text-truncate">인스탁스 미니12 + 필름 10매</Card.Title>
                            <Card.Title className="fs-8">129,000원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #사진 #감성
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/nintendo.jpg"  style={{borderRadius:'5px'}} height="100px" width="160px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8 text-truncate">닌텐도 스위치 본체 모여봐요 동물의 숲 에디션</Card.Title>
                            <Card.Title className="fs-8">365,000원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #게임 #취미
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/adidas.jpg"  style={{borderRadius:'5px'}} height="100px" width="160px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8 text-truncate">Adidas 가젤 볼드 W</Card.Title>
                            <Card.Title className="fs-8 text-truncate">139,000원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #신발 #패션
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
                    slidesOffsetAfter={75}
                    pagination={{
                    clickable: true,
                    }}
                    
                >
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/perfume.jpg" style={{borderRadius:'5px'}}  height="100px" width="160px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8 text-truncate">바이레도 집시워터 오 드 퍼퓸</Card.Title>
                            <Card.Title className="fs-8 text-truncate">269,280원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #향수 #포근
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/applewatch.jpg" style={{borderRadius:'5px'}}  height="100px" width="160px" />
                        <Card.Body className="p-2" >
                            <Card.Title className="fs-8 text-truncate">Apple 2023 애플워치 SE 2세대</Card.Title>
                            <Card.Title className="fs-8 text-truncate">329,000원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #스마트워치 #패션
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/coffee.jpg"  style={{borderRadius:'5px'}} height="100px" width="160px" />
                        <Card.Body className="p-2" >
                        <Card.Title className="fs-8 text-truncate">캡슐 커피머신 돌체구스토</Card.Title>
                        <Card.Title className="fs-8 text-truncate">89,900원</Card.Title>
                            <Card.Text style={{color:'#7DA79D'}}>
                            #커피 #휴식
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card className='cardsMain'>
                        <Card.Img variant="top" src="/img/mainItems/marshall.jpg"  style={{borderRadius:'5px'}} height="100px" width="160px" />
                        <Card.Body className="p-2" >
                        <Card.Title className="fs-8 text-truncate">마샬 스탠모어 III 무선 블루투스 스피커</Card.Title>
                        <Card.Title className="fs-8 text-truncate">255,500원</Card.Title>
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