import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, useDisclosure } from "@nextui-org/react";
import useGetUsers from "../../hooks/useGetUsers";
import useUsersStore from "../../store/usersStore";
import { useState } from "react";
import DeleteUserModal from "./DeleteUserModal";

const columns = [
    {
        key: "_id",
        label: "ID",
    },
    {
        key: "first_name",
        label: "Nombre",
    },
    {
        key: "last_name",
        label: "Apellido",
    },
    {
        key: "email",
        label: "Correo Electrónico",
    },
    {
        key: "role",
        label: "Rol",
    },
];

export default function UserDash() {
    useGetUsers()
    const users = useUsersStore(state => state.users);
    const [selectedRow, setSelectedRow] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleRowClick = (item) => {
        setSelectedRow(item)
    };

    return (
        <div className="flex flex-col gap-4">
            {selectedRow && <div className="flex justify-end items-center gap-4 "> {/* Flex container for aligning the button to the right */}
                <p>Eliminar a <strong>{selectedRow.first_name}</strong></p>
                <Button onClick={onOpen} color="danger">Eliminar</Button>
            </div>}
            <div className="flex flex-col gap-3">
                <Table
                    aria-label="Selection behavior table example with dynamic content"
                    selectionMode="multiple"
                    selectionBehavior='replace'
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item._id} onClick={() => handleRowClick(item)}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DeleteUserModal user={selectedRow} isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    );
}
