;
import jsPDF from 'jspdf';

import Audiencia from '../../../Types/Types';






interface ViewAudienciasProps {
    audiencia: Audiencia | null;

}




const generarPDF = ({ audiencia }: ViewAudienciasProps) => {
    if (!audiencia) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Paleta minimalista
    const primaryColor = '#4A4A4A';    // Gris oscuro
    const secondaryColor = '#6C6C6C';  // Gris medio
    const accentColor = '#D3D3D3';     // Gris claro

    // Configuración base
    doc.setFont('helvetica');
    let y = 40;

    // Título elegante
    doc.setFontSize(22);
    doc.setFont('', 'bold');
    doc.setTextColor(primaryColor);
    doc.text("INFORME DE AUDIENCIA", pageWidth / 2, 30, { align: 'center' });



    // Función para secciones limpias
    const crearSeccion = (titulo: string) => {
        doc.setFontSize(14);
        doc.setFont('', 'bold');
        doc.setTextColor(primaryColor);
        doc.text(titulo.toUpperCase(), 20, y);
        y += 10;

        // Subrayado sutil
        doc.setDrawColor(accentColor);
        doc.line(20, y, 50, y);
        y += 15;
    };

    // Función para datos minimalista
    const agregarDato = (label: string, value: string) => {
        doc.setFontSize(12);
        doc.setFont('', 'bold');
        doc.setTextColor(secondaryColor);
        doc.text(`${label}:`, 25, y);

        doc.setFont('', 'normal');
        doc.setTextColor(primaryColor);
        const splitText = doc.splitTextToSize(value, 120);
        doc.text(splitText, 80, y);

        y += Math.max(splitText.length * 10, 15) + 5;
    };
    // Separador visual
    doc.setDrawColor(accentColor);
    doc.line(20, y, pageWidth - 20, y);
    y += 15;
    // Sección 1: Identificación
    crearSeccion('Informacion principal');
    agregarDato('Empresa', audiencia.nombreEmpresa);
    agregarDato('DNI', audiencia.dni);
    agregarDato('Correo electronico', audiencia.correoElectronico);

    // Separador visual
    doc.setDrawColor(accentColor);
    doc.line(20, y, pageWidth - 20, y);
    y += 15;

    // Sección 2: Detalles
    crearSeccion('Detalles de la audiencia');
    agregarDato('Motivo de la Audiencia', audiencia.asunto);
    agregarDato('Estado Actual', audiencia.estado);
    agregarDato('Responsable Asignado', audiencia.atendidoPor.toString());

    // Pie de página discreto
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(`Generado el ${new Date().toLocaleDateString()} - Secretaría de Asuntos Estratégicos`, 20, 280);

    // Guardar documento
    const nombreArchivo = `Audiencia_${audiencia.dni}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(nombreArchivo);
};

export default generarPDF;