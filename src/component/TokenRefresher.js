import axios, { AxiosError } from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function TokenRefresher(){
    
    const navigate = new useNavigate();

    
    const basicUrl = 'http://13.209.154.183:8080';
    // const basicUrl = 'http://localhost:8080';

    useEffect(()=>{
        axios.interceptors.request.use((req)=>{
            const token = localStorage.getItem('acc_token');
            if(token){
                req.headers.setAuthorization('Bearer ' + token);
            }

            return req;
        }, (error)=>{
            return Promise.reject(error);
        })


        axios.interceptors.response.use(
            (res) => {return res},
                async (error) => {
                   if(error.response.data.status === 'ACCESS_TOKEN_EXPIRED'){
                        console.log('ACCESS_TOKEN_EXPIRED');
                        const token = localStorage.getItem('ref_token');
                        await axios.get(basicUrl + "/api/v1/", {headers:{
                    'X-Refresh-Token': 'Bearer ' + token
                }}).then((response)=>{
                    const acc_token = response.headers.get('Authorization');
                    localStorage.setItem('acc_token', acc_token);
                }).catch(error=>{
                    return Promise.reject(error);
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
            else if(error.response.status === 401){
                alert('로그인이 필요한 서비스입니다.')
                navigate('/Login')
            }
            else{
                return Promise.reject(error);
        }})

        },[]);

}