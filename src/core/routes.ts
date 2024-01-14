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
            list: () => '/admin/user',
            detail: (id: string) => `/admin/user/${id}`,
            create: () => '/admin/user/create',
            update: (id: string) => `/admin/user/${id}/update`,
            expert: {
                list: () => `/admin/user/expert`,
                detail: (id: string) => `/admin/user/expert/${id}`,
                create: () => `/admin/user/expert/create`,
                update: (id: string) => `/admin/user/expert/${id}/update`,
            },
            staff: {
                list: () => `/admin/user/staff`,
                detail: (id: string) => `/admin/user/staff/${id}`,
                create: () => `/admin/user/staff/create`,
                update: (id: string) => `/admin/user/staff/${id}/update`,
            },
            candidate: {
                list: () => `/admin/user/candidate`,
                detail: (id: string) => `/admin/user/candidate/${id}`,
                create: () => `/admin/user/candidate/create`,
                update: (id: string) => `/admin/user/candidate/${id}/update`,
            },
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
