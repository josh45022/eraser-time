import React, {useState, useContext} from "react"
import AuthForm from "./AuthForm.js"
import {UserContext} from "../context/UserContext.js"

function Auth() {
    const initInputs = { username: "", password: "" }


    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signup, login, errMsg} = useContext(UserContext)


    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        })
        )
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
        console.log(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    return (
        <>
            <h1 className="title">Welcome to Eraser Time!</h1>

            {!toggle?
            <div className="authformwrapper">
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit = {handleSignup}
                    inputs={inputs}
                    btnText="Sign up"
                />
                <p style={{color: "red"}}>{errMsg}</p>
                <button className="authformbutton" onClick={()=>setToggle(prev => !prev)}>Already a member?</button>
            </div>
            :
            <div className="authformwrapper">
                <AuthForm 
                    handleChange={handleChange}
                    handleSubmit = {handleLogin}
                    inputs={inputs}
                    btnText="Login"
                />
                <p style={{color: "red"}}>{errMsg}</p>
                <button className="authformbutton" onClick={()=>setToggle(prev => !prev)}>Not a member?</button>
            </div>
            }
        </>
    )
}

export default Auth