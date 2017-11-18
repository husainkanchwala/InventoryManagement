 // Kanchwala, Husain    Account:  jadrn018
 // CS645, Spring 2017
 // Project 1

 var addFlag="false";
 var EditFlag="false";
 var editoldfile="";
 var Editraise="true";

 var skure = new RegExp('^[A-Z]{3}-[0-9]{3}');
 var imgre = /^[a-zA-Z0-9_.-]*$/;
 var numre = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;


 function validateAdd(){
    var str=$("#aSKU").val();        
    var validated="true";
    var v = document.getElementById("aVendor");
    var c = document.getElementById("aCategory");
    $("#ap1").html("");
    $("#ap2").html("");
    $("#ap3").html("");
    $("#ap4").html("");
    $("#ap5").html("");
    $("#ap6").html("");
    $("#ap7").html("");
    $("#ap8").html("");
    $("#ap9").html("");

    $("#aSKU").attr('class', 'inp');
    $("#aCategory").attr('class', 'select');
    $("#aVendor").attr('class', 'select');
    $("#aMI").attr('class', 'inp');
    $("#aDescription").attr('class', 'box');
    $("#aFeatures").attr('class', 'box');
    $("#aCost").attr('class', 'inp');
    $("#aRetail").attr('class', 'inp');

    if($("#afilename").val()==""){
        validated="false";
        $("#ap9").html("Image is mandatory ");      
    }else if(!getfilename($("#afilename").val()).match(/(?:gif|jpg|png|bmp|jpeg)$/) ){
        validated="false";
        $("#ap9").html("File should be of image type ");      
    }else if(getfilename($("#afilename").val()).length>40){
        validated="false";
        $("#ap9").html("Image name length should be less than 40 characters ");      
    }else if( !imgre.test(getfilename($("#afilename").val())) ){
        validated="false";
        $("#ap9").html("Image name acceptable characters are a-zA-Z0-9_.- ");      
    }

    if(!numre.test($("#aRetail").val())){
        $("#aRetail").focus(); 
        validated="false";
        $("#aRetail").attr('class', 'inpe');
        $("#ap8").html("Retail price must be numeric and it's mandatory");      
    }

    if(!numre.test($("#aCost").val())){
        $("#aCost").focus(); 
        validated="false";
        $("#aCost").attr('class', 'inpe');
        $("#ap7").html("Cost must be numeric and it's mandatory ");      
    }


    if($("#aFeatures").val()==""){
        $("#aFeatures").focus(); 
        validated="false";
        $("#aFeatures").attr('class', 'boxe');
        $("#ap6").html("Features is mandatory ");      
    }
    else if($("#aFeatures").val().length>500){
        $("#aFeatures").focus(); 
        validated="false";
        $("#aFeatures").attr('class', 'boxe');
        $("#ap6").html("Features must be of less than 500 characters ");      
    }

    if($("#aDescription").val()==""){
        $("#aDescription").focus(); 
        validated="false";
        $("#aDescription").attr('class', 'boxe');
        $("#ap5").html("Description is mandatory ");      
    }
    else if($("#aDescription").val().length>1000){
        $("#aDescription").focus(); 
        validated="false";
        $("#aDescription").attr('class', 'boxe');
        $("#ap5").html("Description must be of less than 1000 characters ");      
    }

    if($("#aMI").val()==""){
        $("#aMI").focus(); 
        validated="false";
        $("#aMI").attr('class', 'inpe');
        $("#ap4").html("MI is mandatory field ");      
    }else{
        if($("#aMI").val().length>50){
           $("#aMI").focus(); 
           validated="false";
           $("#aMI").attr('class', 'inpe');
           $("#ap4").html("MI must be of length less than 50 characters ");      
       }
   }

   if(v.options[v.selectedIndex]===undefined){
    $("#aVendor").focus(); 
    validated="false";
    $("#aVendor").attr('class', 'selecte');
    $("#ap3").html("Vendor field is mandatory ");      
}

if(c.options[c.selectedIndex]===undefined){
    $("#aCategory").focus(); 
    validated="false";
    $("#aCategory").attr('class', 'selecte');
    $("#ap2").html("Category field is mandatory ");      
}

if(skure.test(str) && str[3]=="-" && str.length==7){
   if(search_inventory()){
    validated="false";
}
}else{
    $("#aSKU").focus(); 
    validated="false";
    $("#aSKU").attr('class', 'inpe');
    $("#ap1").html("SKU id must be 7 character long in following pattern ABC-123");      
}


if(validated=="false"){
    return false;
}else{
    return true;
}
}

