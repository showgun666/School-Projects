<!doctype html>
<html lang="sv">
<head>
    <meta charset="utf-8">
    <title><?= $title ?> | BMO</title>
    <meta name="referrer" content="unsafe-url">
    <link rel="shortcut icon" href="img/maggy/minnestavla.jpg">
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <div class="container">
        <header class="header navbar navbar-fixed-top">
            <nav class="navbar-header">

                <ul class="nav nav-left">
                    <li>
                        <a href="home.php">Hem</a>
                    </li>
                    <li>
                        <a href="about.php">Om oss</a>
                    </li>
                    <li>
                        <a href="articles.php">Artiklar</a>
                    </li>
                    <li>
                        <a href="objects.php">Objekt</a>
                    </li>
                    <li>
                        <a href="gallery.php">Galleri</a>
                    </li>
                </ul>

                <ul class="nav nav-right">
                    <li>
                        <form class="nav-search" action="search.php" method="POST">
                            <input type="text" name="search" placeholder="Search...">
                            <button type="submit">Sök</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </header>
        <div class="banner">
            <h3 class="text-center">Begravningsmuseum Online</h3>
            <h4 class="text-center">Upptäck svenska begravningsseder och bruk under 1800-tal och tidigt 1900-tal med oss.</h4>
        </div>
        