import NotFoundImage from '../../images/not-found.png';

function NotFound({ errMessage }) {

    return (
        <div className="not-found">
            <img src={NotFoundImage} alt="Not found" className="not-found__image" />
            <h2 className="not-found__title">Nothing found</h2>
            <p className="not-found__text">{errMessage || `Sorry, but nothing matched your search terms.`}</p>
        </div>
    )
}

export default NotFound;