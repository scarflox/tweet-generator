document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const titleInput = document.getElementById('title-input');
    const tweetsContainer = document.getElementById('tweets-container');

    async function fetchTweets(title) {
        // Fetch tweets from the backend
        const response = await fetch(`/api/tweets?title=${encodeURIComponent(title)}`);
        const tweets = await response.json();
        return tweets;
    }

    function displayTweets(tweets) {
        tweetsContainer.innerHTML = '';
        tweets.forEach(tweet => {
            const tweetElement = document.createElement('div');
            tweetElement.className = 'tweet fade-in';
            tweetElement.innerHTML = `<p>${tweet.content}</p>`;
            tweetsContainer.appendChild(tweetElement);
            
            // Trigger fade-in animation
            setTimeout(() => tweetElement.classList.add('show'), 100);
        });
    }

    async function updateTweets() {
        const title = titleInput.value.trim();
        if (title) {
            const tweets = await fetchTweets(title);
            displayTweets(tweets);
        }
    }

    searchButton.addEventListener('click', updateTweets);

    // Update tweets every minute
    setInterval(updateTweets, 60000);
});
