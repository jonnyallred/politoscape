<?php
function php_get_img($url)
{
    $page = file_get_contents($url);
    $doc = new DOMDocument(); 
    $doc->loadHTML($page);
    $images = $doc->getElementsByTagName('img');

    $largest_sz = 0;
    $largest_img = ''; 

    foreach($images as $image)
    {
        $src = $image->getAttribute('src');
        $dimensions=getimagesize($src);
        $size = $dimensions[0] * $dimensions[1];

        if ($size > $largest_sz)
        {
            $largest_sz = $size;
            $largest_img = $src;
        }
    }
    return $largest_img;
}

echo @php_get_img($argv[1]);
?>