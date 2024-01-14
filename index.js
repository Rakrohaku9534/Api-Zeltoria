var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 7002 || 5000 || 3000
const username = "rakrohaku";
const password = "Cj7Q5Bd202WvwJfr";
const cluster = "cluster0.9h7ssxa";
var mongoose = require('mongoose')
var main = require('./routes/main'),
    api = require('./routes/api')

var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("assets"))

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
  }
);
const visitorSchema = new mongoose.Schema({
	name: String,
	count: Number
})
const Visitor = mongoose.model("Visitor",visitorSchema)
app.get('/count', async function(req,res){
	let visitors = await Visitor.findOne({name: 'Fallxz-Rest-APIs'})
	if(visitors == null) {
		const beginCount = new Visitor({
			name : 'Fallxz-Rest-APIs',
			count : 1
		})
		beginCount.save()
		res.json({
			value: '1'
			})
	} else {
		visitors.count += 1;
		visitors.save()
		res.json({
			value: visitors.count
			})
	}
})

app.use('/', main)
app.use('/api', api)

app.listen(PORT, () => {
    console.log("Server running on " + PORT)
})

module.exports = app
