import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function TokenRefresher(){
    
    const navigate = new useNavigate();

    useEffect(()=>{
        axios.interceptors.request.use((req)=>{
            const token = localStorage.getItem('acc_token');
            if(token){
                req.headers.setAuthorization('Bearer ' + token);
            }

            return req;
        }, (error)=>{
            console.log(error)
        })


        axios.interceptors.response.use(
            (res) => res,
            async (error) => {
            if(error.response.status !== 401){
                console.log(error)
            }
            else if(error.response.data.status === 'ACCESS_TOKEN_EXPIRED'){
                console.log('ACCESS_TOKEN_EXPIRED');
                const token = localStorage.getItem('ref_token');
                await axios.get("http://13.209.154.183:8080/api/v1/", {headers:{
                    'X-Refresh-Token': 'Bearer ' + token
                }}).then((response)=>{
                    const acc_token = response.headers.get('Authorization');
                    localStorage.setItem('acc_token', acc_token);
                })
                error.response.headers.setAuthorization('Bearer ' + localStorage.getItem('acc_token'));
                return axios(error.config);
            }
            else if(error.response.data.status === 'REFRESH_TOKEN_EXPIRED'){
                console.log('REFRESH_TOKEN_EXPIRED');
                alert('로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.')
                localStorage.removeItem('acc_token')
                localStorage.removeItem('ref_token')
                navigate("/login")
            }
            else{
                console.log('401');
                Promise.reject(error);
        }})

        },[]);

}