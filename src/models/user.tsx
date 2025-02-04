// tipo que representa el usuario dentro del token
export type UserProfile = {
  idUsuario: number;
  nombre: string;
  correo: string;
  esAdmin: boolean;
};

// tipo que representa la respuesta de autenticación de la API
export type UserProfileToken = {
  token: string;
  fechaExpiracion: string; // Se podria convertir a Date en el frontend
  usuario: UserProfile;
};
