import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function PasswordInput({ password, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control d-flex justify-content-between align-items-center">
      <input
        placeholder={placeholder ? placeholder : "Enter Password"}
        value={password}
        className="w-100 border-0 fs-5 outline-0"
        type={showPassword ? "text" : "password"}
        onChange={onChange}
      />
      <Button
        variant="outline-secondary"
        className="border-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <BsEyeSlash size={30} /> : <BsEye size={30} />}
      </Button>
    </div>
  );
}