function validateEdit(){
    var str=$("#eSKU").val();        
    var validated="true";
    var v = document.getElementById("eVendor");
    var c = document.getElementById("eCategory");

    $("#ep1").html("");
    $("#ep2").html("");
    $("#ep3").html("");
    $("#ep4").html("");
    $("#ep5").html("");
    $("#ep6").html("");
    $("#ep7").html("");
    $("#ep8").html("");
    $("#ep9").html("");

    $("#eresult").html("");
    $("#eSKU").attr('class', 'inp');
    $("#eCategory").attr('class', 'select');
    $("#eVendor").attr('class', 'select');
    $("#eMI").attr('class', 'inp');
    $("#eDescription").attr('class', 'box');
    $("#eFeatures").attr('class', 'box');
    $("#eCost").attr('class', 'inp');
    $("#eRetail").attr('class', 'inp');
    

    if(EditFlag=="true"){
        if($("#efilename").val()==""){
            validated="false";
            $("#ep9").html("Image is mandatory <br/>");      
        }else if(!getfilename($("#efilename").val()).match(/(?:gif|jpg|png|bmp)$/) ){
            validated="false";
            $("#ep9").html("File should be of image type ");      
        }else if(getfilename($("#efilename").val()).length>40){
            validated="false";
            $("#ep9").html("Image name length should be less than 40 characters ");      
        }else if( !imgre.test(getfilename($("#efilename").val())) ){
            validated="false";
            $("#ep9").html("Image name acceptable characters are a-zA-Z0-9_.- ");      
        }
    }

    if(!numre.test($("#eRetail").val())){
      $("#eRetail").focus(); 
      validated="false";
      $("#eRetail").attr('class', 'inpe');
      $("#ep8").html("Retail price must be numeric and it's mandatory");      
  }


  if(!numre.test($("#eCost").val())){
      $("#eCost").focus(); 
      validated="false";
      $("#eCost").attr('class', 'inpe');
      $("#ep7").html("Cost must be numeric and it's mandatory ");      
  }

  if($("#eFeatures").val()==""){
      $("#eFeatures").focus(); 
      validated="false";
      $("#eFeatures").attr('class', 'boxe');
      $("#ep6").html("Features is mandatory ");      
  }
  else if($("#eFeatures").val().length>500){
      $("#eFeatures").focus(); 
      validated="false";
      $("#eFeatures").attr('class', 'boxe');
      $("#ep6").html("Features must be of less than 500 characters ");      
  }

  if($("#eDescription").val()==""){
      $("#eDescription").focus(); 
      validated="false";
      $("#eDescription").attr('class', 'boxe');
      $("#ep5").html("Description is mandatory ");      
  }
  else if($("#eDescription").val().length>1000){
      $("#eDescription").focus(); 
      validated="false";
      $("#eDescription").attr('class', 'boxe');
      $("#ep5").html("Description must be of less than 1000 characters ");      
  }


  if($("#eMI").val()==""){
      $("#eMI").focus(); 
      validated="false";
      $("#eMI").attr('class', 'inpe');
      $("#ep4").html("MI is mandatory field ");      
  }else{
    if($("#eMI").val().length>50){
      $("#eMI").focus(); 
      validated="false";
      $("eMI").attr('class', 'inpe');
      $("#ep4").html("MI must be of length less than 50 characters ");      
  }
}


if(v.options[v.selectedIndex]===undefined){
  $("#eVendor").focus(); 
  validated="false";
  $("#eVendor").attr('class', 'selecte');
  $("#ep3").html("Vendor field is mandatory ");      
}

if(c.options[c.selectedIndex]===undefined){
  $("#eCategory").focus(); 
  validated="false";
  $("#eCategory").attr('class', 'selecte');
  $("#ep2").html("Category field is mandatory ");      
}

if(skure.test(str) && str[3]=="-" && str.length==7){
    search_Duplicate();
}else{
    $("#eSKU").focus(); 
    validated="false";
    $("#eSKU").attr('class', 'inpe');
    $("#ep1").html("SKU id must be 7 character long in following pettern ABC-123 ");      
}


if(validated=="false"){
    return false;
}else{
    return true;
}
}


