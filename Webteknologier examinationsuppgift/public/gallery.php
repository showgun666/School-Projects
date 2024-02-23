<?php

include('../config/config.php');

$title = 'sökresultat';
include('../view/header.php');
include('../view/side.php');

$page = $_GET["page"] ?? 0;

// Koppla mot databas
$db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
// Förbered SQL fråga, order by desc så förhoppningsvis nyare objekt kommer först
$sql = <<<EOD
    SELECT
        id,
        title,
        image
    FROM Object
    ORDER BY id DESC
    ;
    EOD;
// förbered frågan för exekvering
$stmt = $db->prepare($sql);
// exekvera frågan
$stmt->execute();
// hämta resultatarray
$res = $stmt->fetchAll();

// hämta de objekt vi vill ha ur resultatarray
$start_index = $page * 6;
$pageNumber = $page + 1;
$contentString = <<<EOD
    <div class="object-gallery">
    EOD;

$buttonStringPrevious = '<a class="button-50 text-left" href="gallery.php?page=' . $page - 1 . '">< Föregående</a>';
$buttonStringNext = '<a class="button-50 text-right" href="gallery.php?page=' . $page + 1 . '">Nästa ></a>';
if ($page < 1) {
    $contentString = $contentString . '<a class="button-50"> </a>' . $buttonStringNext;
} else if ($page >= $res[0]["id"] / 6 - 1) {
    $contentString = $contentString . $buttonStringPrevious;
} else {
    $contentString = $contentString . $buttonStringPrevious;
    $contentString = $contentString . $buttonStringNext;
}
$contentString = $contentString . '<h3 class="content-title"> Bildgalleri sida ' . $pageNumber . '</h3>';

for ($i = $start_index; $i < $start_index + 6; $i++) {
    if (isset($res[$i])) {
        $objectid = $res[$i]["id"];
        $objectTitle = $res[$i]["title"];
        $objectImg = $res[$i]["image"];
        $itemString = <<<EOD
        <a href="img/full-size/$objectImg" class="object-gallery-item ">
            <img src="img/80x80/$objectImg" alt="$objectTitle image">
            <div class="object-gallery-title">$objectTitle</div>
        </a>
        EOD;
        $contentString = $contentString . $itemString;
    }
}
$contentString = $contentString . "</div>";
?>
<div class="content">
    <div class="content-box content-left text-center">
        <?= $contentString ?>
    </div>
</div>

<?php
include('../view/footer.php');
