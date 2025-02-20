import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generarPDF = (lista: any[], asunto: string, columnasOcultas: number[] = []) => {
    if (lista.length === 0) {
        console.error("La lista está vacía, no se generará el PDF.");
        return;
    }

    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // **Encabezado del PDF**
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Detalle de ${asunto}`, 10, 15);
    doc.line(10, 17, 280, 17);

    // **Obtener nombres de columnas**
    const todasLasColumnas = Object.keys(lista[0]);

    // **Filtrar columnas visibles excluyendo las que están en "columnasOcultas"**
    const columnasVisibles = todasLasColumnas.filter((_, index) => !columnasOcultas.includes(index));

    // **Generar tabla filtrada**
    autoTable(doc, {
        startY: 25,
        head: [columnasVisibles], // Solo columnas visibles
        body: lista.map(item => columnasVisibles.map(col => item[col])), // Filtrar datos
        theme: 'grid',
        headStyles: {
            fillColor: [41, 98, 255],
            textColor: [255, 255, 255],
            cellPadding: 3,
        },
        bodyStyles: {
            textColor: [44, 62, 80],
            cellPadding: 2.5,
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        styles: {
            cellWidth: 'wrap',
            fontSize: 9,
        },
        margin: { top: 25, horizontal: 5 },
        tableWidth: 'auto',
    });

    doc.save(`detalle_${asunto}.pdf`);
};

export default generarPDF;
