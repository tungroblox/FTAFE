import { routes } from '@core/routes';
import Link from 'next/link';
import React from 'react';
import { Slide } from 'react-awesome-reveal';

interface HomeScreenProps {}

const Banner: React.FunctionComponent<HomeScreenProps> = () => {
    return (
        <Slide direction="left" triggerOnce>
            <div
                className={`relative -mx-8 bg-center bg-cover bg-[url("https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")] pt-20 h-[calc(100vh-79px)]`}
            >
                <div className="absolute inset-0 z-10 opacity-25 bg-primary-900"></div>
                <div className="relative z-10 max-w-screen-xl px-4 mx-auto sm:px-8">
                    <div className="flex flex-col items-center justify-around px-4 pt-32 pb-32 lg:flex-row">
                        <div className="flex flex-col items-center lg:block">
                            <span className="inline-block py-1 pl-3 my-4 text-sm font-medium text-gray-100 border-l-4 border-blue-500">
                                We have started operations at the university.
                            </span>
                            <h1 className="text-3xl font-black leading-none text-center text-gray-100 lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl">
                                <span className="inline-block mt-2">Make the best</span>
                                <br />
                                <span className="relative text-primary-900 px-4 -mx-4 py-2 before:content-[''] before:absolute before:inset-0 before:bg-gray-100 before:transform before:-skew-x-12 before:-z-10">
                                    Interview & CV
                                </span>
                            </h1>
                            <Link href={`${routes.job.list()}`}>
                                <button className="px-8 py-3 mt-10 text-sm font-bold transition duration-300 bg-gray-100 rounded shadow sm:text-base sm:mt-16 sm:px-8 sm:py-4 text-primary-900 hocus:bg-primary-900 hocus:text-gray-100 focus:shadow-outline">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="w-full mt-16 sm:w-5/6 lg:w-1/2 lg:mt-0 lg:pl-8">
                            <div
                                style={{
                                    position: 'relative',
                                    background: 'transparent',
                                    paddingBottom: '56.25%' /* 16:9 */,
                                    paddingTop: 25,
                                    height: 0,
                                    borderRadius: '4px',
                                }}
                            >
                                <iframe
                                    title="Embeded Video"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '4px',
                                    }}
                                    src={'//player.vimeo.com/video/374265101?title=0&portrait=0&byline=0&autoplay=0&responsive=1'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default Banner;
