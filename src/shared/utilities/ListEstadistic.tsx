import SchoolIcon from '@mui/icons-material/School';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


import SettingsIcon from '@mui/icons-material/Settings';


const cardsData = [
    {
      icon: <SchoolIcon color="primary" />,
      title: "Gestion de Audiencias",
      description: "Gestiona tus audiencias",
      path: "/audienciadetalle"
    },
    {
      icon: <CalendarTodayIcon color="primary" />,
      title: "Mi Calendario",
      description: "Consultá tus fechas disponibles",
      path: "/calendario"
    },
   
   
    {
      icon: <SettingsIcon color="primary" />,
      title: "Mi usuario",
      description: "",
      path: "/misaudiencias"
    },
  ];

export default cardsData;