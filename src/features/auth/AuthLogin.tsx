import FormCommonErrorMessage from '@components/forms/FormCommonErrorMessage';
import { useAuthLoginMutation } from '@hooks/api/auth.hook';
import { store } from '@store/index';
import { userThunk } from '@store/user/thunks';
import { useMutation } from '@tanstack/react-query';
import { Button, Tabs } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { authApi, IV1AuthLogin } from '../../core/api';
import { FormBtn, FormWrapper, TextInput } from '../../core/components';
import { constant } from '../../core/constant';
import { routes } from '../../core/routes';
import { LoginSocial } from './components/LoginSocial';

const defaultValues: IV1AuthLogin = {
    email: '',
    password: '',
};

interface AuthLoginProps {}

export const AuthLogin: React.FC<AuthLoginProps> = ({}) => {
    const methods = useForm<IV1AuthLogin>({ defaultValues });

    const { mutationAuthLogin, isLoading } = useAuthLoginMutation();

    const TabAuth = () => {
        return (
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: <p className="p-0 m-0 text-black dark:text-white">CANDIDATE</p>,
                        key: '1',
                        children: <LoginSocial />,
                    },
                    {
                        label: <p className="p-0 m-0 text-black dark:text-white">ADMIN / EXPERT / STAFF</p>,
                        key: '2',
                        children: (
                            <>
                                <FormWrapper methods={methods}>
                                    <form onSubmit={methods.handleSubmit((data) => mutationAuthLogin(data))} className="">
                                        <div className="space-y-4">
                                            <div>
                                                <TextInput label="Email" name="email" placeholder="user@gmail.com" />
                                                <FormCommonErrorMessage />
                                            </div>
                                            <TextInput label="Password" name="password" type="password" placeholder="password" />
                                        </div>
                                        <Button className="w-full mt-4" type="primary" htmlType="submit">
                                            Sign In
                                        </Button>
                                    </form>
                                </FormWrapper>
                                {/* <div className="mt-6">
                                    <div className="space-y-6">
                                        <div className="flex justify-center ">
                                            <Link href={routes.auth.register()}>
                                                <a>
                                                    <div className="space-x-1 text-sm font-medium">
                                                        <span className="text-black">Create Account?</span>
                                                        <span className="text-blue-600">Sign Up</span>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}
                            </>
                        ),
                    },
                ]}
            />
        );
    };

    return (
        <>
            <section className="relative w-full h-screen">
                <div className="lg:flex lg:h-full">
                    <div className="relative text-center lg:w-1/2">
                        <img src="/images/login.jpg" alt="login" className="absolute object-cover w-full h-full" />
                        {/* <!-- Logo --> */}
                        <Link href="/">
                            <a className="relative inline-block py-36">
                                <img src="/assets/images/logo/logo-new.png" className="inline-block max-h-7" alt="Xhibiter | NFT Marketplace" />
                            </a>
                        </Link>
                    </div>
                    <div className="relative flex flex-col items-center justify-center p-[10%] lg:w-1/2">
                        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
                            <img src="/images/gradient_light.jpg" alt="gradient" className="w-full h-full" />
                        </picture>
                        <h1 className="mb-6 text-4xl font-bold text-jacarta-700 font-display dark:text-white">
                            Welcome to <span className="text-blue-600">LiveCV</span>
                        </h1>

                        <div className="w-full max-w-[25.625rem]">{TabAuth()}</div>
                    </div>
                </div>
            </section>
        </>
    );
};
