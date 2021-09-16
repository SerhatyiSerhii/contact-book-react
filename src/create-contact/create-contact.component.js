import React from 'react';
import AddContactForm from '../add-contact-form/add-contact-form.component';
import './create-contact.component.scss';

function CreateContact() {

    let [visible, setVisible] = React.useState(false);


    function toggleForm() {
        setVisible(visible = !visible);
    }

    return (
        <div className="top-line">
            <button type="button" className="add-contact" title="Add contact" onClick={toggleForm}>
                <span className="plus"></span>
            </button>
            <AddContactForm visible={visible} closeForm={toggleForm}/>
        </div>
    );
}

export default CreateContact;