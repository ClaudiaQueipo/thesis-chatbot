import { Spinner } from "@nextui-org/react";

export default function LoadingFullPage() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            zIndex: 9999
        }}>
            <Spinner label="Preparando el asistente, esto puede tardar algunos minutos..." color="secondary" labelColor="secondary" />
        </div>
    )
}
