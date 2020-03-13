import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { ILoginUser } from '../../../app/models/IUser'

export const LoginForm = () => {
    let [loginUser, setLoginUser] = useState<ILoginUser>({email:'', password:''})
    
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) =>{
        let {name, value} = e.target;
        setLoginUser({...loginUser, [name]: value})
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log(loginUser);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input type="email" onChange={(e) => handleChange(e)} placeholder="Email" value={loginUser.email} name="email" />
            <Form.Input type="password" onChange={(e) => handleChange(e)} placeholder="Password" name="password" value={loginUser.password}/>
            <Button.Group widths="2">
                <Button floated='right' positive type="submit" content="Login" />
                <Button floated='left' type="button" content="Clear Form" />
            </Button.Group>
        </Form>
    )
}
