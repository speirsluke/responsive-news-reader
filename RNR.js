function createNode(element){
  return document.createElement(element);
}

function append(parent, element){
  return parent.appendChild(element)
} 

function deleteNode(parent, element) {
  parent.removeChild(element)
}


let searchRes = createNode('h1');
let body = document.querySelector('.body');
let searchInput = document.querySelector('.search-input');
let homeIcon = document.querySelector('.home-icon');
const searchDiv = document.querySelector('.search-div');
let header = document.querySelector('.header')

function createNews(data) {
  let allArticles = data.articles; 
  return allArticles.map(function(article){
    let articleDiv = createNode('div');
    
    let headline = createNode('h1');
    let author = createNode('h3');
    let date = createNode('p');
    let image = createNode('img')
    let content = createNode('p'); 
    let contentLink = createNode('a'); 
    
    if (article.content !== null) {
        articleDiv.className = 'article-div';

        headline.textContent = `${article.title}`;
        headline.className = 'article-headline';
    
        author.className = 'article-author';
        if (article.author == null) {
          author.textContent = 'Author unknown';
        } else if (article.author == "") {
          author.textContent = 'Author unknown';
        } else {
        author.textContent = `Written by ${article.author}`;
        }
    
        date.textContent = `Published on ${article.publishedAt}`;
        date.className = 'article-date'
    
        image.src = `${article.urlToImage}`;
        image.className = 'article-image img-grow hvrbox_background';
        
        content.textContent = `${article.content}`
        content.className = 'article-content'
    
        contentLink.href = `${article.url}`
        contentLink.textContent = "Read more"
        contentLink.className = 'article-link'
        
        append(body, articleDiv);
        append(articleDiv, headline);
        append(articleDiv, author)
        append(articleDiv, date)
        append(articleDiv, image)
        append(articleDiv, content)
        append(articleDiv, contentLink)
    }
  })
}

if (searchInput.value !== "") {
  newSearch(searchInput.value)
} else {
  newsDefault();
}

function newSearch(word){
return fetch(`https://newsapi.org/v2/everything?q=${word}&apiKey=a62b82adc88947479824b7f88a2c44db`)
.then(function(response){
  return response.json();
})
.then(function(data){
  createNews(data)
})
}
 
function newsDefault() {
fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=a62b82adc88947479824b7f88a2c44db`)
.then(function(response){
  return response.json();  
})
.then(function(data){
  searchRes.className = "search-res";
  searchRes.textContent = "Todays top headlines:"
  append(header, searchRes)
  createNews(data);
})
}



const submit = document.querySelector('.search');
submit.addEventListener('submit', function(event){
  if (searchInput.value !== "") {
    
    searchRes.textContent = "";
    body.innerHTML = "";

    event.preventDefault()
    console.log(searchInput.value)

  
  append(header, searchRes)
  searchRes.className = "search-res"
  searchRes.textContent = `Displaying search results for: ${searchInput.value}`
  searchRes.innerHTML = `${searchRes.textContent}` + '<br>' + '<br>'
  newSearch(searchInput.value)
  }
})

let home = document.querySelector('.navbar-icon')
home.addEventListener('click', function(event){
  event.preventDefault();
  body.innerHTML = "";
  searchDiv.innerHTML = "";
  newsDefault(); 
})

// const artImg = document.querySelector('.img-grow');
// const artCon = document.querySelector('.article-content');
// artImg.addEventListener('click', function(event){
//   artCon.innerHTML = '<style>' + 'display="flex' + '</style>'
//   console.log(artCon)
// })