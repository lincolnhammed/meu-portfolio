function ProjectsPage() {
  const projects = [
    {
      name: 'TodoList',
      stack: 'Java · Spring Boot · MySQL · Docker',
      description:
        'Aplicação de gerenciamento de tarefas desenvolvida com Java e Spring Boot, com autenticação, persistência de dados e API REST.',
      href: 'https://todolist.lincolnsilva.dev',
    },

    {
      name: 'Diário',
      stack: 'Java · Spring Boot · MySQL · Docker',
      description:
        'Aplicação para gerenciamento de registros pessoais, desenvolvida com foco em backend, persistência de dados e organização da aplicação.',
      href: 'https://diario.lincolnsilva.dev',
    },
  ];

  return (
    <main className="projects-page">

      <section className="projects-page__hero">
        <p className="projects-page__role">Projetos</p>

        <h1 className="projects-page__title">
          Projetos em destaque
        </h1>

        <p className="projects-page__description">
          Alguns dos projetos que utilizo para aplicar e aprofundar
          os meus conhecimentos em desenvolvimento backend.
        </p>
      </section>


      <section className="projects-page__grid">

        {projects.map((project, index) => (
          <article
            className="projects-page__card"
            key={project.name}
          >
            <p className="projects-page__label">
              {String(index + 1).padStart(2, '0')} — PROJETO
            </p>

            <h2>{project.name}</h2>

            <p className="projects-page__stack">
              {project.stack}
            </p>

            <p className="projects-page__description">
              {project.description}
            </p>

            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              Ver projeto →
            </a>
          </article>
        ))}

      </section>

    </main>
  );
}

export default ProjectsPage;

