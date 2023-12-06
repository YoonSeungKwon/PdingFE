import { useNavigate } from "react-router-dom"

const Success = () =>{

    const navigate = new useNavigate();

    const handleHome = () =>{
        navigate('/home/'+localStorage.getItem('userEmail'))
    }

    return(
        <>
            <div style={{margin:'0 auto', textAlign:'center', marginTop:'30vh'}}>
                <div className="font-content " style={{fontSize:'40px'}}>결제가 완료되었습니다.</div>
                <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'10vh'}}>
                    <div style={{width:'300px', height:'50px', backgroundColor:'#496D68', lineHeight:'50px', borderRadius:'10px 10px 10px 10px'}}
                    onClick={()=>{handleHome()}}>
                        <span className="font-content font-bold" style={{fontSize:"15px", color:'#FFFFFF'}}>
                         홈으로
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Success;