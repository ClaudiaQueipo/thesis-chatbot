
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import useLogs from "../../hooks/useLogs";
import useLogsStore from "../../store/logsStore";


const columns = [
    {
        key: "_id",
        label: "ID",
    },
    {
        key: "user_id",
        label: "ID de Usuario",
    },
    {
        key: "username",
        label: "Nombre Usuario",
    },
    {
        key: "reason",
        label: "Motivo",
    },
];

export default function LogsDash() {
    useLogs()
    const logs = useLogsStore(state => state.logs);

    return (

        <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-3">
                <Table
                    aria-label="Selection behavior table example with dynamic content"
                    selectionMode="multiple"
                    selectionBehavior='replace'
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={logs}>
                        {(item) => (
                            <TableRow key={item._id}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

    );
}
