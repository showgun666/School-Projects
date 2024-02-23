<?php

include('../config/config.php');

$title = 'sökresultat';
include('../view/header.php');
include('../view/side.php');

$resultstring = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST' and $_POST['search'] != "") {
    $query = '%' . $_POST['search'] . '%';

    // koppla mot databas
    $db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
    // Förbered SQL fråga mot article table
    $sqlarticle = <<<EOD
        SELECT
            *
        FROM Article
        WHERE
            title
            LIKE ?
        ;
        EOD;
    // hämta resultatarray
    $resArticle = prepareExecuteFetchAll($sqlarticle, $db, $query);

    // Förbered SQL fråga mot object table
    $sqlobject = <<<EOD
        SELECT
            *
        FROM Object
        WHERE
            title OR category
            LIKE ?
        ;
        EOD;
    // hämta resultatarray
    $resObject = prepareExecuteFetchAll($sqlobject, $db, $query);

    // Visa resultat, först artiklar, sedan objekt.
    $i = 1;
    foreach ($resArticle as $result) {
        if ($i % 2 == 0) {
            $positionText = "text-left";
            $positionContent = "content-left";
        } else {
            $positionText = "text-right";
            $positionContent = "content-right";
        }
        $resultid = $result["id"];
        $resultTitle = $result["title"];
        $resultContent = $result["content"];
        $contentPreview = substr($resultContent, 0, 150) . "...";

        $contentstring = <<<EOD
            <a class="block-link" href="article.php?articleid=$resultid">
                <div class="content-box $positionText $positionContent">
                    <h3 class="content-title $positionText"> Artikel $resultTitle </h3>
                    <br>
                    <p>$contentPreview</p>
                </div>
            </a>
        EOD;
        $resultstring = $resultstring . $contentstring;
        $i++;
    }
    foreach ($resObject as $result) {
        if ($i % 2 == 0) {
            $positionText = "text-left";
            $positionContent = "content-left";
        } else {
            $positionText = "text-right";
            $positionContent = "content-right";
        }
        $resultid = $result["id"];
        $resultTitle = $result["title"];
        $resultContent = $result["text"];
        $resultImg = $result["image"];
        $contentPreview = substr($resultContent, 0, 70) . "...";
        $contentstring = <<<EOD
            <a class="block-link" href="object.php?objectid=$resultid">
                <div class="content-box $positionText $positionContent">
                    <h3 class="content-title $positionText"> Objekt $resultTitle </h3>
                    <br>
                    <img class="$positionContent" src="img/80x80/$resultImg" alt="Bild för $resultTitle">
                    <p>$contentPreview</p>
                </div>
            </a>
        EOD;
        $resultstring = $resultstring . $contentstring;
        $i++;
    }
}
?>

<div class="content">
    <div class="content-box content-center text-center">
        <h3 class="content-title text-center"> Sökresultat </h3>
    </div>
    <?= $resultstring ?>
</div>

<?php
include('../view/footer.php');
