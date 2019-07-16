$('#datetimepicker').datetimepicker({  
    minDate:new Date(),
    maxDate:new Date(Date.now() + 12096e5)
});


$('#singlebutton').click((event)=> {
    if($('#selectbasic').find(":selected").text()!=""&&$('#noOfPersons').val()!=""&&$('#dateAndTime').datetimepicker().val()!=""){

        if($('#noOfPersons').val()>1){

        event.preventDefault();
        var restaurantName = $('#selectbasic').find(":selected").text();
        var numberOfPersons = $('#noOfPersons').val();
        var dateAndTime = $('#dateAndTime').datetimepicker().val();
        var dataInput = {restaurantName:restaurantName,numberOfPersons:numberOfPersons,dateAndTime:dateAndTime,userid:'1'}
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/reservations/makereservation',
            dataType: 'json',
            data: dataInput
        }).done((response)=>{
            if(response){
                $('#message').html('<div class="alert alert-success alert-dismissible fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Reservation succesful.</div>');
                $('#noOfPersons').val("");
                $('#selectbasic').val("");
                $('#datetime').datetimepicker().val("");
                $('#datetimepicker').datetimepicker({  
                    minDate:new Date(),
                    maxDate:new Date(Date.now() + 12096e5)
                });
            }
            else{
                $('#message').html('<div class="alert alert-danger alert-dismissible fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Sorry!</strong> Reservation Not succesful.</div>');
            }
            $('#message').fadeIn();
				setTimeout(function() {
					$('#message').fadeOut("slow");
                }, 2000 );


        });
    }
    }
});


function cancelFunction(element,id){
        $('#btnModal').click(()=>{
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/reservations/cancelreservation/'+id
        }).done((response)=>{
            if(response){
                $(element).hide();
                $('#'+id+'status').text('Cancelled');
            }
        });
    });
};


