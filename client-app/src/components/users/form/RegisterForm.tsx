import React, { useState, useEffect } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { IRegisterUser, IUser } from '../../../app/models/IUser';
import agent from '../../../app/api/agent';
import { history } from '../../../index';
import * as yup from 'yup';
import { useFormik } from 'formik';

interface IProps {
    setUser: (user: IUser) => void;
}

const reviewSchema = yup.object({
    displayName: yup.string().required().min(1),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
})

export const RegisterForm: React.FC<IProps> = ({ setUser }) => {
    let [loading, setLoading] = useState<boolean>(false);
    let [loggedIn, setLoggedin] = useState<boolean>(false);

    let initialValues: IRegisterUser = { displayName: '', userName: '', email: '', password: '' };

    useEffect(() => {
        if (loggedIn) history.push('/');
    }, [loggedIn]);

    const handleSubmit = (registerUser: IRegisterUser) => {
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

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values, actions) => {
            values.userName = values.displayName.replace(/\s/g, '');
            handleSubmit(values);
            actions.resetForm();
        },
        validationSchema: reviewSchema
    });

    return (
        <Form
            onSubmit={formik.handleSubmit}
            loading={loading}
            error
        >
            <Form.Input
                placeholder="Enter Full Name"
                label='Full Name'
                name="displayName"            
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.displayName}
            />
            {(formik.touched.displayName && formik.errors.displayName) && <Message style={{ display: 'block' }} error >Full Name is Required</Message>}
            {/* <Form.Input
                placeholder="User Name"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName} />
            {(formik.touched.displayName && formik.errors.displayName) && <Message style={{ display: 'block' }} error >{formik.errors.displayName}</Message>} */}
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
                    onClick={() => formik.resetForm()} 
                />
            </Button.Group>
        </Form>
    )
}
