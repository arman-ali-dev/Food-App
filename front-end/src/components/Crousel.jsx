export function Crousel() {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/chicken.jpeg"
                className="d-block w-100 crousel-image"
                height="700"
                style={{ objectFit: "cover" }}
                alt="..."
              />
            </div>

            <div className="carousel-item ">
              <img
                src="/burger.jpeg"
                className="d-block w-100 crousel-image"
                height="700"
                style={{ objectFit: "cover" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/pizza.jpeg"
                className="d-block w-100 crousel-image"
                height="700"
                style={{ objectFit: "cover" }}
                alt="..."
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="container">
          <div className="heading">
            <h2>Your food, your way – always fresh, always fast.</h2>
          </div>
        </div>
      </div>
    </>
  );
}
