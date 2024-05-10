export default function LoginForm() {
    return (
      <form method="post" action="/api/login">
        <p>
          パスワード<br />
          <input type="password" name="password" class="form-text" />
        </p>

        <button type="submit" class="form-submit">ログイン</button>
      </form>
    );
  }