import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="error-main text-center">
            <h1 className="error-heading">404</h1>
            <p className="error-description">page not found!</p>
            <Link className="btn px-4 text-light goBtn mt-4" to="/">
              <i className="fa-solid fa-arrow-left"></i> go back on home page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
