"use client";

import React from "react";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    placeholder?: string;
    as?: "input" | "textarea" | "select";
    options?: { value: string; label: string }[];
}

const FormField = ({
                       id,
                       label,
                       type = "text",
                       value,
                       onChange,
                       placeholder,
                       as = "input",
                       options = [],
                   }: FormFieldProps) => {
        return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            {
                as === "textarea" ? (
                    <textarea
                        id={id}
                        name={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="form-textarea"
                    />
                ) : as === "select" && options ? (
                    <select
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                        className="form-select"
                    >
                        {options.map(({label, value}) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        id={id}
                        name={id}
                        type={type || "text"}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="form-input"
                    />
                )
            }
        </div>
    );
};

export default FormField;
