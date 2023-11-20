document.addEventListener('DOMContentLoaded', function () {
    const memeImg = document.getElementById('memeImg');
    const newMemeBtn = document.getElementById('newMemeBtn');
    const shareBtn = document.getElementById('shareBtn');
    let previousMemeId = null;
    const fetchedMemes = [];
    const allSources = [
        'https://www.reddit.com/r/memes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/dankmemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/memeeconomy/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/wholesomememes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/ProgrammerHumor/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/PrequelMemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/TechNope/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/bonehurtingjuice/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/HistoryMemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/Animemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/terriblefacebookmemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/wholesomebpt/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/pcmasterrace/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/ExpectationVsReality/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/oddlysatisfying/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/nottheonion/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/Showerthoughts/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/EarthPorn/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/OutOfTheLoop/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/aww/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/AbandonedPorn/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/explainlikeimfive/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/science/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/todayilearned/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/AskReddit/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/interestingasfuck/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/UpliftingNews/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/space/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/Jokes/top/.json?sort=top&t=day&limit=100',
        // Add more subreddit URLs as needed
        'https://www.reddit.com/r/IndianDankMemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/indiameme/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/bakchodi/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/desimemes/top/.json?sort=top&t=day&limit=100',
        'https://www.reddit.com/r/IndiaSpeaks/top/.json?sort=top&t=day&limit=100',
        // Add more Indian meme page URLs as needed
      // Add more Indian news sources using News API or other services
'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=YOUR_NEWS_API_KEY',
'https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=YOUR_NEWS_API_KEY',
// Add more categories or sources as needed

    ];

    newMemeBtn.addEventListener('click', fetchRandomMeme);
    shareBtn.addEventListener('click', shareMeme);

    function fetchRandomMeme() {
        const apiUrl = allSources[Math.floor(Math.random() * allSources.length)];

        fetch(apiUrl, {
            headers: {
                'Accept': apiUrl.includes('reddit') ? 'application/json' : 'application/json',
                // Add any additional headers required for Reddit or other sources
            }
        })
            .then(response => response.json())
            .then(data => {
                const memes = data.data.children.filter(meme => meme.data.url.endsWith('.jpg') || meme.data.url.endsWith('.png'));
                const randomMeme = getRandomMeme(memes);

                if (randomMeme) {
                    const memeUrl = randomMeme.data.url;
                    const memeId = randomMeme.data.id;

                    if (!fetchedMemes.includes(memeUrl)) {
                        memeImg.src = memeUrl;
                        previousMemeId = memeId;
                        fetchedMemes.push(memeUrl);

                        // Preload the next meme
                        preloadNextMeme(apiUrl);
                    } else {
                        // If the meme was already fetched, try again
                        fetchRandomMeme();
                    }
                } else {
                    console.error('No suitable meme found.');
                }
            })
            .catch(error => console.error('Error fetching meme:', error));
    }

    function getRandomMeme(memes) {
        const randomIndex = Math.floor(Math.random() * memes.length);
        return memes[randomIndex];
    }

    function shareMeme() {
        const memeUrl = memeImg.src;
        if (navigator.share) {
            navigator.share({
                title: 'Check out this meme!',
                text: 'Found this awesome meme using the Random Meme Generator.',
                url: memeUrl,
            })
                .then(() => console.log('Meme shared successfully'))
                .catch(error => console.error('Error sharing meme:', error));
        } else {
            // Fallback for browsers that do not support Web Share API
            alert(`Share this meme: ${memeUrl}`);
        }
    }

    function preloadImage(url) {
        const img = new Image();
        img.src = url;
    }

    function preloadNextMeme(apiUrl) {
        // Preload the next meme from the same source
        preloadImage(apiUrl);
    }

    // Initial load
    fetchRandomMeme();
});
