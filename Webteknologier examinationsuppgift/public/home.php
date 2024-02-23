<?php
include('../config/config.php');

$title = 'hemsida';
include('../view/header.php');
include('../view/side.php');

// Hämta vilka objekt vi ska ha
// Koppla mot databas
$db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
// Förbered SQL fråga
$sql = <<<EOD
    SELECT
        id,
        image,
        title
    FROM Object
    ;
    EOD;
$stmt = $db->prepare($sql);
$stmt->execute();
$res = $stmt->fetchAll();
// Välj tre objekt
$random_indexes = array();
while (count($random_indexes) < 3) {
    $index = array_rand($res);
    if (!in_array($index, $random_indexes)) {
        $random_indexes[] = $index;
    }
}

// Formattera en sträng för att visa upp objekten
$objectGalleryContentString = '<div class="object-gallery">';
foreach ($random_indexes as $index) {
    $objectid = $res[$index]["id"];
    $objectTitle = $res[$index]["title"];
    $objectImg = $res[$index]["image"];
    $objectString = <<<EOD
        <a href="object.php?objectid=$objectid" class="clickable object-gallery-item">
            <img src="img/250x250/$objectImg" alt="$objectTitle image">
            <div class="object-gallery-title">$objectTitle</div>
        </a>
        EOD;
    $objectGalleryContentString = $objectGalleryContentString . $objectString;
}
$objectGalleryContentString = $objectGalleryContentString . "</div>";

?>
<div class="content">
    <div class="content-box content-left text-center">
        <h3 class="content-title">Välkommen till Begravningsmuseum Online</h3>
        <p>Begravningsmuseum Online(BMO) är en hemsida vars syfte är att visa upp och vårda ett kulturarv.</p>
        <p>Överst på sidan så kan du navigera till de olika objekt och artiklar som vi har.</p>
    </div>
    <div class="content-box content-right text-right">
        <h3>Utställningsobjekt</h3>
        <?= $objectGalleryContentString ?>
    </div>
    <div class="content-box content-left text-left">
        <h3>Tillgänglighet</h3>
        <p>Begravningsmuseum Online(BMO) arbetar med för att alla som har tillgång till internet ska kunna ta del av våra utställningar och allt bedrivs ideellt för stora som små.</p>
    </div>
</div>

<?php
include('../view/footer.php');
