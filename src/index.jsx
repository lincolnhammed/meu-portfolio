import './styles.css';
import About from './about.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NotFound from './NotFound.jsx';
import Contact from './Contact.jsx';
import ProjectsPage from './ProjectsPage.jsx';
/*
  Homepage do portfólio — Lincoln Silva
  Java Backend Developer

*/


const projects = [
  {
    name: 'TodoList',
    stack: 'Java · Spring Boot · MySQL',
    description: 'Aplicação de gerenciamento de tarefas.',
    href: 'https://todolist.lincolnsilva.dev',
  },

  {
    name: 'Diário',
    stack: 'Java · Spring Boot · MySQL',
    description: 'Aplicação para gerenciamento de registros pessoais.',
    href: 'https://diario.lincolnsilva.dev',
  },
];


function CodePanel() {
  return (
    <div className="code-panel" aria-hidden="true">
      <div className="code-panel__bar">
        <span className="code-panel__dot" />
        <span className="code-panel__dot" />
        <span className="code-panel__dot" />
        <span className="code-panel__filename">TaskController.java</span>
      </div>
      <pre className="code-panel__body">
<code>
<span className="tok-kw">@RestController</span>
<span className="tok-kw">@RequestMapping</span>(<span className="tok-str">"/api/tasks"</span>)
<span className="tok-kw">public class</span> <span className="tok-cls">TaskController</span> {'{'}

    <span className="tok-kw">private final</span> TaskService service;

    <span className="tok-ann">@PostMapping</span>
    <span className="tok-kw">public</span> ResponseEntity{'<Task>'} create(
        <span className="tok-ann">@RequestBody</span> TaskDTO dto) {'{'}
        <span className="tok-kw">return</span> ResponseEntity
            .ok(service.save(dto));
    {'}'}
{'}'}
</code>
      </pre>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__text">
        <p className="hero__role">Junior Java Backend Developer</p>
        <h1 className="hero__name">Lincoln Silva</h1>
        <p className="hero__description">
          Construo APIs REST e aplicações backend com Java e Spring Boot,
          com atenção a código limpo, segurança e persistência de dados.
        </p>
        <div className="hero__actions">
          <a href="/projetos" className="btn btn--primary">
            Ver projetos
          </a>
          <a href="/contacto" className="btn btn--ghost">
            Contactar
          </a>
        </div>
      </div>
      <CodePanel />
    </section>
  );
}

function Skills() {
  const groups = [
    { title: 'Backend Development', items: 'Java · Spring Boot · REST APIs' },
    { title: 'Database', items: 'MySQL · SQL · JPA / Hibernate' },
    { title: 'Tools', items: 'Git · Docker · Linux' },
  ];

  return (
    <section className="skills">
      {groups.map((group) => (
        <div className="skills__item" key={group.title}>
          <h3>{group.title}</h3>
          <p>{group.items}</p>
        </div>
      ))}
    </section>
  );
}

function Projects() {
  return (
    <section className="projects">
      <h2 className="section-title">Projetos em destaque</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <h3>{project.name}</h3>
            <p className="project-card__stack">{project.stack}</p>
            <p className="project-card__description">{project.description}</p>
            <a href={project.href} className="project-card__link">
              Ver projeto →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}





export default function IndexPage() {

  const path = window.location.pathname;

  if (path === '/sobre') {
    return (
      <div className="page">
        <Header />
        <About />
        <Footer />
      </div>
    );
  }
  if (path === '/contacto') { 
    return ( 
      <div className="page"> 
        <Header /> 
        <Contact /> 
        <Footer /> 
      </div>
    ); 
  }
 
  if (path === '/projetos') {
    return (
      <div className="page">
        <Header />
        <ProjectsPage />
        <Footer />
      </div>
    );
  }


  if (path !== '/') {
    return (
      <div className="page">
        <Header />
        <NotFound />
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}



