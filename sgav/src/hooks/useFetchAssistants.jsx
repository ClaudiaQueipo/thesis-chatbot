import { useEffect } from 'react'
import useAssistantsStore from '../store/assistantsListStore';
import assistantService from '../services/assistant.service';

export default function useFetchAssistants() {
    const setAssistants = useAssistantsStore(state => state.setAssistants)

    useEffect(() => {
        const fetchData = async () => {
            const list = await assistantService.getAssistants()
            setAssistants(list)
        }
        fetchData()

    }, []);
    return
}
