import Papa from "papaparse";

const ExportCSV = (lista: any[], asunto: string) => {
    if (!lista || lista.length === 0) {
        alert("No hay datos para exportar");
        return;
    }

    const csv = Papa.unparse(lista);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${asunto}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default ExportCSV;
