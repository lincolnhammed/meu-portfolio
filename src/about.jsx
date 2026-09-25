import './styles.css';

function About() {
  return (
    <main className="page">

      <section className="about__hero">
        <div>
          <p className="about__role">Sobre mim</p>

          <h1 className="about__title">
            Desenvolvedor Backend Java
          </h1>

          <p className="about__description">
            Sou Lincoln Silva, desenvolvedor focado em Java e Spring Boot,
            interessado em construir aplicações backend, APIs REST e
            soluções com persistência de dados.
          </p>
        </div>

        <div className="about__status">
          <span className="about__status-dot" />
          <span>Java · Spring Boot · Backend</span>
        </div>
      </section>


      <section className="about__grid">

        <article className="about__card">
          <p className="about__label">01 — FOCO</p>

          <h2>Backend Development</h2>

          <p>
            Meu foco principal é o desenvolvimento backend com Java e
            Spring Boot. Tenho estudado e aplicado conceitos como APIs REST,
            autenticação, validação, segurança e organização de aplicações.
          </p>
        </article>


        <article className="about__card">
          <p className="about__label">02 — TECNOLOGIAS</p>

          <h2>Stack atual</h2>

          <div className="about__tech-list">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>REST APIs</span>
            <span>JPA / Hibernate</span>
            <span>MySQL</span>
            <span>SQL</span>
            <span>Git</span>
            <span>Docker</span>
            <span>Linux</span>
          </div>
        </article>


        <article className="about__card">
          <p className="about__label">03 — PROJETOS</p>

          <h2>Aprender construindo</h2>

          <p>
            Utilizo projetos próprios para transformar o que estudo em
            aplicações funcionais. Isso me permite entender não apenas
            o código, mas também a comunicação entre frontend, backend,
            banco de dados e servidor.
          </p>
        </article>


        <article className="about__card">
          <p className="about__label">04 — OBJETIVO</p>

          <h2>Continuar evoluindo</h2>

          <p>
            Estou aprofundando os meus conhecimentos em desenvolvimento
            backend e procurando oportunidades onde possa continuar
            aprendendo, contribuir com a equipa e evoluir como
            desenvolvedor Java.
          </p>
        </article>

      </section>


      <section className="about__bottom">
        <div>
          <p className="about__label">STACK</p>

          <p className="about__stack">
            Java · Spring Boot · REST · JPA / Hibernate · MySQL · Docker · Git · Linux
          </p>
        </div>

        <a href="/projetos" className="btn btn--primary">
          Ver projetos →
        </a>
      </section>

    </main>
  );
}

export default About;
