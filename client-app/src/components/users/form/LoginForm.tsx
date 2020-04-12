import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { ILoginUser, IUser } from '../../../app/models/IUser';
import agent from '../../../app/api/agent';
import { history } from '../../../index';
import * as yup from 'yup';

interface IProps {
    setUser: (user: IUser) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const reviewSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
})


export const LoginForm: React.FC<IProps> = ({ setUser, loggedIn, setLoggedIn }) => {
    let [loading, setLoading] = useState<boolean>(false);

    let initialValues: ILoginUser = { email: '', password: '' };

    const handleSubmit = (loginUser: ILoginUser) => {
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

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {           
            actions.resetForm();
            handleSubmit(values);
        },
        validationSchema: reviewSchema
    });

    return (
        <Form loading={loading} onSubmit={formik.handleSubmit} error>
            <Form.Input
                placeholder="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {(formik.touched.email && formik.errors.email) && <Message error >{formik.errors.email}</Message>}
            <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password} />
            {(formik.touched.password && formik.errors.password) && <Message style={{ display: 'block' }} error >{formik.errors.password}</Message>}
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
