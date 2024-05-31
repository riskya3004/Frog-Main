const myCarouselElement = document.querySelector('#carouselExample')

const Carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: false
});



if(window.matchMedia("(min-width:576px)").matches){
    var carousel = $('.carousel-inner')[0].scrollWidth;
    var cardWidth = $('.carousel-item2').width()*1;
    var bannerWidth = $('.banner-item').width();
    var bannerCount = $('.banner-item').length;
    var counter = 0;
    var scrollPosition = 0;
    var bannerPosition = 0;

    // $('.carousel-control-next').on('click', function(){
    $('.popular-next').on('click', function(){
        if(scrollPosition < (carousel-(cardWidth*5))){
            console.log('next');
            scrollPosition = scrollPosition + cardWidth;
            $('.carousel-inner').animate({scrollLeft: scrollPosition}, 500);
        }

    });

    // $('.carousel-control-prev').on('click', function(){
    $('.popular-prev').on('click', function(){
        if(scrollPosition > 0){
            console.log('prev');
            scrollPosition = scrollPosition - cardWidth;
            $('.carousel-inner').animate({scrollLeft: scrollPosition}, 500);
        }
    });

//bingung

var interval = setInterval(function() {
    if(counter<bannerCount-1){
        bannerPosition = bannerPosition + bannerWidth;
        counter++;
        $('.banner-inner').animate({scrollLeft: bannerPosition}, 750);

        if(counter==bannerCount-1){
            $('.banner-inner').animate({scrollLeft: (-1)*bannerPosition}, 0);
            bannerPosition = 0;
            counter = 0;
        }
    }
 }, 5000);


}else{
    $(myCarouselElement).addClass('slide');
}



// jquery untuk searching
$(document).ready(function(){
    var timer;
    // ketika see more diclick
    $(document).on('click', '#myBtn1', function(){
        //input dari kolom search
        var searchValue = $('#search-event').val();
        //input dari cat sekarang
        var categoryValue = $('.bubble-box.purple-but').attr('value');
        //input berapa batch see more yg harus keload di kondisi sekarang
        var lim = $('#myBtn1').val();
        $(this).fadeOut(100);

        //Masukin ke function penggabung
        loadFilteredContent(searchValue, categoryValue, lim);
    });

    //ketika kolom search diisi
    $('#search-event').on('keyup', function(){
        clearTimeout(timer);
        var ms = 200; // milliseconds
        var val = this.value;
        timer = setTimeout(function() {
            lookup(val);
        }, ms);
        //input dari kolom search
        var searchValue = $('#search-event').val();
        //input dari cat sekarang
        var categoryValue = $('.bubble-box.purple-but').attr('value');
        //input berapa batch see more yg harus keload
        var lim = 1;

        //Masukin ke function penggabung
        loadFilteredContent(searchValue, categoryValue, lim);
    });

    //ketika category diklik
    $('.bubble-box').on('click', function(){

        //pindahin warna purple
        $('.bubble-box').removeClass('purple-but');
        $(this).addClass('purple-but');

        //input dari kolom search
        var searchValue = $('#search-event').val();
        //input dari cat sekarang
        var categoryValue = $(this).attr('value');
        //input berapa batch see more yg harus keload
        var lim = 1;
        loadFilteredContent(searchValue, categoryValue, lim);
    });

    function loadFilteredContent(searchValue, categoryValue, lim) {
        var url = '/events/result';
        var parameters = [];

        //periksa apakah lim, searchValue, dan categoryValue dimasukin di fungsi di atas
        //Kalo iya, tambah di get ?search-event=banjir
        if(lim){
            parameters.push('pg=' + encodeURIComponent(lim));
        }
        if (searchValue) {
            parameters.push('search-event=' + encodeURIComponent(searchValue));
        }
        if (categoryValue && categoryValue !== 'All') {
            parameters.push('category-event=' + encodeURIComponent(categoryValue));
        }

        if (parameters.length > 0) {
            url += '?' + parameters.join('&');
        }
        // console.log(url);
        //load secara live, tapi yang diload satu container aja, yaitu result container
        //jadi hasil livesearch itu intinya harus ada dalam 1 container, bukan semua page nya yang berubah
        //cari di eventsResult.blade.php
        $('#result-container1').load(url);
        // $('#h1').load(url);
    }

});

// page number for carousel banner
var totalItems = $('.item').length;
var currentIndex = $('div.item.active').index() + 1;

var down_index = 1;
$('.num').html(''+currentIndex+''+'/'+''+totalItems+'');

    $(".next").click(function(){
        currentIndex_active = $('div.item.active').index() + 2
    if (totalItems >= currentIndex_active)
    {
        down_index= $('div.item.active').index() + 2;
        $('.num').html(''+currentIndex_active+''+'/'+''+totalItems+'');
    } else if (currentIndex_active > totalItems){
        currentIndex_active = $('div.item.active').index() - 2;
        down_index= $('div.item.active').index() - 2;
        $('.num').html(''+currentIndex_active+''+'/'+''+totalItems+'');
    }
});

    $(".prev").click(function(){
    if (down_index > 1 )
    {
        down_index=down_index-1;
        $('.num').html(''+down_index+''+'/'+''+totalItems+'');
    } else if (down_index <= 1)
    {
        down_index=totalItems;
        $('.num').html(''+down_index+''+'/'+''+totalItems+'')
    }
});


$("#carouselExampleFade").on('slide.bs.carousel',function(e){
    var data_slide = $('.carousel-fade .active').data('id') + 1;
    if(data_slide < 5){
        $('.num').html(''+data_slide+''+'/'+''+totalItems+'');
    } else{
        $('.num').html(''+(data_slide-4)+''+'/'+''+totalItems+'');
    }
    // alert(data_slide)
})