$(document).ready(function() {
   fetch_category();
   fetch_Vendor();
   document.getElementById('mainAddAck').style.display = 'none';
   document.getElementById('EditAck').style.display = 'none';
   document.getElementById('DeleteAck').style.display = 'none';
   document.getElementById('Addlink').click();

   $("#aNIR").on("click", function() {
    if(validateAdd()){
        search_inventory_add();
    }
}); 

   $("#_aback").on("click", function() {
    Clear_Add_Ack();
    Clear_Add();
    showAdd();
}); 

   $("#aClear").on("click", function() {
    Clear_Add();
}); 

   $("#aSKU").blur(function(){
    search_inventory();
});

   $("#afilename").change(function () {
    addFlag="true";
    readURL(this,"#amyImg");
});

   $("#eNIR").on("click", function() {
    Editraise="false";

    if(validateEdit()){
        search_inventory_edit();
    }
    else{
        Editraise="true";
    }
});

   $("#eClear").on("click", function() {
    Clear_Edit();
}); 

   $("#eSKU").blur(function(){
    if($("#eSKU").val()!="")
      setTimeout(fetch_inventory, 300); 
});

   $("#efilename").change(function () {
    EditFlag="true";
    readURL(this,"#emyImg");
});

   $("#_eback").on("click", function() {
    Clear_Edit_Ack();
    Clear_Edit();
    showEdit();
}); 

   $("#_cNIR").on("click", function() {
       clear_delete_Ack();  
       hideDelete();     
       $("#dSKU").val("");
   }); 

   $("#dNIR").on("click", function() {
    fetch_inventory_delete();
}); 

   $("#_dNIR").on("click", function() {
    delete_inventory();
}); 

   $("#dSKU").blur(function(){
    if($("#dSKU").val()!="")
        fetch_inventory_delete();
});

});

function hideAdd() {
    if (document.getElementById('mainAdd')) {
        if (document.getElementById('mainAdd').style.display != 'none') {
            document.getElementById('mainAdd').style.display = 'none';
            document.getElementById('mainAddAck').style.display = 'block';
        }
    }
}

function showAdd() {
    if (document.getElementById('mainAdd')) {
        if (document.getElementById('mainAdd').style.display == 'none') {
            document.getElementById('mainAdd').style.display = 'block';
            document.getElementById('mainAddAck').style.display = 'none';
        }
    }
}

function hideEdit() {
    if (document.getElementById('Edit')) {
        if (document.getElementById('Edit').style.display != 'none') {
            document.getElementById('Edit').style.display = 'none';
            document.getElementById('EditAck').style.display = 'block';
        }
    }
}

function showEdit() {
    if (document.getElementById('Edit')) {
        if (document.getElementById('Edit').style.display == 'none') {
            document.getElementById('Edit').style.display = 'block';
            document.getElementById('EditAck').style.display = 'none';
        }
    }
}

function hideDelete() {
    if (document.getElementById('DeleteAck')) {
        if (document.getElementById('DeleteAck').style.display != 'none') {
            document.getElementById('DeleteAck').style.display = 'none';
        }
    }
}

function showDelete() {
    if (document.getElementById('DeleteAck')) {
        if (document.getElementById('DeleteAck').style.display == 'none') {
            document.getElementById('DeleteAck').style.display = 'block';
        }
    }
}

