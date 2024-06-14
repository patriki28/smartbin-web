export default function Select({ label, id, value, options, onChange }) {
    return (
        <div>
            <label htmlFor={id} className="font-semibold text-lg">
                {label}:
            </label>
            <select id={id} value={value} className="border rounded-lg p-2 ml-2" onChange={(e) => onChange(e.target.value)}>
                {options.length === 0 ? (
                    <option value="No data available" disabled>
                        No data available
                    </option>
                ) : (
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}
