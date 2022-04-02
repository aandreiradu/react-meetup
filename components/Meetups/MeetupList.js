import React from 'react'
import MeetupItem from './MeetupItem'

import classes from './MeetupList.module.css'

const MeetupList = (props) => {
    return (
        <ul className={classes.list}>
            {props.meetups.map((meetup) => (
                <MeetupItem
                    id={meetup.id}
                    key={meetup.id}
                    image={meetup.image}
                    address={meetup.address}
                    title={meetup.title}
                />
            ))}
        </ul>
    )
}

export default MeetupList