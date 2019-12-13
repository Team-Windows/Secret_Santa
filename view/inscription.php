<div class="">

    <div class="w48 second_formulaire ">
      <form class="flex_col " action="index.php/action=connect" method="post">
        <h3>Inscription</h3>
        <input type="hidden" name="formulaire" value="Inscription">
        <ul>
          <li>
            <span class="input">User Name : </span> <br><input type="text" id='user_login' name="user_login" value="<?= (isset($_COOKIE['user_login']))?$_COOKIE['user_login']:null; ?>" required>
          </li>
          <li>
            <span class="input">Passeword : </span><br><input type="password" id='user_pwd' name="user_pwd" value="" required>
          </li>
          <li>
            <span class="input">Confirm Passeword : </span><br><input type="password" id='user_pwd' name="user_pwd" value="" required>
          </li>
        </ul>
        <p>
          <input type="submit" name="connect" value="Inscription">
        </p>

      </form>
    </div>

</div>
