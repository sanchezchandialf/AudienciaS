import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { display } from "@mui/system";
import React from "react"
import { string } from "yup";

type BotonOpciones={
    titulo:string,
    contenido:string;
    icono:React.ReactNode
    
    
}

const ButtonOp: React.FC<BotonOpciones>=({titulo,contenido,icono}) => {
    return (
    <>
    <Card
        sx={{
        
        display:"flex",
        alignItems:"center",
        padding:2,
        gap:2,
        boxShadow:3,
        borderRadius:"4",
        ":hover":{boxShadow:6},    


        }
        }
    >
        <Box sx={{ fontSize: 40 }}>{icono}</Box>
        <CardContent>
           
        <Typography sx={{variant:"h4"}}color="info" >
                {titulo}
        </Typography>
        <Typography sx={{variant:"subtitle1"}}>{contenido}</Typography>
   



        </CardContent>
           




    </Card>

    </>
    )
   

}

export default ButtonOp