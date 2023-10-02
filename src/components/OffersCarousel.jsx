const OffersCarousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide carousel-fade w-75 mx-auto my-5"
      data-bs-ride="true"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner" data-bs-interval="3000">
        <div className="carousel-item active ratio ratio-21x9">
          <img
            src="https://i.ibb.co/4WfFnnC/Grey-Minimalist-Special-Offer-Banner-Landscape.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item ratio ratio-21x9" data-bs-interval="3000">
          <img
            src="https://i.ibb.co/72MmRdK/Cream-Brown-Simple-Special-Offer-Banner-Landscape.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item ratio ratio-21x9" data-bs-interval="3000">
          <img
            src="https://i.ibb.co/qrQRKLY/Beige-Brown-Minimalist-Casual-Style-Banner-Landscape.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default OffersCarousel;
