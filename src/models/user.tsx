// tipo que representa el usuario dentro del token
export type UserProfile = {
  id: number;
  userName: string;
  email: string;
  isAdmin: boolean;
};

// tipo que representa la respuesta de autenticación de la API
export type UserProfileToken = {
  token: string;
  expirationDate: string; // Se podria convertir a Date en el frontend
  user: UserProfile;
};
