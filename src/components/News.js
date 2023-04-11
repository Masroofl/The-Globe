import React, { useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

// document.title = `${ props.category} - NewsMonkey`;
const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    


    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,

        // })
        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`NewsMonkey-${props.category}`
        updateNews();
        // eslint-disable-next-line 
    },[])

    // cyclic method 
    // const componentDidMount = async () => {
    //     updateNews();
    //     const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${ props.category}&apiKey=00153795c6f34e1b9d1c44e5000f6997&page=${ state.page}&pageSize=${ props.pageSize}`;
    //      setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //      setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false,

    //     })
    // }


    const fetchMoreData = async () => {
        // a fake async api call like which sends
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    //handling previous and next clicks
    // handlePrevClick = async () => {

    //      setState({ page:  state.page - 1 })
    //      updateNews();
    // }
    // handleNextClick = async () => {

    //      setState({ page:  state.page + 1 })
    //      updateNews();
    // }


    return (
        <>
            <h2 className="text-center" style={{marginTop:'70px'}}>NewsMonkey - Top Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imgurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>;
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="d-flex justify-content-between">
                    <button disabled={ state.page <= 1} type="button" className="btn btn-primary my-2" onClick={ handlePrevClick}>&larr; Previous</button>
                    <button disabled={ state.page + 1 >= Math.ceil( state.totalResults /  props.pageSize)} type="button" className="btn btn-primary my-2" onClick={ handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    );

}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'General'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;
