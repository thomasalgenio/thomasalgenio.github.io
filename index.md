<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Name</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: white;
    }

    nav {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
    }

    .logo {
      font-weight: bold;
      color: #2dd4bf;
    }

    .links a {
      color: white;
      margin-left: 20px;
      text-decoration: none;
    }

    .hero {
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    h1 {
      font-size: 50px;
      margin: 0;
    }

    p {
      color: #94a3b8;
      font-size: 20px;
    }

    .btn {
      margin-top: 20px;
      padding: 12px 25px;
      background: #2dd4bf;
      border: none;
      border-radius: 25px;
      color: black;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
    }

    .btn:hover {
      background: #14b8a6;
    }
  </style>
</head>

<body>

  <nav>
    <div class="logo">MyPortfolio</div>
    <div class="links">
      <a href="#">Home</a>
      <a href="#">Projects</a>
      <a href="#">Contact</a>
    </div>
  </nav>

  <div class="hero">
    <h1>Hi, I'm Your Name</h1>
    <p>I build websites and learn new tech</p>

    <a class="btn" href="#">View My Work</a>
  </div>

</body>
</html>