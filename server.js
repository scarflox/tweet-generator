const express = require('express');
const axios = require('axios');
const TwitterApi = require('twitter-api-v2').TwitterApi;

const app = express();
const port = 3000;

const twitterClient = new TwitterApi('YOUR_TWITTER_BEARER_TOKEN');

app.use(express.static('public'));

app.get('/api/tweets', async (req, res) => {
    const title = req.query.title;
    // Fetch tweets based on the title and date
    try {
        const tweets = await twitterClient.v2.search(`#${title} -is:retweet`, {
            'tweet.fields': 'created_at',
            start_time: new Date(new Date() - 30*24*60*60*1000).toISOString()  // Tweets from the past month
        });
        res.json(tweets.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching tweets' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
