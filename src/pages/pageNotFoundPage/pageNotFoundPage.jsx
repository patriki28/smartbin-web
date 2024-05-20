import { Link } from 'react-router-dom';

export default function PageNotFoundPage() {
    return (
        <section className="bg-white flex min-vh-100 items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-dark">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something&apos;s missing.</p>
                    <p className="mb-4 text-lg text-gray-900">
                        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
                    </p>
                    <Link to="/" className="text-white bg-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}
