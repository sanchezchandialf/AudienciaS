
 export default interface Audiencia {
    map(arg0: (item: any) => any[]): import("jspdf-autotable").RowInput[] | undefined;
    idAudiencia: number;
    correoElectronico: string;
    fecha: string;
    dni: string;
    nombreEmpresa: string;
    idCargo: number;
    idClasificacion: number;
    idEstado:number ,
    estado: string;
    atendidoPor: string;
    derivadoA: string;
    asunto: string;
  }

  export default interface Empleados {
    idEmpleado: number;  
    nombre: string;      
    apellido: string;    
  }
  
  export  interface Clasificaciones {
    idclasificacion:number,
    clasificacion:string,
  }

  export  interface Cargo{
    idCargo:number;
    nombreCargo:string;

  }

  export  interface Estado{
    idestado:number,
    nombre:string,
  }

