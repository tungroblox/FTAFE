import { DatePicker } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FieldsWrapper } from './FieldsWrapper';
const { RangePicker } = DatePicker;
interface DateRanagerInputProps {
    startDateName: string;
    endDateName: string;
    startDateLabel: string;
    endDateLabel: string;
    label: string;
}

export const DateRangerInput: React.FC<DateRanagerInputProps> = ({ label, endDateLabel, endDateName, startDateLabel, startDateName, ...rest }) => {
    const { control, setValue, getValues } = useFormContext();

    return (
        <FieldsWrapper
            fields={[
                {
                    label: startDateLabel,
                    name: startDateName,
                },
                {
                    label: endDateLabel,
                    name: endDateName,
                },
            ]}
            label={label}
        >
            <Controller
                control={control}
                name={''}
                render={({ field }) => (
                    <RangePicker
                        locale={{
                            timePickerLocale: {},
                            lang: {
                                placeholder: 'Chọn ngày',
                                rangePlaceholder: ['Từ ngày', 'Đến ngày'],
                                today: 'Hôm nay',
                                now: 'Bây giờ',
                                backToToday: 'Trở về hôm nay',
                                ok: 'Đồng ý',
                                clear: 'Xóa',
                                month: 'Tháng',
                                year: 'Năm',
                                timeSelect: 'Chọn thời gian',
                                dateSelect: 'Chọn ngày',
                                monthSelect: 'Chọn tháng',
                                yearSelect: 'Chọn năm',
                                decadeSelect: 'Chọn thập kỷ',
                                yearFormat: 'YYYY',
                                dateFormat: 'DD/MM/YYYY',
                                dayFormat: 'DD',
                                dateTimeFormat: 'DD/MM/YYYY HH:mm:ss',
                                monthBeforeYear: true,
                                previousMonth: 'Tháng trước (PageUp)',
                                nextMonth: 'Tháng sau (PageDown)',
                                previousYear: 'Năm trước (Control + left)',
                                nextYear: 'Năm sau (Control + right)',
                                previousDecade: 'Thập kỷ trước',
                                nextDecade: 'Thập kỷ sau',
                                previousCentury: 'Thế kỷ trước',
                                nextCentury: 'Thế kỷ sau',
                                locale: 'vi_VN',
                            },
                        }}
                        className="w-full"
                        format="YYYY-MM-DD"
                        {...field}
                        onChange={(value) => {
                            if (!value) {
                                return;
                            }
                            const [end, start] = value;

                            setValue(startDateName, start?.toDate().getTime());
                            setValue(endDateName, end?.toDate().getTime());
                        }}
                        {...rest}
                        defaultValue={[moment(getValues(startDateName)), moment(getValues(endDateName))]}
                    />
                )}
            />
        </FieldsWrapper>
    );
};
