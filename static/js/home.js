   function inspectUrl(url) {
//    var url = document.querySelector('[name="url"]:checked');
//    if (url){
////    window.location.href = "/"+url.value+"?inspect";
    var url_open= "/"+url+"?inspect";
    var win = window.open(url_open, '_blank');
    win.focus();
//    }
//    else{
//    alert("Please select the URL to Inspect");
//    return;
//    }
  }

  function makeRadioButton(name, value, text) {

    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "url";
    radio.value = value;
    label.id = value;
    label.appendChild(radio);
    label.appendChild(document.createTextNode('http://localhost:5000/'+text));
    label.class ="url-label";
    return label;
  }

  function createUrl() {
        var description=prompt("Please enter callback name","Callback Demo1");
        if (description)
        {
            $.ajax({'url': '/api/v1/bins', 'type': 'POST',
            'data':{'description':description},
            'success': function(data) {
            alert("Url Created");
            location.reload();
//            var radio_home = document.getElementById("radio_home");
//            var bin_button = makeRadioButton(data['name'], data['name'], data['name']);
//            radio_home.appendChild(bin_button);
//            radio_home.appendChild(document.createElement("br"));
            }
            });
        }
  }

  function deleteUrl(name) {
            alert('hi');
//        var url = document.querySelector('[name="url"]:checked');
//        if (url){
            $.ajax({'url': '/api/v1/delete', 'type': 'POST',
                'data': {'name': name},
                'success': function(data) {
                    if (data['status']==true){
                        alert("Url Deleted");
//                        var selectedUrl = $('[name="url"]:checked').val();
//                        document.getElementById(selectedUrl).remove();
                        var row = document.getElementById(name);
                        row.parentNode.removeChild(row);
                    }
                    else{
                        alert("Failed to Delete");
                    }
                }
            });
  }

  function requestCleaner() {

    $.ajax({'url': '/api/v1/requestCleaner', 'type': 'POST',
    'success': function(data) {
         if (data['status']==true){
             alert("Cleaned Request older than 30 Days.");
         } else {
             alert("Sorry! Please Try Again Later.");
         }
    }
    });
  }

  function saveAuthInfo(name){
        enable_auth = document.getElementById("enable_"+name).checked;
        auth_username = document.getElementById("username_"+name).value;
        auth_password = document.getElementById("password_"+name).value;
            $.ajax({'url': '/api/v1/save', 'type': 'POST',
                'data': {'name': name,
                         'enable_auth':enable_auth,
                         'auth_username':auth_username,
                         'auth_password':auth_password},
                'success': function(data) {
                    if (data['status']==true){
                        alert("Auth Info Updated");
                        location.reload();
                    }
                    else{
                        alert("Failed to Update");
                        location.reload();
                    }
                }
            });
  }
