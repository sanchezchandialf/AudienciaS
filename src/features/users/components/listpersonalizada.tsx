import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, List, ListItem, ListItemText } from "@mui/material";
import Audiencia from "../../../Types/Types";
import { FetchApi } from "../../../api/useAxios";

const ListaPersonalizada: React.FC = () => {

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
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
                setError(response.message || "Error al cargar los datos.");
            }
            setLoading(false);
        };

        fetchAudiencias();
    }, []);

   const handlecheckboxchange =()=>{
    setAudiencias()
   }

    return (
       
    );
}