function readURL(input,tagName) {
    if (input.files && input.files[0]) {   
        var reader = new FileReader();
        reader.onload = function (e) {
            $(tagName)
            .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
    else{
        $(tagName).attr('src', "/~jadrn018/proj1/Images/jjjcasnlscnalkn.png");
    }
}


var client = new XMLHttpRequest();

function upload(file) 
{
  var formData = new FormData();
  formData.append("product_image", file.files[0]);
  client.open("post", "/perl/jadrn018/uploadFile.cgi", true);
  client.setRequestHeader("Content-Type", "multipart/form-data");
  client.send(formData);  /* Send to server */ 
}

client.onreadystatechange = function() 
{
  if (client.readyState == 4 && client.status == 200) 
  {
      if(client.responseText=="NotAuthorised"){
          window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";    
      }
      else{       
        if(addFlag=="true"){
            var filename =  getfilename($("#afilename").val());
            $('#_amyImg').attr('src', makesrc(filename));
            addFlag="false";
        }
        if(EditFlag=="true"){
            var filename =  getfilename($("#efilename").val());
            $('#_emyImg').attr('src', makesrc(filename));
            EditFlag="false";
        }
    }
}
}

function fetch_category(){
 $.get("http://jadran.sdsu.edu/perl/jadrn018/fetchCategory.cgi",handle_category);   
}     

function handle_category(response) { 
    if(response=="NotAuthorised"){
        window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
    }

    categorySelect = document.getElementById('aCategory');
    ecategorySelect = document.getElementById('eCategory');
    var obj_data = eval("("+response+")");    

    for(j=0; j < obj_data.length; j++)
        categorySelect.options[categorySelect.options.length] = new Option(obj_data[j][1],j);

    for(j=0; j < obj_data.length; j++)
        ecategorySelect.options[ecategorySelect.options.length] = new Option(obj_data[j][1],j);

    $("#aCategory").val("");
    $("#eCategory").val("");
}

function fetch_Vendor(){
 $.get("http://jadran.sdsu.edu/perl/jadrn018/fetchVendor.cgi",handle_vendor);   
}     

function handle_vendor(response) { 
    if(response=="NotAuthorised"){
        window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
    }            

    vendorSelect = document.getElementById('aVendor');
    evendorSelect = document.getElementById('eVendor');
    var obj_data = eval("("+response+")");    

    for(j=0; j < obj_data.length; j++)
        vendorSelect.options[vendorSelect.options.length] = new Option(obj_data[j][1],j);

    for(j=0; j < obj_data.length; j++)
        evendorSelect.options[evendorSelect.options.length] = new Option(obj_data[j][1],j);

    $("#aVendor").val("");
    $("#eVendor").val("");
}


function tabInventory(evt, tabI) {

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabI).style.display = "block";
    evt.currentTarget.className += " active";

    if(tabI=="EditI"){
        if($("#eSKU").val()!=""){
         fetch_inventory();
         if($("#eSKU").val()==""){
            Clear_Edit();
        }
    }
    $("#eSKU").focus(); 
}
if(tabI=="AddI"){
    $("#aSKU").focus();
}
if(tabI=="DeleteI"){
    $("#dSKU").focus();
}

}

function makesrc(imgName){
    var path="/~jadrn018/proj1/Images/";
    return path.concat(imgName);
}

function getfilename(filepath){
    if (filepath) {
        var startIndex = (filepath.indexOf('\\') >= 0 ? filepath.lastIndexOf('\\') : filepath.lastIndexOf('/'));
        var filename = filepath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        return filename;
    }

} 


/////////////////////////////////////////////////////////Add Inventory//////////////////////////////////////
function search_inventory() {
    var sku = $("#aSKU").val();
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductSearch.cgi", 
        data: "SKU=" + sku,
        async: false,
        error: function() { 
          alert("Server Issue while checking dublicate SKU ID");
      }, 
      success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        if(perl_data=="true"){
            $("#ap1").html("SKU id is duplicate please enter new unique SKU id <br/>");
            $("#aSKU").attr('class', 'inpe');
        }
        else{
            $("#ap1").html("");
            $("#aSKU").attr('class', 'inp');

        }
    }
});
}     

function search_inventory_add() {
    var sku = $("#aSKU").val();
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductSearch.cgi", 
        data: "SKU=" + sku,
        async: false,
        error: function() { 
          alert("Server Issue please try again");
      }, 
      success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        if(perl_data=="true"){
            $("#ap1").html("SKU id is duplicate please enter new unique SKU id <br/>");
            $("#aSKU").attr('class', 'inpe');
        }
        else{      
            Check_image_name();
        }
    }
});
}

function Check_image_name() {
    var filename =  getfilename($("#afilename").val());
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ImageDuplicate.cgi", 
        data: "IMG=" + filename,
        async: false,
        error: function() { 
          alert("Server Issue please try again");
      }, 
      success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        if(perl_data=="true"){
            $("#ap9").html("Image name is already in use please enter new image name <br/>");
            }
        else{      
            if(addFlag=="true"){
                upload(document.getElementById("afilename")); 
            } 
            new_inventory();
        }
    }
});
}     
     

