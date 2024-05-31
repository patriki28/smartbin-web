import { Row, Col } from 'react-bootstrap';
import LoginCard from '../../components/card/LoginCard';
import LoginBackground from '../../assets/backgroundImage/loginBackground.png';

export default function LoginPage() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100 h-100">
                <Col
                    className="d-md-flex flex-column d-none justify-content-end p-2"
                    style={{
                        backgroundImage: `url(${LoginBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="bg-dark rounded-5 text-white px-4 py-3">
                        <h1 className="fw-bold display-5">Welcome to Smart Bin Management</h1>
                        <p className="fs-2">where you can manage your waste efficiently</p>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <LoginCard />
                </Col>
            </Row>
        </div>
    );
}
