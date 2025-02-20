import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Audiencia from '../../../Types/Types';

interface ViewAudienciasProps {
    audiencia: Audiencia | null;
    open: boolean;
    onClose: () => void;
}

const ViewAudiencias: React.FC<ViewAudienciasProps> = ({ audiencia, open, onClose }) => {

    const generarPDF = () => {
        if (!audiencia) return;

        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("Detalle de la Audiencia", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [['Campo', 'Valor']],
            body: [
                ['Nombre', audiencia.nombreEmpresa],
                ['Correo', audiencia.correoElectronico],
                ['DNI', audiencia.dni],
                ['Asunto', audiencia.asunto],
                ['Estado', audiencia.estado],
                ['Atendido por', audiencia.atendidoPor]
            ],
        });

        doc.save(`audiencia_${audiencia.dni}.pdf`);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    Detalle de la Audiencia
                </Typography>
                {audiencia ? (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1"><b>Nombre:</b> {audiencia.nombreEmpresa}</Typography>
                        <Typography variant="body1"><b>Correo:</b> {audiencia.correoElectronico}</Typography>
                        <Typography variant="body1"><b>DNI:</b> {audiencia.dni}</Typography>
                        <Typography variant="body1"><b>Asunto:</b> {audiencia.asunto}</Typography>
                        <Typography variant="body1"><b>Estado:</b> {audiencia.estado}</Typography>
                        <Typography variant="body1"><b>Atendido por:</b> {audiencia.atendidoPor}</Typography>
                    </Box>
                ) : (
                    <Typography>No hay datos disponibles</Typography>
                )}
                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button variant="contained" color="primary" onClick={onClose} sx={{ mr: 2 }}>
                        Cerrar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={generarPDF}>
                        Generar Reporte
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewAudiencias;
