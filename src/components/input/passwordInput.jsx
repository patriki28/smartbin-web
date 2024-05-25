import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function PasswordInput({ name, password, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-control d-flex justify-content-between align-items-center">
            <input
                name={name}
                value={password}
                onChange={onChange}
                type={showPassword ? 'text' : 'password'}
                className="w-100 border-0 fs-5 outline-0"
                placeholder={placeholder ? placeholder : 'Enter Password'}
                required
            />
            <Button variant="outline-secondary" className="border-0" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEyeSlash size={30} /> : <BsEye size={30} />}
            </Button>
        </div>
    );
}
