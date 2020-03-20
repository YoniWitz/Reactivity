import React, { useState, useEffect } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { IRegisterUser, IUser } from '../../../app/models/IUser'
import agent from '../../../app/api/agent'
import { history } from '../../../index'

interface IProps {
    setUser: (user: IUser) => void;
}
export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [registerUser, setRegisterUser] = useState<IRegisterUser>({ email: '', password: '', displayName:'', userName:'' })
    let [loading, setLoading] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    let [loggedIn, setLoggedin] = useState<boolean>(false);

    useEffect(() => {
        if (loggedIn) history.push('/');

        let isEmailInvalid = registerUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true;
        setSubmitDisabled(registerUser.userName.length < 1 || registerUser.displayName.length < 1 || registerUser.password.length < 6 || isEmailInvalid);
    }, [registerUser, loggedIn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        agent.Users.register(registerUser)
            .then((response: IUser) => {
                setUser(response);
                window.localStorage.setItem('user', JSON.stringify(response));
                setLoggedin(true);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const clearForm = () => {
        setRegisterUser({
            email: '',
            password: '',
            displayName: '',
            userName:''
        })
    }
    return (
        <Form onSubmit={handleSubmit} loading={loading} error>
            <Form.Input type="text" onChange={(e) => handleChange(e)} placeholder="Display Name" name="displayName" value={registerUser.displayName} />
            {(registerUser.displayName.length < 1) ? <Message error>Display Name must contain 1 character at least</Message> : null}
            <Form.Input type="text" onChange={(e) => handleChange(e)} placeholder="User Name" name="userName" value={registerUser.userName} />
            {(registerUser.userName.length < 1) ? <Message error>User Name must contain 1 character at least</Message> : null}
            <Form.Input type="email" onChange={(e) => handleChange(e)} placeholder="Email" value={registerUser.email} name="email" />
            {registerUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : <Message error>Must enter valid email address </Message>}
            <Form.Input type="password" onChange={(e) => handleChange(e)} placeholder="Password" name="password" value={registerUser.password} />
            {(registerUser.password.length < 6) ? <Message error>Password must contain  6 characters at least</Message> : null}
            
            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Register" disabled={submitDisabled} />
                <Button floated='left' type="button" content="Clear Form" onClick={clearForm} />
            </Button.Group>
        </Form>
    )
}
