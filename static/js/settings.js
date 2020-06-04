/**
 * Created by janit on 11/3/17.
 */

$(document).ready(function() {
    debugger;
    $('.navbar').remove();
    $('.navbar-default').remove();
    $('.footer').remove();
});

function openSetting(evt, settingName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(settingName).style.display = "block";
    evt.currentTarget.className += " active";
}

// validate xmll request and schema
function xmlValidator(){
    xml_request = document.getElementById("validatexmlrequest").value;
    xml_schema = document.getElementById("validatexmlschema").value;

    $.ajax({'url': '/api/v1/xmlValidation', 'type': 'POST',
        'data': {'xml_request':xml_request,
                 'xml_schema':xml_schema},
        'success': function(data) {
            document.getElementById("xmlResult").value=data['status'];
        }
    });
}

// validate xmll request and schema
function jsonValidator(){
    debugger;
    json_request = document.getElementById("validatejsonrequest").value;
    json_schema = document.getElementById("validatejsonschema").value;

    $.ajax({'url': '/api/v1/jsonValidation', 'type': 'POST',
        'data': {'json_request':json_request,
                 'json_schema':json_schema},
        'success': function(data) {
            document.getElementById("jsonResult").value=data['status'];
        }
    });
}

// remove comment
function saveCallbackSchema(isUpdate){
        if (isUpdate==true){
            call_id = document.getElementById("showid").value;
            call_name = document.getElementById("showcallname").value;
            call_type = document.getElementById("showcalltype").value;
            schema_file = document.getElementById("showschemafile").value;
        } else{
            call_id = null;
            call_name = document.getElementById("callname").value;
            call_type = document.getElementById("calltype").value;
            schema_file = document.getElementById("schemafile").value;
        }
        $.ajax({'url': '/api/v1/addSchema', 'type': 'POST',
            'data': {'call_id':call_id,
                     'call_name':call_name,
                     'call_type':call_type,
                     'schema_file':schema_file},
            'success': function(data) {
                if (data['status']==true){
                    alert("Schema Updated");
                    // location.reload();
                }
                else{
                    alert("Failed to Update");
                    // location.reload();
                }
            }
        });
        location.reload();
}

  function getSchema(selected){
        debugger;
        schemaId=selected.value;
        if(!schemaId){
            document.getElementById("showid").value ="";
            document.getElementById("showcallname").value ="";
            document.getElementById("showcalltype").value ="json";
            document.getElementById("showschemafile").value ="";
        }else{
            $.ajax({'url': '/api/v1/getSchema', 'type': 'POST',
            'data': {'schema_id':schemaId},
            'success': function(data) {
            debugger;
                if (data['id']){
                    debugger;
                    document.getElementById("showid").value =data['id'];
                    document.getElementById("showcallname").value =data['name'];
                    document.getElementById("showcalltype").value =data['type'];
                    document.getElementById("showschemafile").value =data['schema_body'];

                    // alert("Schema Updated");
                    // location.reload();
                }
                else{
                    alert("Failure Loading");
                    location.reload();
                }
            }
            });
        }

  }