import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatRoutes, QUERY_CHAT_HISTORY, MUTATION_SEND_MESSAGE } from '../constants';
import type { SendMessageRequestDto, SendMessageResponseDto, ChatHistoryResponseDto } from '../dto/chatDto';
import { apiService } from '../../../services/api';

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [MUTATION_SEND_MESSAGE],
        mutationFn: async (payload: SendMessageRequestDto) => {
            const response = await apiService.post<SendMessageRequestDto, SendMessageResponseDto>(
                ChatRoutes.SEND_MESSAGE,
                payload
            );
            return response;
        },
        onMutate: async (newMessage) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_CHAT_HISTORY, newMessage.personaSlug] });

            const previousHistory = queryClient.getQueryData<ChatHistoryResponseDto>([
                QUERY_CHAT_HISTORY,
                newMessage.personaSlug
            ]);

            if (previousHistory) {
                queryClient.setQueryData<ChatHistoryResponseDto>(
                    [QUERY_CHAT_HISTORY, newMessage.personaSlug],
                    {
                        messages: [
                            ...previousHistory.messages,
                            {
                                role: "user",
                                parts: [{ text: newMessage.prompt }]
                            }
                        ]
                    }
                );
            }

            return { previousHistory };
        },
        onError: (_err, newMessage, context) => {
            if (context?.previousHistory) {
                queryClient.setQueryData(
                    [QUERY_CHAT_HISTORY, newMessage.personaSlug],
                    context.previousHistory
                );
            }
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CHAT_HISTORY, variables.personaSlug]
            });
        }
    });
};
