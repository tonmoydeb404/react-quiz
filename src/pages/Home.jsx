import React, { useEffect } from 'react';
import Videos from '../components/Videos';

const Home = () => {
    useEffect(() => {
        document.title = 'React Quiz';
    }, []);

    return <Videos />;
};

export default Home;
