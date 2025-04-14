import { Box, Typography } from "@mui/material"
import { useForm, Controller } from "react-hook-form";
import { FetchApi } from "../../../api/useAxios";
const NewUser=()=>{
interface FormData {
    usuario: string;
    correo: string;
    clave: string;
}
    return(
    <Box>
        <Typography variant="h5" textAlign={"center"}>
            Editar Usuario
        </Typography>
    </Box>

    )
}
export default NewUser