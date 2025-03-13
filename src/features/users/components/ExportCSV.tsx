import React from "react";
import Papa from "papaparse";
import Audiencia from "../../../Types/Types";
import { Button } from "@mui/material";
interface ExportCSVProps {
    data: Audiencia[] | null;
    fileName?: string;
}

const ExportCSV: React.FC<ExportCSVProps> = ({ data, fileName = "data" }) => {
    const handleExport = () => {
        if (!data || data.length === 0) {
            alert("No hay datos para exportar");
            return;
        }
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleExport}>Exportar a CSV</button>
    );
};

export default ExportCSV;