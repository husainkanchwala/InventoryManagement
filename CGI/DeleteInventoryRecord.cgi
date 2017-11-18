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
$sku = $q->param("SKU"); 
            
my $dbhd = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $queryd = "Delete from product where sku='$sku'";
$dbhd->do($queryd);
$dbhd->disconnect();

print "Content-type: text/html\n\n";
print "Product has been Deleted successfully";


        



