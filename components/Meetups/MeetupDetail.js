import React, { Fragment } from 'react'
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
    const { title, address, img, description } = props;
    return (
        <section className={classes.detail}>
            <img src={img} alt={title} />
            <h1>{title}</h1>
            <address>{address}</address>
            <p>{description}</p>
        </section>
    )
}

export default MeetupDetail