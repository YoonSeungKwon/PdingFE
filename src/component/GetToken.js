import axios from 'axios';

export const auto = axios.create({
    url:'http://13.209.154.183:8080/api/v1/members',
});

auto.interceptors.request.use((config)=>{
    config.headers["Authorization"] = localStorage.getItem("acc_token");
    config.headers["x-refresh-token"] = localStorage.getItem("ref_token");
    return config;
});

instance.interceptors.response.use((response)=>{
    if (res.headers["authorization"]){
        localStorage.removeItem("acc_token");
        localStorage.setItem("acc_token", response.headers.authorization);
    }
    else if (response.data.error == "INVAILD_TOKEN"){
        localStorage.removeItem("acc_token");
        localStorage.removeItem("ref_token");
    }
    return response;
})