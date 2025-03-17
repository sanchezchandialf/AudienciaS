import SchoolIcon from '@mui/icons-material/School';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SettingsIcon from '@mui/icons-material/Settings';


const cardsData = [
    {
      icon: <SchoolIcon color="primary" />,
      title: "Gestion de Audiencias",
      description: "Gestiona tus audiencias",
      path: "/misaudiencias"
    },
    {
      icon: <CalendarTodayIcon color="primary" />,
      title: "Mi Calendario",
      description: "Consultá tus fechas disponibles",
      path: "/calendario"
    },
    {
      icon: <WorkHistoryIcon color="primary" />,
      title: "Historial de audiencias",
      description: "Consultá tus audiencias",
      path: "/audienciadetalle"
    },
    {
      icon: <SupportAgentIcon color="primary" />,
      title: "Mis Informes",
      description: "Genera Reportes, diarios o mensuales sobre tus audiencias",
      path: "/misaudiencias"
    },
    {
      icon: <SettingsIcon color="primary" />,
      title: "Mi usuario",
      description: "",
      path: "/misaudiencias"
    },
  ];

export default cardsData;