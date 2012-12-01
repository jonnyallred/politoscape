<?php
$url = $argv[1];
$title = $argv[2];
error_reporting(0);

$page = file_get_contents($url);
$doc = new DOMDocument(); 
$doc->loadHTML($page);
$images = $doc->getElementsByTagName('img');

$largest_sz = 0;
$largest_img = ''; 

foreach($images as $image)
{
    $src = $image->getAttribute('src');
    $dimensions = getimagesize($src);
    $size = $dimensions[0] * $dimensions[1];

    if ($size > $largest_sz)
    {
        $largest_sz = $size;
        $largest_img = $src;
    }
}

if ($largest_img)
    echo $largest_img;
else 
{
    $article_title = urlencode($title);
    $google_url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCWTGypF4K9zHeHQpkgGxlPuAWsqJEQP_I&safe=high&searchType=image&cx=017371498165564603451:bos8ixt4fke&q=" . $article_title;
    $json = file_get_contents($google_url);
    $jset = json_decode($json, true);
    echo $jset["items"][0]["link"];
}
?>
