import React from 'react';
import { useSelector } from 'react-redux';

const Words = () => {
    const words = useSelector(state => state.data.words);

    if(!words) {
        return(
            <p>Loading words...</p>
        )
    }

    return (
        <div>
            <h3>Words from messages</h3>
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