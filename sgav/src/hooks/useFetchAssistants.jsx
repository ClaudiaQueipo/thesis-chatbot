import { useEffect } from 'react'
import useAssistantsStore from '../store/assistantsListStore';
import assistantService from '../services/assistant.service';
import { getUser } from '../utils/auth';

export default function useFetchAssistants() {
    const setAssistants = useAssistantsStore(state => state.setAssistants)

    useEffect(() => {
        const fetchData = async () => {
            const list = await assistantService.getAssistants(getUser())
            setAssistants(list)
        }
        fetchData()

    }, [setAssistants]);
    return
}
