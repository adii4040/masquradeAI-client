import { useQuery } from '@tanstack/react-query';
import { ChatRoutes, QUERY_CHAT_HISTORY } from '../constants';
import type { ChatHistoryResponseDto } from '../dto/chatDto';
import { apiService } from '../../../services/api';

export const useChatHistory = (personaSlug?: string) => {
    return useQuery<ChatHistoryResponseDto>({
        queryKey: [QUERY_CHAT_HISTORY, personaSlug],
        queryFn: async () => {
            if (!personaSlug) return { messages: [] };
            const response = await apiService.get<ChatHistoryResponseDto>(
                ChatRoutes.get_chat_history(personaSlug)
            );
            return response;
        },
        enabled: !!personaSlug,
        staleTime: 0
    });
};
