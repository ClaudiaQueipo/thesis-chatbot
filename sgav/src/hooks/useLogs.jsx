import { useEffect } from 'react'
import useLogsStore from '../store/logsStore';
import logService from '../services/logs.service';

export default function useLogs() {
    const setLogs = useLogsStore(state => state.setLogs)

    useEffect(() => {
        const fetchData = async () => {
            const list = await logService.fetchLogs()
            setLogs(list)
        }
        fetchData()

    }, [setLogs]);
    return
}
