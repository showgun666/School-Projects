<?php

// hämta senaste artikeln från databasen baserat på pubdate och visa i side
// Koppla mot databas
$db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
// Förbered SQL fråga
$sql = <<<EOD
    SELECT
        *
    FROM
        article
    WHERE
        category = 'article'
    ORDER BY
        pubdate DESC
    LIMIT 1
    ;
    EOD;
// Prepare the first SQL statement so it can be executed
$stmt = $db->prepare($sql);
$stmt->execute();
$res = $stmt->fetch();

$articleid = $res["id"];
$articleTitle = $res["title"];
$articleContent = substr($res["content"], 0, 150) . "...";
$articlePubdate = $res["pubdate"];
?>
<main>
    <div class="side-bar content-left">
        <h3> Nyheter </h3>
        <a class="block-link" href="article.php?articleid=<?= $articleid ?>">
            <div class="content-box text-wrap">
                <p> Senaste artikeln</p>
                <p class="text-small"><?= $articlePubdate ?>
                <h3><?= $articleTitle ?></h3>
                <p><?= $articleContent ?></p>
            </div>
        </a>

    </div>
