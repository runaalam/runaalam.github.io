/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

// Fetch Blog Post
document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.querySelector('.blog-scroll-container');
    const mediumRssFeed = 'https://medium.com/feed/@runaalam';

    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumRssFeed)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                data.items.forEach(post => {
                    const blogCard = document.createElement('div');
                    blogCard.className = 'blog-card';

                    // Function to extract image from content
                    const getImageFromContent = (content) => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(content, 'text/html');
                        const img = doc.querySelector('img');
                        return img ? img.src : null;
                    };

                    // Try to get image from thumbnail, content, or use default
                    const imageUrl = post.thumbnail || getImageFromContent(post.content) || 'me.jpg';

                    blogCard.innerHTML = `
                        <img src="${imageUrl}" class="blog-card-img" alt="${post.title}" onerror="this.src='me.jpg';">
                        <div class="blog-card-body">
                            <h5 class="blog-card-title">${post.title}</h5>
                        </div>
                    `;
                    
                    blogCard.addEventListener('click', () => {
                        window.open(post.link, '_blank');
                    });
                    
                    blogContainer.appendChild(blogCard);
                });
            } else {
                console.error('Error fetching posts:', data.message);
            }
        })
        .catch(error => console.error('Error fetching Medium posts:', error));
});