function new_inventory() {
    var sku = $("#aSKU").val();
    var c = document.getElementById("aCategory");
    var Catid = c.options[c.selectedIndex].text;
    var v = document.getElementById("aVendor");
    var Vendor = v.options[v.selectedIndex].text;
    var MI = $("#aMI").val();
    var Description = $("#aDescription").val();
    var Features = $("#aFeatures").val();
    var Cost = $("#aCost").val();
    var Retail = $("#aRetail").val();
    var filename =  getfilename($("#afilename").val());
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/NewInventoryRecord.cgi", 
        data: "SKU=" + sku + "&Catid=" + Catid + "&Vendor=" + Vendor + 
        "&MI=" + MI + "&Description=" + Description + "&Features=" + Features + 
        "&Cost=" + Cost + "&Retail=" + Retail + "&filename=" + filename,
        error: function() { 
          alert("Server Issue please try again");
      }, 
      success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        handle_new_inventory_response(perl_data);
        $("#_aSKU").text(sku);
        $("#_aCategory").text(Catid);
        $("#_aVendor").text(Vendor);
        $("#_aMI").text(MI);
        $("#_aDescription").text(Description);
        $("#_aFeatures").text(Features);
        $("#_aCost").text(Cost);
        $("#_aRetail").text(Retail);
    }
});
}    

function handle_new_inventory_response(response) { 
    hideAdd();
}

function Clear_Add() { 
    $("#ap1").html("");
    $("#ap2").html("");
    $("#ap3").html("");
    $("#ap4").html("");
    $("#ap5").html("");
    $("#ap6").html("");
    $("#ap7").html("");
    $("#ap8").html("");
    $("#ap9").html("");
    $("#aSKU").val("");
    $("#aCategory").val("");
    $("#aVendor").val("");
    $("#aMI").val("");
    $("#aDescription").val("");
    $("#aFeatures").val("");
    $("#aCost").val("");
    $("#aRetail").val("");
    $("#afilename").val("");
    $('#amyImg').attr('src', "/~jadrn018/proj1/Images/jjjcasnlscnalkn.png");
    $("#aSKU").attr('class', 'inp');
    $("#aCategory").attr('class', 'select');
    $("#aVendor").attr('class', 'select');
    $("#aMI").attr('class', 'inp');
    $("#aDescription").attr('class', 'box');
    $("#aFeatures").attr('class', 'box');
    $("#aCost").attr('class', 'inp');
    $("#aRetail").attr('class', 'inp');
    addFlag="false";
}

function Clear_Add_Ack() { 
 $("#_aSKU").val("");
 $("#_aCategory").val("");
 $("#_aVendor").val("");
 $("#_aMI").val("");
 $("#_aDescription").val("");
 $("#_aFeatures").val("");
 $("#_aCost").val("");
 $("#_aRetail").val("");
 $("#_afilename").val("");
 $('#_amyImg').attr('src', "/~jadrn018/proj1/Images/abc_22345_tkdksksj.png");
}

/////////////////////////////////////////////////////////Add Inventory//////////////////////////////////////
/////////////////////////////////////////////////////////Edit Inventory//////////////////////////////////////

function fetch_inventory() {
    EditFlag="false";
    var sku = $("#eSKU").val();
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductFetch.cgi", 
        data: "SKU=" + sku,
        error: function() { 
           alert("Server Issue error occured while fetching data");
       }, 
       success: function(perl_data){
           if(Editraise=="true"){
            if(perl_data=="NotAuthorised"){
                window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
            }
            if(perl_data=="[]"){
             $("#ep1").html("SKU id doesn't exist");
             $("#eSKU").attr('class', 'inpe');
         }
         else{
        // document.getElementById("eSKU").disabled = true;
        $("#ep1").html("");
        $("#eSKU").attr('class', 'inp');
        handle_json_data_edit(perl_data);
    }
}

}
});
}     

