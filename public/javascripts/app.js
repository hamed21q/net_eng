$(document).ready(function() {
    // Use the .ajax() method to send a GET request
    $.ajax({
        url: 'http://192.168.189.91:4545/products?offset=0&limit=3',
        method: 'GET',
        dataType: 'json', // Assuming the response is in JSON format
        success: function(data) {
            let cont = $("#articles")
            let x = ""
            $.each(data, function(index, item) {
                var articleHTML = `
                <div class="article">
                <div class="article__image">
                    <img src="assets/blog-post.jpeg" alt="Post"/>
                </div>
                <div class="article__content">
                    <div class="article__header">
                        <div class="article__title">
                            ${item.title}
                        </div>
                        <div class="article__date">
                            ${item.price} تومان 
                        </div>
                    </div>
                    <div class="article__description">
                        ${item.description}
                    </div>
                    <div class="article__footer">
                        <a href="#" class="article__show-post">ادامه مطلب</a>
                    </div>
                </div>                      
                `;
                x += articleHTML;
            });
            cont.append(x)
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
});
