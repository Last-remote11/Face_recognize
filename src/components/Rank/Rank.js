import React from 'react'

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3 dim'>
                {`Hello ${name}, your entry count is...`}
            </div>
            <div className='white f1 dim'>
                {entries}
            </div>
        </div>
    );
};

export default Rank