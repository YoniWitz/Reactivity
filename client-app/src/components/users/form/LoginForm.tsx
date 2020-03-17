import React, { useState, useEffect } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { ILoginUser, IUser } from '../../../app/models/IUser'
import agent from '../../../app/api/agent'
import { useHistory } from 'react-router-dom'

interface IProps {
    setUser: (user: IUser) => void;
}
export const LoginForm: React.FC<IProps> = ({ setUser }) => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({ email: '', password: '' })
    let [loading, setLoading] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    let [loggedIn, setLoggedin] = useState<boolean>(false);
    let history = useHistory();

    useEffect(() => {
        if (loggedIn) history.push('/activities');

        let isEmailInvalid = loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? false : true;
        setSubmitDisabled(loginUser.password.length < 6 || isEmailInvalid);
    }, [loginUser, loggedIn, history]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        agent.Users.login(loginUser)
            .then((response: IUser) => {
                setUser(response);
                setLoggedin(true);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }
    return (
        <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Input type="email" onChange={(e) => handleChange(e)} placeholder="Email" value={loginUser.email} name="email" />
            {loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : <Message color='red'>Must enter valid email address </Message>}
            <Form.Input type="password" onChange={(e) => handleChange(e)} placeholder="Password" name="password" value={loginUser.password} />
            {(loginUser.password.length < 6) ? <Message color='red'>Password must contain  6 characters at least</Message> : null}
            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Login" disabled={submitDisabled} />
                <Button floated='left' type="button" content="Clear Form" />
            </Button.Group>
        </Form>
    )
}
