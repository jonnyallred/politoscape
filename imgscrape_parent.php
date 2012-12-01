<?php
include "multithread.php";

$handle = fopen($argv[1], "r+");

$batchsize = 100;
$count = 1;
$written = 0;

$lines = array();
$commands = array();
$output = array();

echo("Running!" . PHP_EOL);

while(true)
{
        $data = fgetcsv($handle, ",");
        $lines[] = $data;

        if(!$data || $count == $batchsize)
        {
            foreach($lines as $entry)
            {
                if(!$entry[7])
                    $commands[] = 'php imgscrape_child.php "' . $entry[1] . '" "' . $entry[3] . '"';
            }
            set_time_limit(0);
            $threads = new Multithread($commands, 30);
            $threads->run();

            $key = 0;
            foreach($lines as $entry)
            {
                if(!$entry[7])
                {
                    $entry[7] = $threads->output[$key];
                    $key++;
                }
                $output[] = array_to_CSV($entry);
            }
                        
            $written += sizeof($lines);
            echo($written . " entries processed." . PHP_EOL);
            
            if($data)
            {
                $count = 1;
                $lines = array();
                $commands = array();
            }
            else
            {
                fclose($handle);
                $handle = fopen($argv[1], "w+");
                fwrite($handle, implode($output));
                break;
            }
        }
        else
            $count++;
}

fclose($handle);

function array_to_CSV($data)
{
    $outstream = fopen("php://memory", 'r+');
    fputcsv($outstream, $data, ',', '"');
    rewind($outstream);
    $csv = fgets($outstream);
    fclose($outstream);
    return $csv;
}
?>
