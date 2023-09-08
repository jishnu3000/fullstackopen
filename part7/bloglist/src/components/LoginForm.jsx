const LoginForm = ({ handleSubmit, name, handleName, pwd, handlePwd }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
                    username <input type="text" id="username" value={name} onChange={handleName}/>
        </div>
        <div>
                    password <input type="password" id="password" value={pwd} onChange={handlePwd} />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm