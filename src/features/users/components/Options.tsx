import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { BrowserRoutes } from "../../../router/BrowserRoutes"

const Data=[

{
    title:"Editar Contraseña",
    description:"Actualiza tu contraseña",
    path:"/editpassword",
},
{
    title:"Agregar Usuario",
    description:"Agrega un nuevo usuario",
    path:BrowserRoutes.NEWUSER,

},
{
    title:"Eliminar Usuario",
    description:"Elimina un usuario",
    path:"/deleteuser"
}

]

    
const OptionsUsers = () =>{

    const navigator = useNavigate()
    return(

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            {Data.map((option, index) => (
                <Box key={index} sx={{margin: 2, padding: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, width: '100%', maxWidth: 400, textAlign: 'center', boxShadow: 3 }}>
                    <Typography variant="h6">{option.title}</Typography>
                    <Typography variant="body1">{option.description}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigator(option.path)}
                        sx={{ mt: 1 }}
                    >
                        Ir
                    </Button>
                </Box>
            ))}
        </Box>


    )

}

export default OptionsUsers