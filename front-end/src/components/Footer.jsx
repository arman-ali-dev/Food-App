import { Link } from "react-router-dom";
export function Footer() {
  return (
    <>
      <footer className="text-center ">
        <div className="container">
          <div className="py-5">
            <Link
              className="btn  social-btn   h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              className="btn  social-btn   h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </Link>

            <Link
              className="btn  social-btn h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-google"></i>
            </Link>

            <Link
              className="btn social-btn   h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </Link>

            <Link
              className="btn  social-btn h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              {" "}
              <i className="fab fa-linkedin"></i>
            </Link>

            <Link
              className="btn social-btn  h-12 footer-btn text-dark btn-link btn-floating btn-lg m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-github"></i>
            </Link>
          </div>
        </div>

        <div className="text-center border-top border-secondary p-3 bottomFooter text-light">
          © 2020 Armaan's Food Store
        </div>
      </footer>
    </>
  );
}
