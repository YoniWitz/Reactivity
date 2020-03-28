import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { ILoginUser, IUser, ILoginUserFieldsMessages, ILoginUserFieldsValidations } from '../../../app/models/IUser'
import agent from '../../../app/api/agent'
import { history } from '../../../index'

interface IProps {
    setUser: (user: IUser) => void;
    setLoggedIn: (loggedIn: boolean) => void;
}
export const LoginForm: React.FC<IProps> = ({ setUser, setLoggedIn }) => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({ email: '', password: '' })
    let [loading, setLoading] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    let [fieldsMessages, setFieldsMessages] = useState<ILoginUserFieldsMessages>({
        email: null,
        password: null
    });

    let fieldsValidations: ILoginUserFieldsValidations = {
        email: loginUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false,
        password: loginUser.password.length >= 6
    }

    const isInitialEmail = useRef(true);
    const isInitialPassword = useRef(true);

    useEffect(() => {
        setSubmitDisabled(!(Object.values(fieldsValidations).reduce((prevVal, validation) => prevVal && validation, true)));
    }, [loginUser]);

    useEffect(() => {
        if (isInitialEmail.current) {
            isInitialEmail.current = false;
        } else {
            setFieldsMessages({
                ...fieldsMessages, email: fieldsValidations.email ?
                    null : "Must enter valid email address"
            });
        }
    }, [loginUser.email]);

    useEffect(() => {
        if (isInitialPassword.current) {
            isInitialPassword.current = false;
        } else {
            setFieldsMessages({
                ...fieldsMessages, password: fieldsValidations.password ?
                    null : "Password must contain  6 characters at least"
            });
        }
    }, [loginUser.password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        agent.Users.login(loginUser)
            .then((response: IUser) => {
                setUser(response);
                window.localStorage.setItem('user', JSON.stringify(response));
                setLoggedIn(true);
            })
            .then(() => history.push('/'))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const clearForm = () => {
        setLoginUser({
            email: '',
            password: ''
        })
        setFieldsMessages({
            email: '',
            password: ''
        })
    }
    return (
        <Form onSubmit={handleSubmit} loading={loading} error>
            <Form.Input
                type="email"
                name="email"
                label='Email'
                placeholder="Email"
                value={loginUser.email}
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.email}
            />

            <Form.Input
                placeholder="Password"
                label='Password'
                type="password"
                name="password"
                value={loginUser.password}
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.password}
            />
            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Login" disabled={submitDisabled} />
                <Button floated='left' type="button" content="Clear Form" onClick={clearForm} />
            </Button.Group>
        </Form>
    )
}
