import React, { Fragment } from 'react'
import MeetupDetail from '../../components/Meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';


const MeetupDetails = (props) => {
    const { title, address, description, image } = props.meetupData;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <meta
                    name='description'
                    content={description}
                />
            </Head>
            <MeetupDetail
                title={title}
                address={address}
                description={description}
                img={image}
            />
        </Fragment>
    )
}


export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.yyoyp.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    // fetch data for a single obj
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.yyoyp.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}



export default MeetupDetails