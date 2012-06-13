<%@ include file="config.jsp" %>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<title>S3 Upload - JSP Demo</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="sha1.js"></script>
<script src="webtoolkit.base64.js"></script>
<script src="script.js"></script>

<script>

function uploadS3()
{
var awsid = '<%=awsAccessKey %>';
var awskey = '<%=awsSecretKey %>';

var fileField = document.getElementById("file").value;

var policyText = '{"expiration": "2015-01-01T12:00:00.000Z","conditions": [{"bucket": "<%=bucket %>" },{"acl": "<%=acl %>" },["eq", "$key", "'+fileField+'"],["starts-with", "$Content-Type", "text/"],]}'; 

var policyBase64 = Base64.encode(policyText);

var signature = b64_hmac_sha1(awskey, policyBase64);

document.getElementById("policy").value = policyBase64;
document.getElementById("signature").value = signature;
document.getElementById("key").value = fileField;

//document.getElementById("postform").submit();

document.getElementById("result").innerHTML = '<a href="http://s3.amazonaws.com/<%=bucket %>/'+fileField+'">http://s3.amazonaws.com/<%=bucket %>/'+fileField+'</a>'; 

}

</script>


</head><body>

<strong>Uploading to Amazon S3</strong>
  
<div class="main">

<p>


<form id="postform" action="http://s3.amazonaws.com/<%=bucket %>" method="post" onsubmit="return uploadS3();" enctype="multipart/form-data">
<input type="hidden" name="key" id="key" value="" />
<input type="hidden" name="acl" id="acl" value="<%=acl %>" />
<input type="hidden" name="content-type" id="content-type" value="text/plain" />
<input type="hidden" name="AWSAccessKeyId" id="AWSAccessKeyId" value="<%=awsAccessKey %>" />
<input type="hidden" name="policy" id="policy" value="" />
<input type="hidden" name="signature" id="signature" value="" />
<input name="file" id="file" type="file" />
<input name="submit" value="Upload" type="submit" />
</form>

<div id="result"></div>

</p>
</div>

</body></html>