import { CommonSeo } from '@components/commons';
import { NextPage } from 'next';
import * as React from 'react';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
    return (
        <React.Fragment>
            <CommonSeo title="Home" />
            {/* <LandingPage /> */}
            <div className="w-full h-screen">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="text-4xl font-bold">Hello World!</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
