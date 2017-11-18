#!/usr/bin/perl

# Kanchwala, Husain    Account:  jadrn018
# CS645, Spring 2017
# Project 1

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------

my $q = new CGI;

my $cookie_sid = $q->cookie('jadrn018SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
    send_to_login_error();
}
else{
    send_to_main();
}





###########################################################################

###########################################################################
sub send_to_login_error {
print "Content-type: text/html\n\n";

    print <<END;

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn018/proj1/error.html" />
</head><body></body>
</html>

END
    }  
    
###########################################################################
      
###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn018SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
    my $sid = $session->id;
    print <<END;
   
<html>
 <!--    Kanchwala, Husain    Account:  jadrn018
         CS645, Spring 2015
         Project 1
-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />    
    <title>Inventory Management System</title>
    <link rel="stylesheet" href="/~jadrn018/proj1/CSS/main.css">
    <script src="/jquery/jquery.js"></script>
    <script src="/~jadrn018/proj1/JS/main.js"></script>
</head>
<body>
<ul class="tab">
  <li><a id="Addlink" href="javascript:void(0)" class="tablinks" onclick="tabInventory(event, 'AddI')">Add Inventory</a></li>
  <li><a href="javascript:void(0)" class="tablinks" onclick="tabInventory(event, 'EditI')">Edit Inventory</a></li>
  <li><a href="javascript:void(0)" class="tablinks" onclick="tabInventory(event, 'DeleteI')">Delete Inventory</a></li>
</ul>

<div id="AddI" class="tabcontent">
<a href="/perl/jadrn018/logout.cgi" style="float: right;">Log Out</a>

 <div id="mainAdd">        
        <table>
        <tr>
            <td>SKU:</td>
            <td><input type="text" id="aSKU" class="inp" size="15"></td>
            <td><p type="text" id="ap1"></p></td>
        </tr>
        <tr>
            <td>Category:</td>
            <td><select id="aCategory" class="select"></select></td>
            <td><p type="text" id="ap2"></p></td>
        </tr>
        <tr>
            <td>Vendor:</td>
            <td><select id="aVendor" class="select"></select></td>
            <td><p type="text" id="ap3"></p></td>
        </tr>
        <tr>
            <td>Manufacturer's Identifier:</td>
            <td><input type="text" id="aMI" class="inp" size="15"></td>
            <td><p type="text" id="ap4"></p></td>
        </tr>
        <tr>
            <td>Description:</td>
            <td><textarea type="text" id="aDescription" class="box" size="15"></textarea></td>
            <td><p type="text" id="ap5"></p></td>  
        </tr>
        <tr>
            <td>Features:</td>
            <td><textarea type="text" id="aFeatures" class="box" size="15"></textarea></td>
            <td><p type="text" id="ap6"></p></td>  
        </tr>
        <tr>
            <td>Cost:</td>
            <td><input type="text" id="aCost" class="inp" size="15"></td>
            <td><p type="text" id="ap7"></p></td>  
        </tr>
        <tr>
            <td>Retail:</td>
            <td><input type="text" id="aRetail" class="inp" size="15"></td>
            <td><p type="text" id="ap8"></p></td>  
        </tr>
        <tr>
            <td>Product Image:</td>
            <td><input type="file" id="afilename" name="uploadfile" /></td>
            <td><p type="text" id="ap9"></p></td>  
        </tr>
        <tr>
             <td></td>
             <td><img id="amyImg" src="/~jadrn018/proj1/Images/jjjcasnlscnalkn.png" accept="image/*" STYLE="WIDTH:150px;HEIGHT:150px;" /></td>
        </tr>
         <tr>
             <td><button type="reset" id="aClear" value="Click" class="cbutton" >Clear Form</button></td>
             <td><button type="button" id="aNIR" value="Click" class="_button" >Submit</button></td>
        </tr>
        </table>
     </div>   
     <div id=mainAddAck>
            <button id="_aback" class="_button">Back</button><br><br>
            <h style="color:green;font-weight:bold;">Product has been added successfully</h><br><br>
            SKU  :  <h type="text" id="_aSKU" size="15"></h><br><br>
            Category   :  <h type="text" id="_aCategory" size="15"></h><br><br>
            Vendor   :  <h type="text" id="_aVendor" size="15"></h><br><br>
            Manufacturer's Identifier   :  <h type="text" id="_aMI" size="15"></h><br><br>
            Description   :  <h type="text" id="_aDescription" size="15"></h><br><br>
            Features   :  <h type="text" id="_aFeatures" size="15"></h><br><br>
            Cost   :  <h type="text" id="_aCost" size="15"></h><br><br>
            Retail   :  <h type="text" id="_aRetail" size="15"></h><br><br>
            Product Image   :  <br> <img id="_amyImg" src="/~jadrn018/proj1/Images/abc_22345_tkdksksj.png" accept="image/*" alt="your image" STYLE="position: absolute;LEFT: 9em; WIDTH:150px;HEIGHT:150px;"/><br><br>
     </div>
</div>

<div id="EditI" class="tabcontent">
<a href="/perl/jadrn018/logout.cgi" style="float: right;">Log Out</a>

