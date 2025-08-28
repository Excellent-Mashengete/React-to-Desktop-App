import ApiClient from "../service/ApiClient";
import { useState, useEffect } from 'react'
import { validateEmail, validateName, validateDateHired } from '../utils/validations';
import {Success, Error} from "../utils/toastType";

function Modal({ user, onSave, onClose }) {
    const initialFormState = {
        id: null,
        fullName: '',
        email: '',
        salary: '',
        dateHired: '',
        isActive: 1,
    };

    const [localErrors, setLocalErrors] = useState({});
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (user) {
            setFormData(user);
        }else{
            setLocalErrors({});
            setFormData(initialFormState);
        }
    }, [user]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (localErrors[name]) {
            setLocalErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        const fullNameError = validateName(formData.fullName);
        if (fullNameError) newErrors.fullName = fullNameError;

        const hireDateError = validateDateHired(formData.dateHired);
        if (hireDateError) newErrors.dateHired = hireDateError;

        setLocalErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClose = () => {
        setFormData(initialFormState);
        setLocalErrors({});
        onClose();
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!validateForm()) return;
            let response;
            if (formData.id) {
                var result = await ApiClient.updateEmployee(formData.id, formData);
                if(!result.success) {
                    onClose();
                    Error(result.message || "Error updating employee" );
                    return;
                }
                Success("employee updated successfully");
                response = result;
            } {
                var result = await ApiClient.createEmployee(formData);

                if(!result.success) {
                    onClose();
                    Error(result.message || "Error creating employee");
                    return;
                }

                Success("employee created successfully" );
                response = result;
            }
            onSave(response);
            onClose();
        } catch (error) {
            Error("Error saving employee" );
            console.error("Error saving employee:", error);
        }
    };

    return (
        <>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{user ? "Edit Employee" : "Add Employee"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control  flex flex-col justify-center">
                            <label className="text-left">Enter Full Name </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="input w-full input-bordered"
                            />
                            {localErrors.fullName && <p className="text-red-500 text-left">{localErrors.fullName}</p>}
                        </div>
                        <br></br>
                        <div className="form-control flex flex-col justify-center">
                            <label className="text-left">Enter Email address </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input w-full input-bordered"
                            />
                            {localErrors.email && <p className="text-red-500 text-left">{localErrors.email}</p>}
                        </div>
                        <br></br>
                        <div className="form-control flex flex-col justify-center">
                            <label className="text-left">Enter Salary </label>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className="input w-full input-bordered"
                            />
                        </div>
                        <br></br>
                        <div className="form-control  flex flex-col justify-center">
                            <label className="text-left">Enter Hire Date </label>
                            <input
                                type="date"
                                name="dateHired"
                                value={formData.dateHired}
                                onChange={handleInputChange}
                                className="input w-full input-bordered"
                            />
                            {localErrors.dateHired && <p className="text-red-500 text-left">{localErrors.dateHired}</p>}
                        </div>

                        <br></br>
                        <div className="modal-action ">
                            <button type="button" onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button type="button" onClick={handleClose} className="btn">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form >
                </div>
            </dialog >
        </>
    );
}

export default Modal