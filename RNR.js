function createNode(element){
  return document.createElement(element);
}

function append(parent, element){
  return parent.appendChild(element)
} 

function deleteNode(parent, element) {
  parent.removeChild(element)
}

let body = document.querySelector('.body')
let searchInput = document.querySelector('.search-input')
let homeIcon = document.querySelector('.home-icon')

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
        image.className = 'article-image';
        
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
  createNews(data);
})
}


const submit = document.querySelector('.search');
submit.addEventListener('submit', function(event){
  if (searchInput.value !== "") {
    body.innerHTML = "";
    event.preventDefault()
  console.log(searchInput.value)
  newSearch(searchInput.value)
  }
})

homeIcon.addEventListener('click', function(event){
  event.preventDefault()
  newsDefault()
})

