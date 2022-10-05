const express = require('express')
const app = express()
const movieList = require('./movies.json')
const exphbs = require('express-handlebars')
const port = 3000
//express template engine 模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//靜態檔案
//所有從路由器進來的請求都先走這一道關卡
app.use(express.static('public'))

app.get('/', (req, res) => {
  //建立電影清單
  // const movieone = {
  //id: 1,
  //title: 'Jurassic World: Fallen Kingdom',
  //image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
  //}
  //設定一個迴圈陣列
  // const numberlist = [1, 2, 3, 4, 5, 6, 7, 8]
  //不須設定content type，express會自動設定
  // 直接回應內容，res.send('this is movie')去模板引擎尋找

  res.render('index', { movie: movieList.results })
})

//代入各別movie簡介
app.get('/movies/:movie_id', (req, res) => {

  const movie = movieList.results.filter(
    movie => movie.id == req.params.movie_id
  )
  //const movieOne = {
  //id: 1,
  // title: 'Jurassic World: Fallen Kingdom',
  // description:
  // 'Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.',
  //release_date: '2018-06-06',
  //image: 'c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
  //}
  res.render('show', { movie: movie[0] })

})
//search bar設立
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
