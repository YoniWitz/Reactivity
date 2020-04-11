import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { ILoginUser, IUser } from '../../../app/models/IUser'
import agent from '../../../app/api/agent';
import { history } from '../../../index';

interface IProps {
    setUser: (user: IUser) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

export const LoginForm: React.FC<IProps> = ({ setUser, loggedIn, setLoggedIn }) => {
    let [loading, setLoading] = useState<boolean>(false);

    let initialValues: ILoginUser = { email: '', password: '' };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     setLoading(true);
    //     agent.Users.login(loginUser)
    //         .then((response: IUser) => {
    //             setUser(response);
    //             window.localStorage.setItem('user', JSON.stringify(response));
    //             setLoggedIn(true);
    //         })
    //         .catch(err => console.log(err))
    //         .finally(() => setLoading(false));
    // }

    // const clearForm = () => {
    //     setLoginUser({
    //         email: '',
    //         password: ''
    //     })
    // }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            console.log(values);
            actions.resetForm();
        }
    });

    return (
        <Form loading={loading} onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />

            <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password} />

            <Button.Group widths="2">
                <Button
                    content="Login"
                    floated='right'
                    positive
                    type="submit"
                />
                <Button
                    floated='left'
                    type="reset"
                    content="Clear Form"
                    onClick={() => formik.resetForm()} />
            </Button.Group>
        </Form>
    );

}
