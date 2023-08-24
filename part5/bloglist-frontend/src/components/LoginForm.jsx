const LoginForm = ({ handleSubmit, name, handleName, pwd, handlePwd}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input type="text" name="Username" value={name} onChange={handleName}/>
                </div>
                <div>
                    password <input type="password" name="Password" value={pwd} onChange={handlePwd} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm