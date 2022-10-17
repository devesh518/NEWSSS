import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        // We have used destructing here. this.props is an object from which we can pull title and description
        return (
            <div>
                <div className="card">
                    <img src={!imageUrl?"https://s.w-x.co/in-lucy.jpg":imageUrl} className="card-img-top " alt="There is an imageee here"/>
                    <div className="card-body">
                        {/* Passing the title as props */}
                        <h5 className="card-title">{title}</h5>
                        <span className="badge bg-secondary text-end mb-2">{source}</span>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Last updated by {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary ">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem