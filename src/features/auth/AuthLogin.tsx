import FormCommonErrorMessage from '@components/forms/FormCommonErrorMessage';
import { routes } from '@core/routes';
import { useAuthLoginMutation } from '@hooks/api/auth.hook';
import { Button, Tabs } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { IV1AuthLogin } from '../../core/api';
import { FormWrapper, TextInput } from '../../core/components';
import { LoginSocial } from './components/LoginSocial';

const defaultValues: IV1AuthLogin = {
    email: '',
    password: '',
};

interface AuthLoginProps {}

export const AuthLogin: React.FC<AuthLoginProps> = ({}) => {
    const methods = useForm<IV1AuthLogin>({ defaultValues });

    const { mutationAuthLogin, isLoading } = useAuthLoginMutation();

    const router = useRouter();

    const TabAuth = () => {
        return (
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: <p className="p-0 m-0 text-black dark:text-white">Farm Hub/Customer</p>,
                        key: '1',
                        children: <LoginSocial />,
                    },
                    {
                        label: <p className="p-0 m-0 text-black dark:text-white">ADMIN / STAFF</p>,
                        key: '2',
                        children: (
                            <>
                                <FormWrapper methods={methods}>
                                    <form onSubmit={methods.handleSubmit((data) => mutationAuthLogin(data))}>
                                        <div className="space-y-4">
                                            <div>
                                                <TextInput label="Email" name="email" type="email" placeholder="user@gmail.com" />
                                                <FormCommonErrorMessage />
                                            </div>
                                            <TextInput label="Mật Khẩu" name="password" type="password" placeholder="password" />
                                        </div>
                                        <Button className="w-full mt-4" type="primary" htmlType="submit">
                                            Đăng Nhập
                                        </Button>
                                    </form>
                                </FormWrapper>
                                <div className="mt-6">
                                    <div className="space-y-6">
                                        <div className="flex justify-center ">
                                            <Link href={routes.auth.register()}>
                                                <a>
                                                    <div className="space-x-1 text-sm font-medium">
                                                        <div className="space-x-1 text-sm font-medium">
                                                            <span className="text-black">Tạo Tài Khoản Mới?</span>
                                                            <span className="text-blue-600">Đăng Ký</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
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
                        <img src="/images/login-photo.jpeg" alt="login" className="absolute object-cover w-full h-full" />
                        {/* <img src="/images/login.jpg" alt="login" className="absolute object-cover w-full h-full" /> */}
                        {/* <!-- Logo --> */}
                        <Link href="/">
                            <a className="relative inline-block py-36">
                                <img src="/assets/images/logo/logo-new.png" className="inline-block max-h-20" alt="Xhibiter | NFT Marketplace" />
                            </a>
                        </Link>
                    </div>
                    <div className="relative flex flex-col items-center justify-center p-[10%] lg:w-1/2">
                        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
                            <img src="/images/gradient_light.jpg" alt="gradient" className="w-full h-full" />
                        </picture>
                        <h1 className="mb-6 text-4xl font-bold text-jacarta-700 font-display dark:text-white">
                            Welcome to{' '}
                            <span className="text-blue-600">
                                <img src="/assets/images/logo/logo-new.png" className="inline-block max-h-16" alt="Xhibiter | NFT Marketplace" />
                            </span>
                        </h1>

                        <div className="w-full max-w-[25.625rem]">{TabAuth()}</div>
                    </div>
                </div>
            </section>
        </>
    );
};
