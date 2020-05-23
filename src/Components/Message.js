import React from 'react'

function Message({ type, message, }) {
    return (
        <div className={"alert alert-" + type} role="alert" dangerouslySetInnerHTML={{ __html: message }}></div>
    )
}

export default Message
