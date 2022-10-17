import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general',
        setProgress: 20
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.func
    }

    capitalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        }
        document.title = `${this.capitalise(this.props.category)} - Devesh Times`
    }

    async componentDidMount(){
        // componentDidMount is a lifecycle method in React
        // We use this method to load news from the API
        this.updateNews()
    }

    async updateNews(){
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // Set loading to true here
        this.setState({loading: true})
        let data = await fetch(url)
        // To parse data to json
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            // Set loading to false here again
            loading: false
        })
        this.props.setProgress(100)
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page + 1})
        this.updateNews()
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1})
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12b7e5fea080498d857606a118c780fd&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // Set loading to true here
        this.setState({loading: true})
        let data = await fetch(url)
        // To parse data to json
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            // Set loading to false here again
            loading: false
        })
    }

    render() {
        return (
        <div className='container my-3'>
            <h2 className='text-center'>Devesh Times - {this.capitalise(this.props.category)} Headlines of the day</h2>
            {/* this.state.articles is used to access the articles array, map() is a higher order array function and we will give an arrow function to it */}
            <InfiniteScroll dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<Spinner/>}>
                <div className="container">
                    <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-3 my-3" key={element.url}>
                            <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Anonymous"} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
        )
    }
}

export default News