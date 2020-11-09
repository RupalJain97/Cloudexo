$('.dropdown').on('show.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
});

$('.dropdown').on('hide.bs.dropdown', function(e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});

$('#uploadBar').on('change', function() {
    //get the file name
    var fileName = $(this).val();
    console.log(fileName);
    //replace the "Choose a file" label
    $(this).next('.custom-file-label').html(fileName);
})

$('.nav-item a').addClass("active");