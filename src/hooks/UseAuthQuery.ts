import { useQuery } from "react-query"
import axiosInstance from "../components/config/axios.config"

import { AxiosRequestConfig } from "axios"

interface IUseAuthQuery {
    queryKey:string[],
    url:string,
    config?:AxiosRequestConfig
}

const UseAuthQuery = ({queryKey , config , url}:IUseAuthQuery)=>{
    return useQuery({
        queryKey:queryKey ,
        queryFn:async()=>{
          const {data} = await axiosInstance.get(url , config)
          return data.todolists
        }
       })
}

export default UseAuthQuery