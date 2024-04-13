import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner"
import authService from "../../services/auth.service";
import logService from "../../services/logs.service";
import { getUser } from "../../utils/auth";
import useUsersStore from "../../store/usersStore";

export default function DeleteUserModal({ user, isOpen, onOpenChange }) {
    const setUsers = useUsersStore(state => state.setUsers);

    const handleDelete = async () => {
        const user_id = await authService.getUserIdByEmail({ email: getUser() });

        const deleted = await authService.deleteUser(user._id)

        const reason = `EL USUARIO ${getUser()} HA ELIMINADO a ${JSON.stringify(user)}`

        const log = {
            "user_id": user_id.user_id,
            "username": getUser(),
            "reason": reason
        }

        await logService.createLog(log)

        const updatedUsers = await authService.getAllUsers()

        setUsers(updatedUsers)

        if (deleted) toast.success('El asistente se ha eliminado satisfactoriamente')
        else toast.error('Ha ocurrido un error inesperado eliminando el asistente.')
    }

    return (
        <>
            {user && <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Eliminar {user?.first_name}</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Esta acción es irreversible, ¿Quieres eliminar tu asistente?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onPress={async () => {
                                        await handleDelete()
                                        onClose()
                                    }}>
                                        Eliminar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Toaster richColors theme='dark' duration={3000} position='bottom-center' />

            </>}
        </>
    );
}
