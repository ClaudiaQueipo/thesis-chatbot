// import { DataGrid } from '@mui/x-data-grid';
// import useLogs from "../../hooks/useLogs";
// import useLogsStore from "../../store/logsStore";

// export default function AdminDashboard() {
//     useLogs();
//     const logs = useLogsStore(state => state.logs);

//     const columns = [
//         { field: '_id', headerName: 'ID', width: 150 },
//         { field: 'user_id', headerName: 'User ID', width: 150 },
//         { field: 'username', headerName: 'Username', width: 200 },
//         { field: 'reason', headerName: 'Reason', width: 300 },
//     ];

//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={logs} // Los datos de los logs
//                 columns={columns} // Las columnas definidas
//                 pageSize={5} // Tamaño de página
//                 rowsPerPageOptions={[5, 10, 20]} // Opciones de tamaño de página
//                 checkboxSelection // Selección de fila con checkbox
//             />
//         </div>
//     );
// }

import React from 'react'

export default function AdminDashboard() {
  return (
    <div>AdminDashboard</div>
  )
}
