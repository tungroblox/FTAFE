export const routes = {
    auth: {
        login: () => '/auth/login',
        register: () => '/auth/register',
        verify: () => '/auth/verify',
    },

    job: {
        list: () => '/job',
        detail: (id: string) => `/job/${id}`,
    },

    cv: {
        list: () => '/cv',
        detail: (id: string) => `/cv/${id}`,
        slug: (slug: string) => `/cv/slug/${slug}`,
        reviewCV: (id: string) => `/cv/review/${id}`,
        expert: (expertId: string) => `/cv/expert/${expertId}`,
        interview: (interviewId: string) => `/cv/interview/${interviewId}`,
    },

    user: {
        detail: () => '/user',
        profile: {
            detail: () => `/user/profile`,
            update: () => `/user/profile/edit`,
        },
        transaction: {
            list: () => `/user/transaction`,
            deposit: () => `/user/transaction/deposit`,
            success: (amount: number) => `/user/transaction/success?amount=${amount}`,
            fail: () => `/user/transaction/fail`,
        },
        notification: {
            list: () => `/user/notification`,
        },
    },

    interview: {
        list: () => `/interview`,
        detail: (id: string) => `/interview/${id}`,
    },

    expert: {
        home: () => '/expert',
        profile: () => '/expert/profile',
        updateProfile: () => `/expert/profile/update`,

        interview: {
            list: () => `/expert/interview`,
            detail: (id: string) => `/expert/interview/${id}`,
            cv: (id: string) => `/expert/interview/${id}/cv`,
        },
        job: {
            list: () => `/expert/job`,
            detail: (id: string) => `/expert/job/${id}`,
        },
        calendar: () => '/expert/calendar',
        skillLevel: {
            detail: () => `/expert/skill-level`,
            request: () => `/expert/skill-level/request`,
        },
        list: () => `/list-experts`,
        notification: {
            list: () => `/expert/notification`,
        },
    },

    agora: (id: string) => `/agora/${id}`,

    admin: {
        home: () => '/admin',
        profile: () => '/admin/profile',
        user: {
            customer: {
                list: () => `/admin/user/customer`,
                detail: (id: string) => `/admin/user/customer/${id}`,
                create: () => `/admin/user/customer/create`,
                update: (id: string) => `/admin/user/customer/${id}/edit`,
            },
            farm_hub: {
                list: () => `/admin/user/farmhub`,
                detail: (id: string) => `/admin/user/farmhub/${id}`,
                create: () => `/admin/user/farmhub/create`,
                update: (id: string) => `/admin/user/farmhub/${id}/edit`,
            },
            delivered_hub_staff: {
                list: () => `/admin/user/delivered-hub-staff`,
                detail: (id: string) => `/admin/user/delivered-hub-staff/${id}`,
                create: () => `/admin/user/delivered-hub-staff/create`,
                update: (id: string) => `/admin/user/delivered-hub-staff/${id}/edit`,
            },
            collected_hub_staff: {
                list: () => `/admin/user/collected-hub-staff`,
                detail: (id: string) => `/admin/user/collected-hub-staff/${id}`,
                create: () => `/admin/user/collected-hub-staff/create`,
                update: (id: string) => `/admin/user/collected-hub-staff/${id}/edit`,
            },
        },
        category: {
            list: () => '/admin/categories',
            create: () => '/admin/categories/create',
            edit: () => '/admin/categories/edit',
        },
        product: {
            list: () => '/admin/product',
            detail: (id: string) => `/admin/product/${id}`,
            listItem: (productId: string) => `/admin/product/${productId}/items`,
        },
        order: {
            list: () => '/admin/order',
            create: () => '/admin/order/create',
            edit: () => '/admin/order/edit',
        },
        menu: {
            list: () => '/admin/menu',
            create: () => '/admin/menu/create',
            edit: () => '/admin/menu/edit',
        },
    },

    staff: {
        home: () => '/staff',
        profile: () => '/staff/profile',
        expert: {
            list: () => `/staff/expert`,
            detail: (id: string) => `/staff/expert/${id}`,
        },

        skillLevelRequest: {
            list: () => `/staff/skill-level-request`,
            detail: (id: string) => `/staff/skill-level-request/${id}`,
        },
        interview: {
            list: () => `/staff/manage-interview`,
            detail: (id: string) => `/staff/manage-interview/${id}`,
        },

        skill: {
            list: () => `/staff/skill`,
            detail: (id: string) => `/staff/skill/${id}`,
            create: () => `/staff/skill/create`,
            update: (id: string) => `/staff/skill/${id}/update`,
            skillLevel: {
                list: (skillId: string): string => `/staff/skill/${skillId}/skill-level`,
                detail: (skillId: string, id: string): string => `/staff/skill/${skillId}/skill-level/${id}`,
            },
        },
        skillGroup: {
            list: () => `/staff/skill-group`,
            detail: (id: string) => `/staff/skill-group/${id}`,
            create: () => `/staff/skill-group/create`,
            update: (id: string) => `/staff/skill-group/${id}/update`,
        },
        job: {
            list: () => `/staff/job`,
            detail: (id: string) => `/staff/job/${id}`,
            create: () => `/staff/job/create`,
            update: (id: string) => `/staff/job/${id}/update`,
            jobLevel: {
                list: (jobId: string): string => `/staff/job/${jobId}/job-level`,
                detail: (jobId: string, id: string): string => `/staff/job/${jobId}/job-level/${id}`,
                create: (jobId: string): string => `/staff/job/${jobId}/job-level/create`,
                update: (jobId: string, id: string): string => `/staff/job/${jobId}/job-level/${id}/update`,
            },
        },
    },

    home: () => '/',
};
