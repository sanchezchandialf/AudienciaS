import axios from 'axios';

const api="https://localhost:7255/api";

export const login = async (email: string, password: string) => {
  
    try{
        const response = await axios.post(`${api}/Acesso/login`, {
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