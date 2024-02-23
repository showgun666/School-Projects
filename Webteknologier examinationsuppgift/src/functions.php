<?php

/**
 * Quick and easy function to connect to a database with pdo.
 *
 * @return object as the database connection object.
 */
function connectToDatabase(string $dsn): object
{
    try {
        $db = new PDO($dsn);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "Failed to connect to the database using DSN:<br>'$dsn'<br>";
        throw $e;
    }

    return $db;
}

/**
 * Create DSN
 *
 * @return string the DSN
 */
function createDSN(string $adress): string
{
    // Create a DSN for the database using its filename
    $fileName = "$adress";
    $dsn = "sqlite:$fileName";

    return $dsn;
}

/**
 * Get filename
 *
 * @return string the filename
 */
function getFilename(string $adress): string
{
    // Selects file location depending on
    $fileName = "../db/$adress";
    if ($_SERVER["SERVER_NAME"] !== "www.student.bth.se") {
        $fileName = "C:\db\\$adress";
    }

    return $fileName;
}

/**
 * Get result from SQL statement
 *
 * @return array the result
 */
function prepareExecuteFetchOne(string $sql, PDO $db, string $query)
{
    // Prepare the first SQL statement so it can be executed
    $stmt = $db->prepare($sql);

    // Execute the first SQL statement towards the database
    $arg = ["$query"];
    $stmt->execute($arg);
    $res = $stmt->fetch();
    return $res;
}

/**
 * Get result from SQL statement
 *
 * @return array the result
 */
function prepareExecuteFetchAll(string $sql, PDO $db, string $query)
{
    // Prepare the first SQL statement so it can be executed
    $stmt = $db->prepare($sql);

    // Execute the first SQL statement towards the database
    $arg = ["$query"];
    $stmt->execute($arg);
    $res = $stmt->fetchAll();
    return $res;
}

/**
 * Takes a db resultset and returns html code in the theme of the website
 *
 * @return string the content of the page
 */
function articleToContentFullPreview(array $dbresultset)
{
    $formattedString = "";
    $i = 1;
    foreach ($dbresultset as $result) {
        $id = $result["id"];
        $title = $result['title'];
        $content = $result['content'];
        $date = $result["pubdate"];
        // Create substring for preview text
        $content = substr($content, 0, 150) . "...";

        // Alternate positioning of content.
        if ($i % 2 != 0) {
            $position = "content-right text-right";
        } else {
            $position = "content-left text-left";
        }

        // Append string to return string
        $formattedString = $formattedString . <<<EOD
        <a class="block-link" href="article.php?articleid=$id">
            <div class="content-box $position">
                <h3>$title</h3>
                <p> $content </p>
                <p class="text-small content-right">$date</p>
            </div>
        </a>
        EOD;

        $i++;
    }

    return $formattedString;
}

/**
 * Takes a db resultset and returns html code in the theme of the website
 *
 * @return string the content of the page
 */
function objectToContentFullPreview(array $dbresultset)
{
    $formattedString = "";
    $i = 1;
    foreach ($dbresultset as $result) {
        $id = $result['id'];
        $title = $result['title'];
        $content = $result['text'];
        $img = $result['image'];

        // Alternate positioning of content.
        if ($i % 2 != 0) {
            $position = "content-right text-right";
            $positionImage = "content-left";
        } else {
            $position = "content-left text-left";
            $positionImage = "content-right";
        }

        $formattedString = $formattedString . <<<EOD
        <a class="block-link" href="object.php?objectid=$id">
            <div class="content-box $position">
                <img class="$positionImage" src="img/250x250/$img" alt="Bild för $title">
                <h3>$title</h3>
                <p> $content </p>
            </div>
        </a>
        EOD;

        $i++;
    }

    return $formattedString;
}
