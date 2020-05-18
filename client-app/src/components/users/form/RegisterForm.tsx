import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { IRegisterUser, IUser } from '../../../app/models/IUser';
import agent from '../../../app/api/agent';
import { history } from '../../../index';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

interface IProps {
    setUser: (user: IUser) => void;
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const reviewSchema = yup.object({
    userName: yup.string().required('User Name is required')
        .test('noSpaces', 'No spaces allowed for User Name', (val: string) => {
            if (val)
                return !val.includes(' ')
            return false
        }),
    email: yup.string().required('Email address is required').email(),
    password: yup.string().required('Password is required').min(8),
})

export const RegisterForm: React.FC<IProps> = ({ setUser, loggedIn, setLoggedIn }) => {
    let [loading, setLoading] = useState<boolean>(false);

    let initialValues: IRegisterUser = { displayName: '', userName: '', email: '', password: '' };

    useEffect(() => {
        console.log(loggedIn);
        if (loggedIn) history.push('/');
    }, [loggedIn]);

    const handleSubmit = (registerUser: IRegisterUser) => {
        toast.dismiss();
        setLoading(true);
        agent.Users.register(registerUser)
            .then((response: IUser) => {
                setUser(response);
                window.localStorage.setItem('user', JSON.stringify(response));
                setLoading(false);
                formik.resetForm();
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            values.displayName = values.userName.replace(/\s/g, '');
            handleSubmit(values);
        },
        validationSchema: reviewSchema
    });

    return (
        <Fragment>
            <Form
                onSubmit={formik.handleSubmit}
                loading={loading}
                error
            >
                <Form.Input
                    placeholder="Enter User Name"
                    label='User Name'
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                />
                {(formik.touched.userName && formik.errors.userName) && <Message style={{ display: 'block' }} error >{formik.errors.userName}</Message>}
                <Form.Input
                    placeholder="Enter Email"
                    label='Email'
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {(formik.touched.email && formik.errors.email) && <Message style={{ display: 'block' }} error >{formik.errors.email}</Message>}
                <Form.Input
                    placeholder="Enter Password"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {(formik.touched.password && formik.errors.password) && <Message style={{ display: 'block' }} error >{formik.errors.password}</Message>}
                <Button.Group widths="2">
                    <Button
                        floated='right'
                        positive
                        type="submit"
                        content="Register"
                    />
                    <Button
                        floated='left'
                        type="button"
                        content="Clear Form"
                        onClick={() => { formik.resetForm(); toast.dismiss(); }}
                    />
                </Button.Group>
            </Form>
        </Fragment>
    )
}
