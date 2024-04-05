
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { CircularProgress } from "@nextui-org/react";

const Root = () => {

    return (
        <Suspense fallback={<CircularProgress label="Cargando..." />}>
            <Outlet />
        </Suspense>
    )
}

export default Root
