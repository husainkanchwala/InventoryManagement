#!/usr/bin/perl

# Kanchwala, Husain    Account:  jadrn018
# CS645, Spring 2017
# Project 1

use DBI;
use CGI;
use JSON;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn018";
my $username = "jadrn018";
my $password = "movement";
my $database_source = "dbi:mysql:$database:$host:$port";
my @response;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn018SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
   print $q->header('text/plain;charset=UTF-8');
   print "NotAuthorised";	
return;
}


my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
           
my $sth = $dbh->prepare("SELECT * from vendor");
$sth->execute();

print "Content-type: text/html\n\n";

while(my @row=$sth->fetchrow_array()) {
    push(@response, \@row);
    }

$sth->finish();
$dbh->disconnect();
$to_send = encode_json(\@response);
    
print $to_send; 
