function Contact() {
  return (
    <main className="contact">

      <section className="contact__hero">
        <p className="contact__role">Contacto</p>

        <h1 className="contact__title">
          Vamos conversar.
        </h1>

        <p className="contact__description">
          Se quiser entrar em contacto comigo sobre oportunidades,
          projetos ou desenvolvimento backend, pode encontrar-me
          através dos canais abaixo.
        </p>
      </section>


      <section className="contact__grid">

        <a
          href="mailto:lincolnhammed@icloud.com"
          className="contact__card"
        >
          <p className="contact__label">01 — EMAIL</p>

          <h2>Email</h2>

          <p>
            Envie-me uma mensagem diretamente por email.
          </p>
        </a>


        <a
          href="https://www.linkedin.com/in/lincolnhammed/"
          target="_blank"
          rel="noreferrer"
          className="contact__card"
        >
          <p className="contact__label">02 — LINKEDIN</p>

          <h2>LinkedIn</h2>

          <p>
            Veja o meu perfil profissional e entre em contacto comigo.
          </p>
        </a>


        <a
          href="https://github.com/lincolnhammed"
          target="_blank"
          rel="noreferrer"
          className="contact__card"
        >
          <p className="contact__label">03 — GITHUB</p>

          <h2>GitHub</h2>

          <p>
            Veja os meus projetos e código.
          </p>
        </a>

      </section>

    </main>
  );
}

export default Contact;

