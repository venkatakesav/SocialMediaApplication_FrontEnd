import React from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import {useState, useContext} from "react"
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { validate, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { AuthContext } from '../../shared/context/auth-context'
// import { useForm } from '../../shared/hooks/form-hook'

import './Auth.css'


function Auth() {
    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
        auth.login()
        // console.log(auth.isLoggedIn)
    }

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '', 
                    isValid: false
                },
            }, false)
        }
        
        setIsLoginMode(prevMode => !prevMode)
    }
  
    return (
    <Card className="authentication">
        <h2>Login Required</h2>
        <hr></hr>
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <Input element="input" id="name" type="text" label="Name" validators={[VALIDATOR_REQUIRE()]}
            errorText="Don't You Have a Name ;)" onInput={inputHandler}></Input>}
            <Input element = "input" id="email" type="email" label="email"
            validators = {[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address"
            onInput={inputHandler} ></Input>
            <Input element = "input" id="password" type="password" label="password"
            validators = {[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid Password (At least 5 Characters)"
            onInput={inputHandler} ></Input>
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
  )
}
export default Auth