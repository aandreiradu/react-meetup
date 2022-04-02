import { createContext, useState } from "react";

const MeetupContext = createContext([{
    id: 'm1',
    title: 'Daily StandUp',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Daily_sprint_meeting.jpg/220px-Daily_sprint_meeting.jpg',
    address: 'FTOS Bucharest HQ / Home',
    description: 'Daily StandUp with the entire team'

}]);

const MeetupContextProvider = (props) => {
    return (
        <MeetupContext.Provider value={[]}>
            {props.chidren}
        </MeetupContext.Provider>
    )
};


export default MeetupContext;
export { MeetupContextProvider };