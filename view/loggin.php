
<div class="formulaire flex flex_row  ">
  <div class="w48">

    <form class=" flex_col "action="index.php/action=connect" method="post">
      <h3>Connection</h3>
      <input type="hidden" name="formulaire" value="Connection">
      <ul>
        <li>
          <span class="input">User Name : </span><br><input type="text" id='user_login' name="user_login" value="<?= (isset($_COOKIE['user_login']))?$_COOKIE['user_login']:null; ?>" required>
        </li>
        <li>
          <span class="input">Passeword : </span><br><input type="password" id='user_pwd' name="user_pwd" value="" required>
        </li>
      </ul>

      <p>
        <input type="submit" name="connect" value="connect">
        <button id='reset' type="reset">reset</button>
        <input type="checkbox" name="remember" <?= (isset($_COOKIE['user_login']))?'checked':null; ?>>remember username
      </p>

    </form>
  </div>
</div>