function handle_json_data_edit(response) { 
    $("#ep1").html("");
    $("#ep2").html("");
    $("#ep3").html("");
    $("#ep4").html("");
    $("#ep5").html("");
    $("#ep6").html("");
    $("#ep7").html("");
    $("#ep8").html("");
    $("#ep9").html("");
    $("#eSKU").attr('class', 'inp');
    $("#eCategory").attr('class', 'select');
    $("#eVendor").attr('class', 'select');
    $("#eMI").attr('class', 'inp');
    $("#eDescription").attr('class', 'box');
    $("#eFeatures").attr('class', 'box');
    $("#eCost").attr('class', 'inp');
    $("#eRetail").attr('class', 'inp');

    var obj_data = eval("("+response+")");    
    $("#efilename").val("");
    $("#eSKU").val(obj_data[0][0]);
    $("#eCategory").val(obj_data[0][1]-1);
    $("#eVendor").val(obj_data[0][2]-1);
    $("#eMI").val(obj_data[0][3]);
    $("#eDescription").val(obj_data[0][4]);
    $("#eFeatures").val(obj_data[0][5]);
    $("#eCost").val(obj_data[0][6]);
    $("#eRetail").val(obj_data[0][7]);
    if(obj_data[0][8]!=""){
        $('#emyImg').attr('src', makesrc(obj_data[0][8]));
        $('#_emyImg').attr('src', makesrc(obj_data[0][8]));
    }   
    editoldfile=obj_data[0][8];
}

function search_Duplicate() {
    var sku = $("#eSKU").val();
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductSearch.cgi", 
        data: "SKU=" + sku,
        async: false,
        error: function() { 
           alert("Server Issue while validating data");
       }, 
       success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        if(perl_data=="true"){
        }
        else{      
            $("#eSKU").attr('class', 'inpe');
            $("#ep1").html("SKU id doesn't exist");
        }
    }
});
}     


function search_inventory_edit() {
    var sku = $("#eSKU").val();
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductSearch.cgi", 
        data: "SKU=" + sku,
        async: false,
        error: function() { 
           Editraise="true";
           alert("Server Issue while validating data");
       }, 
       success: function(perl_data){
        if(perl_data=="NotAuthorised"){
            window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
        }
        if(perl_data=="true"){
            if(EditFlag=="true"){
              upload(document.getElementById("efilename")); 
          }
          edit_inventory(); 
      }
      else{      
        $("#eSKU").attr('class', 'inpe');
        $("#ep1").html("SKU id doesn't exist");
    }
}
});
}     

function edit_inventory() {
    var sku = $("#eSKU").val();
    var c = document.getElementById("eCategory");
    var Catid = c.options[c.selectedIndex].text;
    var v = document.getElementById("eVendor");
    var Vendor = v.options[v.selectedIndex].text;
    var MI = $("#eMI").val();
    var Description = $("#eDescription").val();
    var Features = $("#eFeatures").val();
    var Cost = $("#eCost").val();
    var Retail = $("#eRetail").val();
    var filename;
    if(EditFlag=="true"){
       filename = getfilename($("#efilename").val());
   }else{
       filename =editoldfile;
   }

   $.ajax({
    type: "GET",
    url: "/perl/jadrn018/EditInventory.cgi", 
    data: "SKU=" + sku + "&Catid=" + Catid + "&Vendor=" + Vendor + 
    "&MI=" + MI + "&Description=" + Description + "&Features=" + Features + 
    "&Cost=" + Cost + "&Retail=" + Retail + "&filename=" + filename,

    error: function() { 
      alert("Could not edit server Issue");
  }, 
  success: function(perl_data){
     if(perl_data=="NotAuthorised"){
        window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
    }
    handle_edit_inventory_response(perl_data);
    Editraise="true";
    $("#_eSKU").text(sku);
    $("#_eCategory").text(Catid);
    $("#_eVendor").text(Vendor);
    $("#_eMI").text(MI);
    $("#_eDescription").text(Description);
    $("#_eFeatures").text(Features);
    $("#_eCost").text(Cost);
    $("#_eRetail").text(Retail);
}
});
}     

function handle_edit_inventory_response(response) { 
    hideEdit();
}


