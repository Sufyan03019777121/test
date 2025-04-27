import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Product Details (ID: {id})</h2>
      <p>Yahan par product ka detail ayega.</p>
    </div>
  );
}

export default Details;
