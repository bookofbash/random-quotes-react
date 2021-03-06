import React, { Component } from 'react';
import './App.css';
let index = 0;
let  twitterURL = 'https://twitter.com/intent/tweet?text=';
const API = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } }); //Decodes HTML Entity ie. "&amp;nbsp;"
const colors = ['#eee', '#FFE5A8', '#A8FFC5', '#A8C1FF', '#FFA8F2', '#FFA8A8' ]
let random = Math.floor(Math.random() * (6 - 1)) + 1;
class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      quote: '',
      isLoading: false,
      textColor: colors[random]
    };
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData = () => { 
    let random = Math.floor(Math.random() * (6 - 1)) + 1;
    console.log('Fetching New Data');
    console.log(random);
    this.setState({ isLoading: true });
    //Initial Data
    fetch(API, { cache: "reload" })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else{
        throw new Error('Something went wrong...');
      }
    })
    .then(data => this.setState({ 
      author: data[index].title, 
      quote: data[index].content, 
      isLoading: false, 
      textColor: colors[random]
    }))
    .catch(error => this.setState({error, isLoading: false}));
    }


  render() {
    const { author, quote, isLoading, error } = this.state;
    var plainQuote = quote.replace(/(<([^>]+)>)/ig,"");
    var plainAuthor = author.replace(/(<([^>]+)>)/ig,"");

    
    if (error) {
      console.log(error);
      return (      
        <div id='main'>
        <div className='container'>
          <div id="quote-box">
            <div id='text' className='errorMessage'>OOPS!</div>
            <div id='author'>Something went wrong. Click Again.</div>
          </div>
        </div>
        <div className='container'>
          <button id='new-quote' onClick={this.fetchData}>GENERATE</button>
        </div>
      </div>
      )
    }

    if (isLoading) {
      return (      
        <div id='main'>
        <div className='container'>
          <div id="quote-box">
            <div id='text'>{renderHTML(plainQuote)}</div>
            <div id='author'>{renderHTML(plainAuthor)}</div>
          </div>
        </div>
        <div className='container'>
          <button id='new-quote' onClick={this.fetchData}>GENERATE</button>
          <a id='tweet-quote'href={twitterURL+plainQuote+ " -"+ plainAuthor}><i className="fab fa-twitter"></i></a>
        </div>
      </div>
      )
    }
    return (
      <div id='main' style={{color: this.state.textColor}}>
        <div className='container'>
          <div id="quote-box" style={{borderColor: this.statetextColor}}>
            <div id='text'>{renderHTML(plainQuote)}</div>
            <div id='author'>{renderHTML(plainAuthor)}</div>
          </div>
        </div>
        <div className='container'>
          <button id='new-quote' onClick={this.fetchData} style={{backgroundColor: this.state.textColor}}>GENERATE</button>
          <a id='tweet-quote'href={twitterURL+plainQuote+ '-'+ plainAuthor} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
      </div>



    );
  }
}


export default Counter;
