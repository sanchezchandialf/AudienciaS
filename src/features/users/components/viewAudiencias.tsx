import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Audiencia from '../../../Types/Types';
import { object } from 'yup';
import generarPDF from './informeindividual';

interface ViewAudienciasProps {
    audiencia: Audiencia | null;
    open: boolean;
    onClose: () => void;
}

const ViewAudiencias: React.FC<ViewAudienciasProps> = ({ audiencia, open, onClose }) => {

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
                    <Button variant="contained" color="secondary" onClick={() => generarPDF({ audiencia })}>
                        Generar Reporte
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ViewAudiencias;