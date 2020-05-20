let newsList = [];
let newsListMore = [];
let articles = 0;
const apiKey = "5e5500d7bbad403aa9c802f399b81744"
const loadNews = async () => {
  let url = "https://newsapi.org/v2/everything?q=forex&sortBy=publishedAt&pageSize=20&apiKey=5e5500d7bbad403aa9c802f399b81744";
  let data = await fetch(url);
  let result = await data.json();
  newsList = result.articles;
  render(newsList);
  console.log(result)
}
loadNews()

const render = (list) => {
  let newsHTML = list.map(item => `<div id="newsArea">
      <div id="news">
        <h1 id="title">${item.title}</h1>
        <h3 style="font-size: 15px; font-weight: 200;">${item.description}</h3>
        <h4 style="font-size: 12px;">${moment(item.publishedAt).startOf('hour').fromNow()}</h4>
        <a href="${item.url}" id="source">Read more at ${item.source.name}</a>
        <div id="publisedAt">${item.publishedAt}</div>
      </div>
      <div id="imgArea">
        <img src="${item.urlToImage}" style="width: 500px;" alt=""/>
      </div>
    </div>`).join("")
  document.getElementById("newsArea").innerHTML = newsHTML
  document.getElementById("articles-num").innerHTML = list.length;
  showNumberOfArticles(list)
}
// Show 20 more articles
const getShowDataMore = async () => {
  let url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=5e5500d7bbad403aa9c802f399b81744";
  let data = await fetch(url);
  let result = await data.json();
  newsListMore = result.articles;
  renderMoreNews(newsListMore);

}

const renderMoreNews = (list) => {
  let newsHTML = list.map(item => `<div id="newsArea">
      <div id="news">
        <h1 id="title">${item.title}</h1>
        <h3 style="font-size: 15px; font-weight: 200;">${item.description}</h3>
        <h4 style="font-size: 12px;">${moment(item.publishedAt).startOf('hour').fromNow()}</h4>
        <a href="${item.url}" id="source">Read more at ${item.source.name}</a>
        <div id="publisedAt">${item.publishedAt}</div>
      </div>
      <div id="imgArea">
        <img src="${item.urlToImage}" style="width: 500px;" alt=""/>
      </div>
    </div>`).join("")
  document.getElementById("load-moar-btn").innerHTML = "That's all I got :(";
  document.getElementById("moarContent").style.display = "block";
  document.getElementById("moarContent").innerHTML = newsHTML
  showNumberOfArticlesMore(list)
}

//Show numbers of articles
let numberOfArticlesArray = [];

const showNumberOfArticles = (numberOfArticles) => {
  let totalArticles = 0;
  numberOfArticles.map(_ => {
    totalArticles = numberOfArticles.length;
    numberOfArticlesArray.push(totalArticles);
  });
  document.getElementById("articles-num").innerHTML = totalArticles;
}

const showNumberOfArticlesMore = (numberOfArticles) => {
  let totalArticles = 0;
  numberOfArticles.map(_ => {
    totalArticles = numberOfArticles.length;
    numberOfArticlesArray.push(totalArticles);
  });
  for (let i = 0; i < numberOfArticles.length; i++) {
    document.getElementById("articles-num").innerHTML = numberOfArticlesArray[i] + numberOfArticlesArray[i + 1];
  }
}
