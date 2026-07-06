import { useQuery } from '@tanstack/react-query';
import { ChatRoutes, QUERY_LIST_PERSONAS } from '../constants';
import type { PersonasResponseDto } from '../dto/chatDto';
import { apiService } from '../../../services/api';

export const usePersonas = () => {
    return useQuery<PersonasResponseDto>({
        queryKey: [QUERY_LIST_PERSONAS],
        queryFn: async () => {
            const response = await apiService.get<PersonasResponseDto>(
                ChatRoutes.LIST_PERSONAS
            );
            return response;
        },
        staleTime: 10 * 60 * 1000 // 10 minutes
    });
};
