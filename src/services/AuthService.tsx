import axios, { AxiosResponse } from 'axios';
import {UserProfileToken } from '../models/user';
const api="https://webapiaudiencia.azurewebsites.net/api";

type LoginRequestBody = {
    Correo: string;
    Clave: string;
  };


export const login = async (email: string, password: string) => {
  
    try{
        const response = await axios.post<UserProfileToken,AxiosResponse<UserProfileToken>,LoginRequestBody>(`${api}/Acesso/login`, {
            Correo: email,
            Clave: password,
          });
          console.log(response.data);
          return response.data;
    
    }catch(error:any){
        console.error("Error en la autentificacion", error);
        throw error.response?.data?.message || error.message;
    }
    
}