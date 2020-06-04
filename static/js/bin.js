
  function deleteRequest(id) {
        $.ajax({'url': '/api/v1/deleteRequest', 'type': 'POST',
            'data': {'id': id},
            'success': function(data) {
                if (data['status']==true){
                    alert("Request Deleted");
                    document.getElementById(id).remove();
                }
                else{
                    alert("Failed to Delete");
                }
            }
        });
  }
