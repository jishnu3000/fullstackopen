const Notification = ({message}) => {
    
    return (
        <div className={message.messageType}>
            {message.messageText}
        </div>
    )
}

export default Notification