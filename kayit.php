<?php

include("baglanti.php");

if(isset($_POST["kaydet"])) {
    $name = $_POST["kullaniciadi"];
    $email = $_POST["email"];
    $password = password_hash($_POST["parola"], PASSWORD_DEFAULT);

    $ekle = "INSERT INTO kullanicilar (kullanici_adi, email, parola) VALUES ('$name','$email','$password')";
    $calistirekle = mysqli_query($baglanti, $ekle);

    if ($calistirekle) {
        echo '<div id="success-panel" class="success-panel">
                <div class="alert alert-success" role="alert">Kayıt BAŞARILI</div>
              </div>
              <script>
                  document.getElementById("success-panel").style.display = "block";
                  setTimeout(function() {
                      document.getElementById("success-panel").style.display = "none";
                  }, 3000);
              </script>';
    } else {
        echo '<div class="alert alert-danger" role="alert">Kayıt BAŞARISIZ: ' . mysqli_error($baglanti) . '</div>';
    }
    mysqli_close($baglanti);
}

?>

<!doctype html>
<html lang="tr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Üye Kaydı</title>
    <style>
        body {
            background-color: rgb(172, 184, 196);
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin-top: -50px;
        }

        .card {
            background-color: rgb(60, 60, 60);
            border-radius: 12px;
            box-shadow: 0px 4px 8px rgba(179, 179, 179, 0.1);
            padding: 30px;
            color: white;
        }

        .success-panel {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
            text-align: center;
            display: none;
        }

        .card h2 {
            color: white;
        }

        .form-label {
            color: white;
        }

        .form-control {
            background-color: #444;
            color: white;
            border: 1px solid #666;
        }

        .form-control::placeholder {
            color: #bbb;
        }

        .form-control:focus {
            background-color: #555;
            color: white;
            border-color: #007bff;
        }

        .btn-primary {
            background-color: rgb(60, 60, 60);
            border: none;
            color: white;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }

        .navbar {
            background-color: rgb(60, 60, 60);
            padding: 10px 20px;
        }

        .navbar-brand {
            font-size: 22px;
            font-weight: bold;
            color: white;
        }

        .menu-icon {
            font-size: 28px;
            color: white;
            cursor: pointer;
        }

        .dropdown-menu {
            right: 10px;
            top: 50px;
            background-color: rgb(60, 60, 60);
            border-radius: 8px;
            padding: 10px;
            display: none;
            position: absolute;
            width: 150px;
        }

        .dropdown-menu a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 8px;
            font-size: 16px;
        }

        .dropdown-menu a:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    </style>
</head>

<body>
    <nav class="navbar d-flex justify-content-between">
        <div class="navbar-brand">THE LENG</div>
        <div class="menu-icon" onclick="toggleMenu()">☰</div>
        <div class="dropdown-menu" id="menu">
            <a href="http://www.theleng.site">ANA SAYFA</a>
            <a href="http://www.theleng.site/oku">OKU</a>
            <a href="https://www.google.com">ÜYE OL</a>
        </div>
    </nav>

    <div class="container">
        <div class="card">
            <h2 class="text-center mb-4">ÜYE KAYDI</h2>
            <form action="kayit.php" method="POST">
                <div class="mb-3">
                    <label class="form-label">Kullanıcı Adı</label>
                    <input type="text" class="form-control" name="kullaniciadi" required minlength="6" maxlength="30" placeholder="Kullanıcı adınızı girin">
                </div>
                <div class="mb-3">
                    <label class="form-label">E-posta Adresi</label>
                    <input type="email" class="form-control" name="email" required placeholder="E-posta adresinizi girin">
                </div>
                <div class="mb-3">
                    <label class="form-label">Şifre</label>
                    <input type="password" class="form-control" name="parola" required pattern="\S{6,}" placeholder="Şifrenizi girin">
                </div>
                <button type="submit" name="kaydet" class="btn btn-primary w-100">KAYDET</button>
            </form>
        </div>
    </div>
</body>
</html>
