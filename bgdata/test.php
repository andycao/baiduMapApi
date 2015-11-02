<?php

$mac = $_GET['xid'];

$timestamp = time();
$exKey = 'c8220c77c0afa8369dea92e82c56bd53';
$domain = 'm.cusflo.com';

$secret = md5( base64_encode( $domain . $mac . $exKey . $timestamp ) );

$bdurl = 'http://bdplus.baidu.com/portrait?xid=' . $mac . '&domain=' . $domain . '&timestamp=' . $timestamp . '&secret=' . $secret;

$info = file_get_contents( $bdurl );
  // http://bdplus.baidu.com/portrait?xid=0061718018af&domain=m.cusflo.com&timestamp=1446287468&secret=20545dcd6461204986231f6f930d24ef&_=1446287465101");

print( $info );

?>