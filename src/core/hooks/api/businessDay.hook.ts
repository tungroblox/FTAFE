import { BusinessDayAPI } from '@core/api/business-day.api';
import { BusinessDay } from '@models/business-day';
import { useQuery } from '@tanstack/react-query';

export const useQueryGetDetailBusinessDay = (id: string) => {
    return useQuery({
        queryKey: ['business-day', id],
        queryFn: async () => {
            const res = await BusinessDayAPI.getById(id);
            return res.payload as BusinessDay;
        },
    });
};
