/**
 * Created by harsh on 4/12/2017.
 */

$(document).on('click', '#signinSubmit, #signupSubmit', function() {
    $('#login').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
});

// jQuery to handle yes/no activity Start
$(document).on('click', ".optionRadioLabel", function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().parent().find("label").each(function(){
        $(this).removeClass('btn-primary').addClass('btn-default');
        $(this).find('input').each(function(){
            $(this).prop('checked', false);
        });
    });
    $(this).removeClass('btn-default').addClass('btn-primary');
    $(this).find('input').each(function(){
        $(this).prop('checked', true);
    });
});
// jQuery to handle yes/no activity End

$(document).on('click', '.smpleTmpltOptn', function(e){
    removeAllActiveTemplate();
    $(this).parent().addClass('active');
    $('.myEventsContainer, .allEventsContainer').hide();
    $('.'+$(this)[0].id).show();
    e.preventDefault(); // cancel the link itself
});

$(document).on('click', '.smpleWindowToggle', function(e){

    if($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");
    }else {
        $(this).parent().addClass("active")
    }
    e.preventDefault(); // cancel the link itself
});


function removeAllActiveTemplate(){
    $('.actTemplate').find('li').each(function(){
        $(this).removeClass("active");
    });
}