import { useRouteError } from "react-router-dom";
import "./ErrorPage.css"


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div className="error-box">
        <h1 className="error-title">Oops, an error occurred!</h1>
        <p className="error-message"><i>{error.statusText || error.message}</i></p>
        <p className="error-description">Please try again later.</p>
      </div>
    </div>
  );
}

