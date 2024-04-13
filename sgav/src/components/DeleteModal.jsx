import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import assistantService from "../services/assistant.service";
import { Toaster, toast } from "sonner"
import useAssistantStore from "../store/assistantStore";
import authService from "../services/auth.service";
import { getUser } from "../utils/auth";
import logService from "../services/logs.service";

export default function DeleteModal({ isOpen, onOpenChange }) {
    const assistant = useAssistantStore(state => state.assistant)

    const handleDelete = async () => {
        const deleted = await assistantService.deleteAssistant(assistant._id)
        
        const user_id = await authService.getUserIdByEmail(getUser())
        const reason = `${getUser()} HA ELIMINADO ${assistant.toString()}`
        
        const log = {
            "user_id": getUser(),
            "username": user_id,
            "reason": reason
        }

        await logService.createLog(log)

        if (deleted) toast.success('El asistente se ha eliminado satisfactoriamente')
        else toast.error('Ha ocurrido un error inesperado eliminando el asistente.')
        
        window.location.reload()
    }

    return (
        <>
            {assistant && <>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Eliminar {assistant?.name}</ModalHeader>
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
