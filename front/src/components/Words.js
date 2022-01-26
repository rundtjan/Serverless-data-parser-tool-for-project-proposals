import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

const Words = () => {
    const words = useSelector(state => state.data.words);

    if(!words) {
        return(
            <p>Loading words...</p>
        )
    }

    return (
        <div>
            <Typography variant='h4'>
                Words from messages
            </Typography>
            <ul>
                {words.map(word =>
                    <li key={word}>
                        {word}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Words;