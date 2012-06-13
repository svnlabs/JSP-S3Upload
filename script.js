// JavaScript Document

function ensureScriptsLoaded() {
  try {
    var signature = b64_hmac_sha1("Amazon S3", "POST Sample");
  } catch (e) {
    alert( "Please check the source and make sure you are importing the SHA1 Javascript library." );
    return false;
  }
  try {
    Base64.encode("Amazon S3");
  } catch ( e ) {
    alert( "Please check the source and make sure you are importing the Base64 Javascript library." );
    return false;
  }
  return true;
}

function addField(name, value) {
  var table = document.getElementById('table');
  var html = "<td>" + name + "</td>"+
             "<td><input type='text' name='"+name+"' value='" + value + "'></td>";
  var tr = document.createElement("tr");
  tr.setAttribute("id", "field-"+name);
  var tdName = document.createElement("td");
  tdName.setAttribute("align", "right");
  var labelName = name
  if ( name == 'policy' || name == 'AWSAccessKeyId' || name == 'signature' ) {
     labelName += ' (usually hidden)';
  }
  tdName.innerHTML = labelName + ":";
  tr.appendChild(tdName);
  var tdValue = document.createElement("td");
  var input = document.createElement("input");
  input.setAttribute("id","id"+name);
  input.setAttribute("type","text");
  input.setAttribute("name",name);
  input.setAttribute("value",value);
  tdValue.appendChild(input);
  var rm = document.createElement("a");
  rm.innerHTML="remove";
  rm.setAttribute("href","javascript:removeField(\""+labelName+"\")");
  tdValue.appendChild(rm);
  tr.appendChild(tdValue);
  table.appendChild(tr);
}

function addFieldButton() {
  var name = document.getElementById("x-newfield").value;
  var value = document.getElementById("x-newvalue").value;
  addField(name, value);
}

function removeField(name) {
  name += ":";
  var table = document.getElementById('table');
  var tr = table.firstChild;
  while (tr) {
    if (tr.nodeType == 1) {
      if (name == tr.firstChild.innerHTML)
      {
        table.removeChild(tr);
        return;
      }
    }
    tr = tr.nextSibling;
  }  
}

function addPolicy() {
  if ( ! ensureScriptsLoaded() ) return;

  removeField( "AWSAccessKeyId (usually hidden)" );
  var awsid = document.getElementById("awsid").value;
  var awskey = document.getElementById("awskey").value;
  addField("AWSAccessKeyId", awsid);

  removeField( "policy (usually hidden)" );
  var policyText = document.getElementById("policy").value;
  var policyBase64 = Base64.encode(policyText);
  addField("policy", policyBase64);

  removeField( "signature (usually hidden)" );
  var signature = b64_hmac_sha1(awskey, policyBase64);
  addField("signature", signature);
}

function setUrl() {
  var newurl = document.getElementById("base-url").value;
  var form = document.getElementById("postform");
  form.action = newurl;
}

function getExtension(fileFieldId) {
  var fileField = document.getElementById(fileFieldId).value;
  if (fileField.indexOf('\\') > -1) {
    fileField = fileField.substring(fileField.lastIndexOf('\\') + 1, fileField.length);
  }
  if (fileField.indexOf('/') > -1) {
    fileField = fileField.substring(fileField.lastIndexOf('/') + 1, fileField.length);
  }

  var extension;
  if (fileField.indexOf('.') > -1) {
    extension = fileField.substring(fileField.lastIndexOf('.') + 1, fileField.length);
  } else {
    extension = "";
  }
  return extension;
}

function populateContentType(fileFieldId) {
   var extension = getExtension(fileFieldId);
   var contentType = "application/octet-stream";
   if ( extension == "txt" ) {
     contentType= "text/plain";
   } else if ( extension == "htm" || extension == "html" ) {
     contentType= "text/html";
   } else if ( extension == "jpg" || extension == "jpeg" ) {
     contentType = "image/jpeg";
   } else if ( extension == "gif" ) {
     contentType = "image/gif";
   } else if ( extension == "png" ) {
     contentType = "image/png";
   }

   var textfield = document.getElementById("idcontent-type");
   if ( textfield ) {
     textfield.value = contentType;
   }
}



