const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-741652384465-741655655761-UMAWdNco9ZD5afqRPT7tXMFZ',
    name: 'jokebot'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    };
    bot.postMessageToChannel('general','Laugh out loud with @jokebot!',params);
});

//error handler
bot.on('error',(err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if(data.type !== 'message'){
        return;
    }
    handleMessage(data.text);
});

function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    }
}

//tell a chuck norris joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res => {
        const joke = res.data.value.joke;
        const params = {
            icon_emoji: ':laughing:'
        };
        bot.postMessageToChannel('general',
        `Chuck Norris: ${joke}`,
        params);
    })
}