function Clear_Edit() { 
 // document.getElementById("eSKU").disabled = false;
 $("#ep1").html("");
 $("#ep2").html("");
 $("#ep3").html("");
 $("#ep4").html("");
 $("#ep5").html("");
 $("#ep6").html("");
 $("#ep7").html("");
 $("#ep8").html("");
 $("#ep9").html("");
 $("#eSKU").val("");
 $("#eCategory").val("");
 $("#eVendor").val("");
 $("#eMI").val("");
 $("#eDescription").val("");
 $("#eFeatures").val("");
 $("#eCost").val("");
 $("#eRetail").val("");
 $("#efilename").val("");
 $('#emyImg').attr('src', "/~jadrn018/proj1/Images/jjjcasnlscnalkn.png");
 $("#eSKU").attr('class', 'inp');
 $("#eCategory").attr('class', 'select');
 $("#eVendor").attr('class', 'select');
 $("#eMI").attr('class', 'inp');
 $("#eDescription").attr('class', 'box');
 $("#eFeatures").attr('class', 'box');
 $("#eCost").attr('class', 'inp');
 $("#eRetail").attr('class', 'inp');
 
 EditFlag="false";
 Editraise="true";

}

function Clear_Edit_Ack() { 
 $("#_eSKU").val("");
 $("#_eCategory").val("");
 $("#_eVendor").val("");
 $("#_eMI").val("");
 $("#_eDescription").val("");
 $("#_eFeatures").val("");
 $("#_eCost").val("");
 $("#_eRetail").val("");
 $("#_efilename").val("");
 $('#_emyImg').attr('src', "/~jadrn018/proj1/Images/abc_22345_tkdksksj.png");
}

/////////////////////////////////////////////////////////Edit Inventory//////////////////////////////////////
/////////////////////////////////////////////////////////Delete Inventory//////////////////////////////////////

function delete_inventory(){
   var sku = $("#dSKU").val();
   $.ajax({
    type: "GET",
    url: "/perl/jadrn018/DeleteInventoryRecord.cgi", 
    data: "SKU=" + sku,
    error: function() { 
       alert("Server issue while Deleting Data");
   }, 
   success: function(perl_data){
    if(perl_data=="NotAuthorised"){
        window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
    }

    $("#dresult").html("Product Deleted successfully");
    $("#dSKU").val("");  
    clear_delete_Ack();  
    hideDelete();     
}
});
}

function fetch_inventory_delete() {
    var sku = $("#dSKU").val();
    $("#dresult").html("");
    $.ajax({
        type: "GET",
        url: "/perl/jadrn018/ProductFetchDelete.cgi", 
        data: "SKU=" + sku,
        error: function() { 
            alert("Server Issue while fetching data from server ");
        }, 
        success: function(perl_data){
            if(perl_data=="NotAuthorised"){
                window.location = "http://jadran.sdsu.edu/perl/jadrn018/logout.cgi";        
            }

            if(perl_data=="[]"){
                $("#dresult").html("SKU is invalid");
                hideDelete();
                clear_delete_Ack(); 
            }
            else{
                showDelete();
                handle_json_delete_data(perl_data);
            }
        }
    });
}     

function handle_json_delete_data(response) { 
 var obj_data = eval("("+response+")");    
 $("#_dSKU").text(obj_data[0][0]);
 $("#_dCategory").text(obj_data[0][1]);
 $("#_dVendor").text(obj_data[0][2]);
 $("#_dMI").text(obj_data[0][3]);
 $("#_dDescription").text(obj_data[0][4]);
 $("#_dFeatures").text(obj_data[0][5]);
 $("#_dCost").text(obj_data[0][6]);
 $("#_dRetail").text(obj_data[0][7]);
 if(obj_data[0][8]!=""){
     $('#_dmyImg').attr('src', makesrc(obj_data[0][8]));
 }   
}

function clear_delete_Ack() { 
 $("#_dSKU").val("");
 $("#_dCategory").val("");
 $("#_dVendor").val("");
 $("#_dMI").val("");
 $("#_dDescription").val("");
 $("#_dFeatures").val("");
 $("#_dCost").val("");
 $("#_dRetail").val("");
 $("#_dfilename").val("");
 $('#_dmyImg').attr('src', "/~jadrn018/proj1/Images/abc_22345_tkdksksj.png");
}
/////////////////////////////////////////////////////////Delete Inventory//////////////////////////////////////





