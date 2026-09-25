
function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code">404</p>

      <h1>Página não encontrada</h1>

      <p>
        A página que você tentou acessar não existe.
      </p>

      <a href="/" className="btn btn--primary">
        Voltar para o início
      </a>
    </main>
  );
}

export default NotFound;

