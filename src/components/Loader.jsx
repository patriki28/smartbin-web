import { Spinner } from 'react-bootstrap';

export default function Loader() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Spinner size="lg" />
        </div>
    );
}
