$(document).ready(function(){

    // make code pretty
    window.prettyPrint && prettyPrint()
    
    //$(".alert-message").alert();
    //$('.dropdown-toggle').dropdown()
    
    
    $('.back').click(function(){
        parent.history.back();
        return false;
    });
    
    
    // Unhide date select
    $('.jsEnable').attr('style', 'display:block;');
    $('.nojsEnable').attr('style', 'display:none;');
    


    //Load help modal on time
    $("#help-btn").click(function(){
         $('#helpModal').modal('toggle');
    });
    
    $('.tooltiphover').hover(function(){
        $(this).tooltip('toggle');
    });
    
    //Load hints
    $('.hint').popover({
        placement: 'right',
        trigger: 'focus',
        title: 'Hint'
    });
    
    $('.hintleft').popover({
        placement: 'left',
        trigger: 'focus',
        title: 'Hint'
    });
});


function closeModal(modalId){
    $('#' + modalId).modal('toggle');
}

function loadInfoModal(title, body, footer){
    
    $('#infoModal #infoModalTitle').html(title);
    $('#infoModal #infoModalBody').html(body);
    $('#infoModal #infoModalFooter').html(footer);
    $('#infoModal').modal('toggle');
}

function loadErrorModal(title, body, footer){
    
    $('#errorModal #errorModalTitle').html(title);
    $('#errorModal #errorModalBody').html(body);
    $('#errorModal #errorModalFooter').html(footer);
    $('#errorModal').modal('toggle');
}