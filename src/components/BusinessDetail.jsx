import React, { useState, useEffect } from "react";
import axios from "axios";

const BusinessDetail = ({ match }) => {
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    const businessId = match.params.id;
    const businessResponse = await axios.get(
      `https://api.yelp.com/v3/businesses/${businessId}`,
      {
        headers: {
          Authorization: "Bearer YOUR_YELP_API_KEY",
        },
      }
    );
    const reviewsResponse = await axios.get(
      `https://api.yelp.com/v3/businesses/${businessId}/reviews`,
      {
        headers: {
          Authorization: "Bearer YOUR_YELP_API_KEY",
        },
      }
    );
    setBusiness(businessResponse.data);
    setReviews(reviewsResponse.data.reviews);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{business.name}</h2>
      <div>
        <h3>Slideshow Photos</h3>
        <div>
          {business.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      </div>
      <div>
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>{review.text}</li>
          ))}
        </ul>
      </div>
      <p>Rating: {business.rating}</p>
      <a href={business.url} target="_blank" rel="noopener noreferrer">
        See on Google Maps
      </a>
    </div>
  );
};

export default BusinessDetail;
