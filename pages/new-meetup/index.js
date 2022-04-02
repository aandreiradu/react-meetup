// new-meetup
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react'
import NewMeetupForm from '../../components/Meetups/NewMeetupForm';

const NewMeetup = () => {
    const router = useRouter();
    const addMeetupHandler = async (requestedMeetUpData) => {
        console.log(requestedMeetUpData);

        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(requestedMeetUpData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');

    }

    return (
        <Fragment>
            <Head>
                <title>Add A New Meetup</title>
                <meta
                    name='description'
                    content='Add your own meetup and create amaizing networking opportunities.'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetup