import React from 'react';

import Banner from './Banner';
import ContactUs from './ContactUs';
import FAQ from './FAQs';
import JoinWithUs from './JoinWithUs';
import OurExpertise from './OurExpertise';
import OurProfessionalServices from './OurProfessionalServices';
import OurRecord from './OurRecord';

interface LandingPageProps {}

const LandingPage: React.FunctionComponent<LandingPageProps> = () => {
    return (
        <div className="w-full overflow-hidden">
            <Banner />
            <OurRecord />
            <OurProfessionalServices />
            <OurExpertise />
            <FAQ />
            <ContactUs />
            <JoinWithUs />
        </div>
    );
};

export default LandingPage;
