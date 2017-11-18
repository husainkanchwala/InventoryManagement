#!/usr/bin/perl 

# Kanchwala, Husain    Account:  jadrn018
# CS645, Spring 2017
# Project 1



use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use DBI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn018";
my $username = "jadrn018";
my $password = "movement";
my $database_source = "dbi:mysql:$database:$host:$port";
my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn018SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
   print $q->header('text/plain;charset=UTF-8');
   print "NotAuthorised";	
return;
}


my $sku = "";
my $catid = "";
my $venid = "";
my $vendorM = "";
my $description = "";
my $features = "";
my $cost = "";
my $retail = "";
my $image = "";

$sku = $q->param("SKU");
$catid = $q->param("Catid");
$venid = $q->param("Vendor");
$vendorM = $q->param("MI");
$description = $q->param("Description");
$features = $q->param("Features");
$cost = $q->param("Cost");
$retail = $q->param("Retail");
$image = $q->param("filename");

my $cid="1";
my $vid="1";

my $dbhc = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $sth = $dbhc->prepare("Select id from category where name=?");
$sth->execute($catid);
$cid=$sth->fetchrow_array();
$sth->finish();
$dbhc->disconnect();
 
my $dbhv = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $sth = $dbhv->prepare("Select id from vendor where name=?");
$sth->execute($venid);
$vid=$sth->fetchrow_array();
$sth->finish();
$dbhv->disconnect();

my $dbhd = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $queryd = "Delete from product where sku='$sku'";
$dbhd->do($queryd);
$dbhd->disconnect();

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $query = "Insert into product (sku,catID,venID,vendorModel,description,features,cost,retail,image) ";
$query .= "VALUES ('$sku',$cid,$vid,'$vendorM','$description','$features',$cost,$retail,'$image')";
$dbh->do($query);
$dbh->disconnect();

print "Content-type: text/html\n\n";
print "Product has been Edited successfully";


        



