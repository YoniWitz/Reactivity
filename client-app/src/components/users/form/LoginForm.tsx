import React, { useState, useEffect } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { ILoginUser } from '../../../app/models/IUser'
import agent from '../../../app/api/agent'

export const LoginForm = () => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({ email: '', password: '' })
    let [loading, setLoading] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

    useEffect(() => {
        let isEmailInvalid = loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true;
        setSubmitDisabled(loginUser.password.length < 6 || isEmailInvalid);
    }, [loginUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        agent.Users.login(loginUser)
            .then(response => console.log(response))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }
    return (
        <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Input type="email" onChange={(e) => handleChange(e)} placeholder="Email" value={loginUser.email} name="email" />
            {loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : <Message color='red'>Must enter valid email address </Message>}
            <Form.Input type="password" onChange={(e) => handleChange(e)} placeholder="Password" name="password" value={loginUser.password} />
            {(submitDisabled) ? <Message color='red'>Password must contain  6 characters at least</Message> : null}
            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Login" disabled={submitDisabled} />
                <Button floated='left' type="button" content="Clear Form" />
            </Button.Group>
        </Form>
    )
}
