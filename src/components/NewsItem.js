import React from 'react'

const NewsItem = (props) => {

    let { title, description, imgurl, url, author, date, source } = props;
    return (
        <div className="my-2">
            <div>
                <span className="badge rounded-pill bg-danger"> {source} </span>
            </div>
            <div className="card">
                <img src={!imgurl ? 'https://www.newswise.com/assets/new/img/newswise-logo-square.jpg' : imgurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title} </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div >

    )

}

export default NewsItem
