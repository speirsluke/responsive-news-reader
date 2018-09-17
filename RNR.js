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
const UK = document.querySelector('.UK');
const USA = document.querySelector('.USA')
const submit = document.querySelector('.search');
let home = document.querySelector('.navbar-icon')

function createNews(data) {
  let allArticles = data.articles; 
  return allArticles.map(function(article){
    let articleDiv = createNode('div');
    
    let headline = createNode('h1');
    let author = createNode('h3');
    let date = createNode('p');
    let imageLink = createNode('a');
    let image = createNode('img');
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
    
        imageLink.href = `${article.url}`;

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
        append(articleDiv, imageLink)
        append(imageLink, image)
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
fetch(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=a62b82adc88947479824b7f88a2c44db`)
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

function newsUSA() {
  fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a62b82adc88947479824b7f88a2c44db`)
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




submit.addEventListener('submit', function(event){
  if (searchInput.value !== "") {
    
    searchRes.textContent = "";
    body.innerHTML = "";

    event.preventDefault()
    console.log(searchInput.value)

  
  append(header, searchRes)
  searchRes.className = "search-res"
  searchRes.textContent = `Search results for: ${searchInput.value}`
  searchRes.innerHTML = `${searchRes.textContent}` + '<br>' + '<br>'
  newSearch(searchInput.value)
  }
})


UK.addEventListener('click', function(event){
  event.preventDefault();
  body.innerHTML = "";
  searchDiv.innerHTML = "";
  newsDefault(); 
})

USA.addEventListener('click', function(event){
  event.preventDefault();
  body.innerHTML = "";
  searchDiv.innerHTML = "";
  newsUSA(); 
})
// const artImg = document.querySelector('.img-grow');
// const artCon = document.querySelector('.article-content');
// artImg.addEventListener('click', function(event){
//   artCon.innerHTML = '<style>' + 'display="flex' + '</style>'
//   console.log(artCon)
// })

