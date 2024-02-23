<?php
include('../config/config.php');

$title = 'about';
include('../view/header.php');
include('../view/side.php');

// id 4 är "Om BMO"
$articleid = 4;

// Koppla mot databas
$db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
// Förbered SQL fråga
$sql = <<<EOD
    SELECT
        *
    FROM Article
    WHERE
        id = ?
    ;
    EOD;
// hämta resultatarray
$res = prepareExecuteFetchOne($sql, $db, $articleid);

$articleTitle = $res["title"];
$articleContent = $res["content"];
$articleAuthor = $res["author"];
$articlePubdate = $res["pubdate"];
echo <<<EOD
<div class="content">
    <div class="content-box content-left text-center">
        <h3 class="content-title"> $articleTitle </h3>
        $articleContent
        <p class="text-small text-right"> $articleAuthor  $articlePubdate </p>
    </div>
</div>
EOD;
?>
<?php
include('../view/footer.php');
