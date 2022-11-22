import React from 'react';
import { useState } from 'react';
import { SEND_MAIL } from '../BackendResponses/backendRequest';
import { notifyError, notifySuccess } from '../Toastify/ToastNotifications';

import FormContainer from '../Form/FormContainer';
import SimpleInput from '../Form/FormComponents/SimpleInput';
import TextArea from '../Form/FormComponents/TextArea';
import FormHeading from '../Form/FormComponents/FormHeading';
import Button from '../Modals/Button';
export default function Contact() {

    const [inputs, setInputs] = useState({
        name: "", email: "", subject: "", message: ""
    });

    const handleChange = (event) => {
        setInputs((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };

    //server

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await SEND_MAIL(inputs);
        if(response.status === 200)
            notifySuccess("Mail Send");
        else notifyError(response.message);

    }
    return (
        <section className='contactus_wrapper'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <FormContainer onSubmit = {handleSubmit}>
                            <FormHeading heading = {"Contact US"}/>
                            <SimpleInput
                                placeholder = {"Full Name"}
                                onChange = {handleChange}
                                label = "Full Name"
                                id = "fullname"
                            />
                            <SimpleInput
                                placeholder = {"Email"}
                                onChange = {handleChange}
                                label = "Email"
                                id = "email"
                                name = "email"
                            />
                            <SimpleInput
                                placeholder = {"Subject"}
                                onChange = {handleChange}
                                label = "Subject"
                                id = "subject"
                                name = "subject"
                            />
                            <TextArea
                                label={"Message"}
                                name = {"message"}
                                onChange = {handleChange}
                            />
                            <Button
                                title={"Send Mail"}
                                type={"Submit"}
                                btn_name={"Send Mail"}
                                icon={"bi bi-send"}
                            />
                        </FormContainer>
                    </div>
                </div>
            </div>
        </section>

    )
}
