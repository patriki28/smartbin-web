import { Link } from 'react-router-dom';

export default function NoRegisterPage() {
    return (
        <div className="text-center text-gray-500 text-xl">
            No registered bins available. Please add a bin from the dashboard. <br />
            <Link to="/home/dashboard" className="text-blue-600">
                Go to dashboard
            </Link>
        </div>
    );
}
