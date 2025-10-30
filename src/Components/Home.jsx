import React from 'react';
import Banner from './Banner';
import AllFriends from './AllFriends';
import { useLoaderData } from 'react-router';

const Home = () => {
    const friends = useLoaderData()
    // console.log(friends);
    return (
        <div>
            <section className='container my-16'>
                <Banner></Banner>
                <AllFriends friends={friends}></AllFriends>
            </section>
        </div>
    );
};

export default Home;