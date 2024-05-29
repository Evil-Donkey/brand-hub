import Link from "next/link";
import Logo from "./components/Logo"

export default function NotFound() {
    return (
        <main className='not-found-wrapper d-flex align-items-center justify-content-center'>
          <div className="container">
            <div className="row justify-content-center">
              <div className='col-auto text-center d-flex flex-column'>
                <Link href="/">
                  <Logo color="#fff" />
                </Link>
                <h1 className="my-4">Page not Found</h1>
                <div>
                  <Link href="/" className="cta__btn">Go to Homepage</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
}