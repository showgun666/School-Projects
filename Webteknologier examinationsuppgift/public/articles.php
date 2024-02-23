<?php
include('../config/config.php');

$title = 'artiklar';
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
    FROM
        article
    WHERE
        category = 'article'
        OR
        category = 'maggy'
    ORDER BY
        pubdate DESC
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
        <h3 class="content-title">Presentation av artiklar</h3>
        <p> Nedan kan du bläddra mellan olika artiklar som du kan läsa. De är sorterade med den senaste artikeln överst och sedan i fallande ordning nedåt. </p>
        <p> Tryck på en artikel för att läsa fulla artikeln.</p>
    </div>
    <?php
        // Fyll ut sidan med previews
        $pageContent = articleToContentFullPreview($res);
        echo $pageContent;
    ?>
</div>

<?php
include('../view/footer.php');
