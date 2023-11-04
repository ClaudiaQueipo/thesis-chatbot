const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "description", sortable: true },
  { name: "CONOCIMIENTO", uid: "knowledge", sortable: true },
  { name: "ESTADO CREACIÓN", uid: "status", sortable: true },
  { name: "FECHA CREACIÓN", uid: "createdAt", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const statusOptions = [
  { name: "Creado", uid: "created" },
  { name: "No creado", uid: "not" },
  { name: "En proceso", uid: "progress" },
];

const assistants = [
  {
    id: 1,
    name: "Teresa",
    description: "Asistente para las tiendas TRD",
    knowledge: "atencion_cliente_trd.docx",
    status: "Creado",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 2,
    name: "Mateo",
    description: "Asistente para las bodegas",
    knowledge: "bodegas_bot.docx",
    status: "No creado",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 3,
    name: "Teresa",
    description: "Asistente para las tiendas TRD",
    knowledge: "atencion_cliente_trd.docx",
    status: "En proceso",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 4,
    name: "Teresa",
    description: "Asistente para las tiendas TRD",
    knowledge: "atencion_cliente_trd.docx",
    status: "Creado",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 5,
    name: "Teresa",
    description: "Asistente para las tiendas TRD",
    knowledge: "atencion_cliente_trd.docx",
    status: "Creado",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 6,
    name: "Teresa",
    description: "Asistente para las tiendas TRD",
    knowledge: "atencion_cliente_trd.docx",
    status: "En proceso",
    createdAt: "11 de junio de 2024",
  },
  {
    id: 7,
    name: "Leonardo",
    description: "Asistente para las dudas de LeonardoAI",
    knowledge: "leonardoknowledge.docx",
    status: "Creado",
    createdAt: "11 de junio de 2024",
  }
];

export { columns, assistants, statusOptions };
