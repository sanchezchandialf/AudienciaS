import react, { useEffect, useState } from 'react';
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Box, TextField } from '@mui/material';

const EditView: React.FC = () => {
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudiencias = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            const response = await FetchApi<Audiencia[]>({
                path: "/Form",
                method: "GET",
                requiresAuth: true,
                token: token || "",
            });

            if (response.code === 200 && response.data) {

                setAudiencias(response.data);
            } else {
                setError(response.message);
            }
            setLoading(false);
        };

        fetchAudiencias();
    }, []);

    return (
        <Box>
            {audiencias.map((audiencia) => (
            <Box key={audiencia.idAudiencia} sx={{ mb: 2 }}>
                {Object.entries(audiencia).map(([key, value]) => (
                <TextField
                    key={key}
                    variant="outlined"
                    label={key}
                    value={value}
                    fullWidth
                    margin="normal"
                />
                ))}
            </Box>
            ))}
        </Box>



    
    );
}




export default EditView;