<?php
include('../config/config.php');

$title = 'objekt';
include('../view/header.php');
include('../view/side.php');

// GET artikel
$objectid = $_GET['objectid'] ?? null;

// Försök hitta artikeln på hemsidan om vi har en query
if (isset($objectid)) {
    // Koppla mot databas
    $db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
    // Förbered SQL fråga
    $sql1 = <<<EOD
        SELECT
            id,
            title,
            owner,
            image,
            category,
            text
        FROM Object
        WHERE
            id = ?
        ;
        EOD;
    // hämta resultatarray
    $res = prepareExecuteFetchOne($sql1, $db, $objectid);
    if (isset($res["id"])) {
        $objectid = $res["id"];
        $objectTitle = $res["title"];
        $objectText = $res["text"];
        $objectOwner = $res["owner"];
        $objectImage = $res["image"];
        $objectCategory = $res["category"] . "%";

        // Hämta länk till artikeln som motsvarar objektet
        // Förbered SQL fråga
        $sql2 = <<<EOD
        SELECT
            id,
            author
        FROM Article
        WHERE
            title LIKE ?
        ;
        EOD;
        // Prepare the first SQL statement so it can be executed
        $stmt = $db->prepare($sql2);
        // Execute the first SQL statement towards the database
        $stmt->execute([$objectCategory]);
        $articleResult = $stmt->fetch();
        $articleLink = "";
        if (isset($articleResult['id'])) {
            $articleid  = $articleResult['id'];
            $articleAuthor = $articleResult['author'];
            $articleLink = '<p> Läs <a href="article.php?articleid=' . $articleid . '">artikeln ' . $articleAuthor . '</a> för att lära dig mer</p>';
        }

        // Förbered SQL fråga för att räkna alla objekt
        $sql3 = <<<EOD
        SELECT
            COUNT(id) as objectcount
        FROM Object
        ;
        EOD;
        // förebered fråga
        $stmt = $db->prepare($sql3);

        // Execute the first SQL statement towards the database
        $stmt->execute();
        $res3 = $stmt->fetchAll();
        $objectCount = $res3[0]["objectcount"];

        // öka next id med 1 och sänk previous med 1
        $previousObject = $objectid + 1;
        $nextObject = $objectid - 1;
        if ($nextObject < 1) {
            $nextObject = 1;
        }
        if ($previousObject > $objectCount) {
            $previousObject = $objectCount;
        }

        $contentString = <<<EOD
            <div class="content-box content-left text-center">
                <a class="content-left text-left" href="object.php?objectid=$previousObject">Föregående objekt</a>
                <a class="content-right text-right" href="object.php?objectid=$nextObject">Nästa objekt</a>
                <h3 class="content-title"> $objectTitle </h3>
                <a href="img/full-size/$objectImage">
                    <img class="content-fit-img" src="img/550x550/$objectImage" alt="Bild för $objectTitle">
                </a>
                <p>$objectText</p>
                <div>
                    $articleLink
                    <p class="text-small text-right"> Ägare: $objectOwner </p>
                </div>
            </div>
        EOD;
    } else {
        $contentString = <<<EOD
            <div class="content-box content-left text-center">
                <h3 class="content-title"> Hoppsan, det här objektet verkar inte finnas.</h3>
                <a href="objects.php">Klicka här för att gå till objektgalleriet.</a>
            </div>
        EOD;
    }
}
?>

<div class="content">
    <?= $contentString ?>
</div>

<?php
include('../view/footer.php');
