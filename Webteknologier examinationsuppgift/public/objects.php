<?php
include('../config/config.php');

$title = 'objekt';
include('../view/header.php');
include('../view/side.php');
?>

<?php
// Koppla mot databas
$db = connectToDatabase(createDSN(getFilename("bmo.sqlite")));
// Förbered SQL fråga
$sql = <<<EOD
    SELECT
        *
    FROM Object
    ORDER BY
        id DESC
    ;
    EOD;

// förbered frågan för exekvering
$stmt = $db->prepare($sql);

// exekvera frågan
$stmt->execute();
// hämta resultatarray
$res = $stmt->fetchAll();
?>

<div class="content">
    <div class="content-box content-left text-center">
        <h3 class="content-title">Utställningsobjekt</h3>
        <p> Nedan kan du scrolla mellan olika objekt som du kan lära dig mer om. </p>
        <p> Du kan också trycka på en bild för att förstora den. </p>
    </div>

    <?php
    // Fyll ut sidan med previews
    $pageContent = objectToContentFullPreview($res);
    echo $pageContent;
    ?>
</div>

<?php
include('../view/footer.php');
