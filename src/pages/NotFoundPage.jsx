import "./NotFound.css";

import { Link } from "react-router-dom";

export function NotFoundPage()
{
    return (
        <div className="not-found">
            <div>
                <h1>Error 404</h1>
                <h3>Page Not Found</h3>
                <h4>Go <Link to="/">back</Link></h4>
            </div>

            <div>
                <h1>:(</h1>
            </div>
        </div>
    )
}