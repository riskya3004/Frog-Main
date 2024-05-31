// moreBtn = document.getElementById("myBtn");
// moreProducts = document.getElementById("more");

// moreBtn.addEventListener('click', function(){
//     moreProducts.style.display = "inline";
// })

$(document).ready(function(){
    var timer;
    // ketika see more diclick
    $(document).on('click', '#myBtn1', function(){
        //input berapa batch see more yg harus keload di kondisi sekarang
        var lim = $('#myBtn1').val();
        var searchValue = $('#searchBox').val();
        $(this).fadeOut(100);
        var categoryValue = $('.categoriesCart.purple-but').attr('value');
        // var categoryValue = $('.categoriesCart').val();
        // console.log("ini");
        // console.log(categoryValue);
        //Masukin ke function penggabung
        loadFilteredContent(lim, categoryValue, searchValue);
    });

    $('#searchBox').on('keyup', function(){
        clearTimeout(timer);
        var ms = 200; // milliseconds
        var val = this.value;
        timer = setTimeout(function() {
        lookup(val);
        }, ms);

        //input dari kolom search
        var searchValue = $('#searchBox').val();
        //input dari cat sekarang
        var categoryValue = $('.categoriesCart.purple-but').attr('value');
        //input berapa batch see more yg harus keload
        var lim = 1;

        //Masukin ke function penggabung
        loadFilteredContent(lim, categoryValue, searchValue);
    });

    // ketika category diklik
    $('.categoriesCart').on('click', function(){
        $('.categoriesCart').removeClass('purple-but');
        $(this).addClass('purple-but');

        var categoryValue = $(this).attr('value');
        var searchValue = $('#searchBox').val();
        var lim = 1;
        loadFilteredContent(lim, categoryValue, searchValue);
    });

    function loadFilteredContent(lim, categoryValue, searchValue) {
        var url = '/products/result';
        var parameters = [];

        console.log("halo");
        console.log(categoryValue);

        //periksa apakah lim, searchValue, dan categoryValue dimasukin di fungsi di atas
        //Kalo iya, tambah di get ?search-event=banjir
        if(lim){
            parameters.push('pg=' + encodeURIComponent(lim));
        }

        // console.log(categoryValue);
        if (categoryValue && categoryValue != '0') {
            parameters.push('cat-id=' + encodeURIComponent(categoryValue));
            // parameters.push('cat-id=' + categoryValue);
        }

        if (searchValue) {
            parameters.push('search-box=' + encodeURIComponent(searchValue));
        }

        if (parameters.length > 0) {
            url += '?' + parameters.join('&');
        }

        // console.log(url);
        //load secara live, tapi yang diload satu container aja, yaitu result container
        //jadi hasil livesearch itu intinya harus ada dalam 1 container, bukan semua page nya yang berubah
        //cari di eventsResult.blade.php
        console.log(url)
        $('#result-container').load(url);
    }

});
