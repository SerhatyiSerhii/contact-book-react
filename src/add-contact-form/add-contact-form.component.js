import React from "react";
import "./add-contact-form.component.scss";

function AddContactForm(props) {
    const [contactFields, setContactFields] = React.useState([
        { name: 'name', title: 'Name', isValid: false, isDirty: false, validationRequired: true },
        { name: 'surname', title: 'Surname', isValid: false, isDirty: false, validationRequired: true },
        { name: 'phone', title: 'Phone', isValid: false, isDirty: false, validationRequired: false, isEmpty: true },
        { name: 'email', title: 'Email', isValid: false, isDirty: false, validationRequired: false, isEmpty: true }
    ]);
    const [disable, setDisable] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const pattern = '^(?=.*[0-9])[- +()0-9]+$';

    function checkFormValidity() {
        const map = new Map();

        for (let item of contactFields) {
            map.set(item.name, item.isValid);
        }

        if ((map.get('name') && map.get('surname')) && (map.get('phone') || map.get('email'))) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    function isValidField(item, event) {
        setContactFields(contactFields.map((contact) => {
            if (item === contact && event.target.value.trim() !== '') {
                contact.isValid = true;
            }

            if (item === contact && event.target.value.trim() === '') {
                contact.isValid = false;
            }

            return contact;
        }));
    }

    function isValidPhone(item, event) {
        setContactFields(contactFields.map((contact) => {

            if (item === contact && event.target.value.match(pattern)) {
                contact.isValid = true;
            }

            if (item === contact && !event.target.value.match(pattern)) {
                contact.isValid = false;
            }

            if (item === contact && event.target.value !== '') {
                contact.isEmpty = false;
            }

            if (item === contact && event.target.value === '') {
                contact.isEmpty = true;
            }

            return contact;
        }));
    }

    function isValidEmail(item, event) {
        setContactFields(contactFields.map((contact) => {
            if (item === contact && event.target.value !== '') {
                item.isEmpty = false;
            }

            if (item === contact && event.target.value === '') {
                item.isEmpty = true;
            }

            if (item === contact && event.target.validity.valid && event.target.value !== '') {
                item.isValid = true;
            }

            if (item === contact && !event.target.validity.valid) {
                item.isValid = false;
            }

            return contact;
        }));
    }

    function isDirtyField(item) {
        setContactFields(contactFields.map((contact) => {
            if (item === contact) {
                contact.isDirty = true;
            }

            return contact;
        }));
    }

    function closeAddContactForm() {
        props.closeForm();

        const inputs = document.querySelectorAll('.new-contact');

        for (let item of inputs) {
            item.value = '';
        }

        setContactFields(contactFields.map((item) => {
            item.isValid = false;
            item.isDirty = false;

            return item;
        }));
    }

    React.useEffect(() => {
        const inputs = document.querySelectorAll('.new-contact');

        function pickButtonTitle(array) {
            const map = new Map();

            const phone = contactFields.find((item) => item.name === 'phone');
            const email = contactFields.find((item) => item.name === 'email');

            for (const item of array) {
                map.set(item.name, item.value);
            }

            if (!map.get('name')) {
                return 'Enter new name';
            }

            if (!map.get('surname')) {
                return 'Enter new surname';
            }

            if (!map.get('phone') && !map.get('email')) {
                return 'Enter new phone number or new email address';
            }

            if (!phone.isValid && map.get('phone') !== '') {
                return 'Phone number is invalid'
            }

            if (!email.isValid && map.get('email') !== '') {
                return 'Email address is invalid'
            }

            return '';
        }


        setTitle(pickButtonTitle(Array(...inputs)));

    }, [contactFields]);

    return (
        <div className={"form " + (props.visible ? "visible" : "")}>
            <form>
                <span>New Contact</span>
                {
                    contactFields.map((item, index) => {

                        if (item.name === 'email') {
                            return <label key={index}>
                                <input type="email" autoComplete="off" placeholder={item.title}
                                    name={item.name}
                                    onBlur={() => isDirtyField(item)}
                                    onChange={(event) => {
                                        isValidEmail(item, event);
                                        checkFormValidity();
                                    }}
                                    className={"new-contact " + ((!item.isValid && !item.isEmpty) ? "alert" : "")}
                                />
                            </label>
                        } else {
                            return <label key={index}>
                                <input type="text" autoComplete="off" placeholder={item.title}
                                    name={item.name}
                                    onBlur={() => isDirtyField(item)}
                                    onChange={(event) => {
                                        ((item.name === "phone") ? isValidPhone(item, event) : isValidField(item, event));
                                        checkFormValidity();
                                    }}
                                    className={"new-contact " + (((!item.isValid && item.isDirty && item.validationRequired) ||
                                        (item.name === 'phone' && !item.isValid && !item.isEmpty)) ? "alert" : "")}
                                />
                            </label>
                        }
                    })
                }

                <div className="buttons">
                    <button type="button" onClick={closeAddContactForm}>Cancel</button>
                    <button type="submit" disabled={disable} title={title}>Create contact</button>
                </div>
            </form>
        </div>
    )
}

export default AddContactForm;