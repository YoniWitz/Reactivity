import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { IRegisterUser, IUser, IRegisterUserFieldsMessages, IRegisterUserFieldsValidations } from '../../../app/models/IUser'
import agent from '../../../app/api/agent'
import { history } from '../../../index'

interface IProps {
    setUser: (user: IUser) => void;
}

export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [registerUser, setRegisterUser] = useState<IRegisterUser>({ email: '', password: '', displayName: '', userName: '' })
    let [loading, setLoading] = useState<boolean>(false);
    let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    let [fieldsMessages, setFieldsMessages] = useState<IRegisterUserFieldsMessages>({
        email: null,
        password: null,
        displayName: null,
        userName: null
    });

    const isInitialEmail = useRef(true);
    const isInitialPassword = useRef(true);
    const isInitialUserName = useRef(true);
    const isInitialDisplayName = useRef(true);

    let fieldsValidations: IRegisterUserFieldsValidations = {
        email: registerUser.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false,
        password: registerUser.password.length >= 6,
        displayName: registerUser.displayName.length >= 1,
        userName: registerUser.userName.length >= 1
    };

    useEffect(() => {
        setSubmitDisabled(!(Object.values(fieldsValidations).reduce((prevVal, validation) => prevVal && validation, true)));
    }, [registerUser]);

    useEffect(() => {
        if (isInitialEmail.current) {
            isInitialEmail.current = false;
        } else {
            setFieldsMessages({ ...fieldsMessages, email: fieldsValidations.email ? null : "Must enter valid email address" })
        }
    }, [registerUser.email]);

    useEffect(() => {
        if (isInitialPassword.current) {
            isInitialPassword.current = false;
        } else {
            setFieldsMessages({ ...fieldsMessages, password: fieldsValidations.password ? null : "Password must contain  6 characters at least" })
        }
    }, [registerUser.password]);

    useEffect(() => {
        if (isInitialDisplayName.current) {
            isInitialDisplayName.current = false;
        } else {
            setFieldsMessages({ ...fieldsMessages, displayName: fieldsValidations.displayName ? null : "Display Name must contain 1 character at least" });
        }
    }, [registerUser.displayName]);

    useEffect(() => {
        if (isInitialUserName.current) {
            isInitialUserName.current = false;
        } else {
            setFieldsMessages({ ...fieldsMessages, userName: fieldsValidations.userName ? null : "User Name must contain 1 character at least" });
        }
    }, [registerUser.userName]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        setRegisterUser({ ...registerUser, [name]: value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        agent.Users.register(registerUser)
            .then((response: IUser) => {
                setUser(response);
                window.localStorage.setItem('user', JSON.stringify(response));
            })
            .then(() => history.push('/'))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    const clearForm = () => {
        setRegisterUser({
            email: '',
            password: '',
            displayName: '',
            userName: ''
        })
        setFieldsMessages({
            email: null,
            password: null,
            displayName: null,
            userName: null
        })
    }
    return (
        <Form onSubmit={handleSubmit} loading={loading} error>
            <Form.Input
                placeholder="Full Name"
                label='Full Name'
                name="displayName"
                value={registerUser.displayName}
                type="text"
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.displayName}
            />

            <Form.Input
                label='User Name'
                placeholder="User Name"
                name="userName"
                value={registerUser.userName}
                type="text"
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.userName}
            />

            <Form.Input
                label='Email'
                placeholder="Email"
                name="email"
                value={registerUser.email}
                type="email"
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.email}
            />

            <Form.Input
                label='Password'
                placeholder="Password"
                type="password"
                name="password"
                value={registerUser.password}
                onChange={(e) => handleChange(e)}
                error={fieldsMessages.password}
            />

            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Register" disabled={submitDisabled} />
                <Button floated='left' type="button" content="Clear Form" onClick={clearForm} />
            </Button.Group>
        </Form>
    )
}