<div id="Edit">        
        <table>
        <tr>
            <td>SKU:</td>
            <td><input type="text" id="eSKU" class="inp" size="15"></td>
            <td><p type="text" id="ep1"></p></td>
        </tr>
        <tr>
            <td>Category:</td>
            <td><select id="eCategory" class="select"></select></td>
            <td><p type="text" id="ep2"></p></td>
        </tr>
        <tr>
            <td>Vendor:</td>
            <td><select id="eVendor" class="select"></select></td>
            <td><p type="text" id="ep3"></p></td>
        </tr>
        <tr>
            <td>Manufacturer's Identifier:</td>
            <td><input type="text" id="eMI" class="inp" size="15"></td>
            <td><p type="text" id="ep4"></p></td>
        </tr>
        <tr>
            <td>Description:</td>
            <td><textarea type="text" id="eDescription" class="box" size="15"></textarea></td>
            <td><p type="text" id="ep5"></p></td>
        </tr>
        <tr>
            <td>Features:</td>
            <td><textarea type="text" id="eFeatures" class="box" size="15"></textarea></td>
            <td><p type="text" id="ep6"></p></td>  
        </tr>
        <tr>
            <td>Cost:</td>
            <td><input type="text" id="eCost" class="inp" size="15"></td>
            <td><p type="text" id="ep7"></p></td>
        </tr>
        <tr>
            <td>Retail:</td>
            <td><input type="text" id="eRetail" class="inp" size="15"></td>
            <td><p type="text" id="ep8"></p></td>
        </tr>
        <tr>
            <td>Product Image:</td>
            <td><input type="file" id="efilename" accept="image/gif, image/jpeg, image/png"></td>
            <td><p type="text" id="ep9"></p></td> 
        </tr>
        <tr>
            <td></td>
            <td><img id="emyImg" src="/~jadrn018/proj1/Images/jjjcasnlscnalkn.png" accept="image/*" STYLE="WIDTH:150px;HEIGHT:150px;" /></td>
        </tr>
        <tr>
            <td><button type="reset" id="eClear" value="Click" class="cbutton" >Clear Form</td>
            <td><button type="button" id="eNIR" class="_button">Submit</button></td>
        </tr> 
        </table>
     </div>      
     <div id=EditAck>
            <button id="_eback" class="_button">Back</button><br><br>
            <h style="color:green;font-weight:bold;">Product has been Edited successfully</h><br><br>
            SKU  :  <h type="text" id="_eSKU" size="15"></h><br><br>
            Category  :  <h type="text" id="_eCategory" size="15"></h><br><br>
            Vendor  :  <h type="text" id="_eVendor" size="15"></h><br><br>
            Manufacturer's Identifier  :  <h type="text" id="_eMI" size="15"></h><br><br>
            Description  :  <h type="text" id="_eDescription" size="15"></h><br><br>
            Features  :  <h type="text" id="_eFeatures" size="15"></h><br><br>
            Cost  :  <h type="text" id="_eCost" size="15"></h><br><br>
            Retail  :  <h type="text" id="_eRetail" size="15"></h><br><br>
            Product Image  : <br>  <img id="_emyImg" src="/~jadrn018/proj1/Images/abc_22345_tkdksksj.png" accept="image/*" alt="your image" STYLE="position: absolute;LEFT: 9em; WIDTH:150px;HEIGHT:150px;"/><br><br>
     </div>
</div>

<div id="DeleteI" class="tabcontent">
<a href="/perl/jadrn018/logout.cgi" style="float: right;">Log Out</a>
  <div id=Delete>
        <table>
        <tr>
            <td>SKU:</td>
            <td><input type="text" id="dSKU" size="15" class="inp"></td>
            <td><p type="text" id="dresult"  size="15"></p></td>
        </tr>
        <tr>
            <td><button type="button" id="dNIR" class="_button">Search</button></td>
        </tr>
        </table> 
    </div>
    <div id=DeleteAck>
            SKU  :  <h type="text" id="_dSKU" size="15"></h><br>
            Category  :  <h type="text" id="_dCategory" size="15"></h><br>
            Vendor  :  <h type="text" id="_dVendor" size="15"></h><br>
            Manufacturer's Identifier  :  <h type="text" id="_dMI" size="15"></h><br>
            Description  :  <h type="text" id="_dDescription" size="15"></h><br>
            Features  :  <h type="text" id="_dFeatures" size="15"></h><br>
            Cost  :  <h type="text" id="_dCost" size="15"></h><br>
            Retail  :  <h type="text" id="_dRetail" size="15"></h><br>
            Product Image  : <br>  <img id="_dmyImg" src="/~jadrn018/proj1/Images/abc_22345_tkdksksj.png" accept="image/*" alt="your image" STYLE="WIDTH:150px;HEIGHT:150px;"/><br>
            <button id="_cNIR" value="Click" class="cbutton" >Clear</button>
            <button id="_dNIR" value="Click" class="cbutton" >Delete</button>
     </div>
</div>
</body>
</html>

END
}
###########################################################################    