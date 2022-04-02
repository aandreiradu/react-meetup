import React, { Fragment, useEffect, useState } from 'react'
import MeetupList from '../components/Meetups/MeetupList';
import { MongoClient } from 'mongodb'
import Head from 'next/head';


const HomePage = (props) => {
    const { meetups } = props;

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups!' />
            </Head>
            <MeetupList meetups={meetups} />
        </Fragment>
    )
}

// the page is regenerated at 1hr
export async function getStaticProps() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.yyoyp.mongodb.net/meetups?retryWrites=true&w=majority`);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetupsMongo = await meetupsCollection.find().toArray();
    let meetups = meetupsMongo.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
    }));

    client.close();

    // always return an object
    return {
        props: { //this props obj will go to HomePage props;
            meetups: meetups
        },
        revalidate: 3600 //revalidate at every 1hr
    }
}


// the page is regenerated for every incoming request
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage