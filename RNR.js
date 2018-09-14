function createNode(element){
  return document.createElement(element);
}

function append(parent, element){
  return parent.appendChild(element)
} 
let body = document.querySelector('body')


fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a62b82adc88947479824b7f88a2c44db')
.then(function(response){
  return response.json();  
})
.then(function(data){
  console.log(data)
  let allArticles = data.articles; 
  return allArticles.map(function(article){
    let articleDiv = createNode('div');
    let headline = createNode('h1');
    let author = createNode('h3');
    let date = createNode('p');
    let image = createNode('img')
    let content = createNode('p'); 
    let contentLink = createNode('a'); 

    headline.textContent = `${article.title}`
    
    author.textContent = `Written by ${article.author}`
    
    date.textContent = `Published on ${article.publishedAt}`
    
    image.src = `${article.urlToImage}`;
    image.className = 'article-image';
    
    content.textContent = `${article.content}`

    contentLink.href = `${article.url}`
    contentLink.textContent = "Read more"
    
    append(body, articleDiv);
    append(articleDiv, headline);
    append(articleDiv, author)
    append(articleDiv, date)
    append(articleDiv, image)
    append(articleDiv, content)
    append(articleDiv, contentLink)
  })
}).catch(console.log)