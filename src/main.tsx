import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gallery, gym, media, navigation, reviews } from './content';
import './style.css';

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Steel Gym, início">
    <img src={media.logo} alt="" width="480" height="240" />
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <header className={scrolled || open ? 'header solid' : 'header'} onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }}>
    <div className="wrap header-inner">
      <Brand />
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        {open ? 'Fechar' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      <nav id="menu" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
        {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="button header-action" href="#a-steel">Conheça a Steel <span aria-hidden="true">↗</span></a>
    </div>
  </header>;
}

function WhatsApp({ label = 'Fale com a Steel', className = 'button primary' }) {
  return <a className={className} href={gym.whatsapp} target="_blank" rel="noreferrer">
    {label}<span aria-hidden="true">↗</span>
  </a>;
}

function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <img className="hero-photo" src={media.mural} alt="" fetchPriority="high" />
    <div className="wrap hero-inner">
      <p className="eyebrow hero-tag">Steel Gym <span> / </span> Since {gym.founded}</p>
      <h1 id="hero-title">Mais que<br />treinar.<br /><em>É sobre evoluir.</em></h1>
      <p className="hero-copy">Em Catanduva, uma academia construída com disciplina, dedicação e paixão por transformar vidas.</p>
      <div className="actions">
        <a className="button primary" href="#estrutura">Conheça nossa estrutura <span aria-hidden="true">↗</span></a>
        <WhatsApp className="button outline" />
      </div>
      <div className="hero-foot">
        <a href="#a-steel"><span aria-hidden="true">↓</span> Explore a Steel</a>
        <span>{gym.city}</span>
      </div>
    </div>
  </section>;
}

function About() {
  return <section className="section wrap editorial" id="a-steel" data-reveal>
    <figure className="editorial-photo">
      <img src={gallery[0].src} alt={gallery[0].alt} loading="lazy" />
      <figcaption>Steel Gym · {gym.city}</figcaption>
    </figure>
    <div className="section-copy">
      <p className="eyebrow">A Steel</p>
      <h2>Uma história construída com <em>força.</em></h2>
      <p>Desde 2001, a Steel Gym faz parte da jornada de pessoas que buscam mais saúde, qualidade de vida e evolução. Aqui, dedicação e disciplina aproximam pessoas que escolheram fazer do treino parte da vida.</p>
      <a className="text-link" href="#estrutura">Veja a estrutura <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const photo = gallery[index];
  const move = (offset: number) => setIndex(current => (current + offset + gallery.length) % gallery.length);

  return <section className="section structure" id="estrutura">
    <div className="wrap">
      <div className="split-heading" data-reveal>
        <div><p className="eyebrow">Estrutura</p><h2>Por dentro<br />da <em>Steel.</em></h2></div>
        <p>Equipamentos novos e de qualidade, ambiente limpo e organizado e uma equipe atenciosa. É o que os alunos destacam nas avaliações.</p>
      </div>
      <div className="gallery" data-reveal>
        {gallery.map(({ src, title, alt }, i) => <button className="gallery-tile" type="button" key={src} aria-label={`Ampliar: ${title}`} onClick={event => {
          trigger.current = event.currentTarget;
          setIndex(i);
          dialog.current?.showModal();
        }}>
          <img src={src} alt={alt} loading="lazy" />
          <span>{title} <b aria-hidden="true">↗</b></span>
        </button>)}
      </div>
      <dialog ref={dialog} aria-label="Galeria da Steel Gym" onClose={() => trigger.current?.focus()} onClick={event => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }} onKeyDown={event => {
        if (event.key === 'ArrowLeft') move(-1);
        if (event.key === 'ArrowRight') move(1);
      }}>
        <div className="lightbox">
          <button className="light-close" type="button" aria-label="Fechar galeria" onClick={() => dialog.current?.close()}>×</button>
          <img src={photo.src} alt={photo.alt} loading="lazy" />
          <div className="light-nav">
            <button type="button" aria-label="Foto anterior" onClick={() => move(-1)}>←</button>
            <p aria-live="polite">{photo.title} · {index + 1}/{gallery.length}</p>
            <button type="button" aria-label="Próxima foto" onClick={() => move(1)}>→</button>
          </div>
        </div>
      </dialog>
    </div>
  </section>;
}

function Coaching() {
  return <section className="section wrap editorial coaching" data-reveal>
    <div className="section-copy">
      <p className="eyebrow">Acompanhamento</p>
      <h2>Evolução não acontece <em>sozinha.</em></h2>
      <p>Quem treina na Steel destaca o cuidado dos instrutores e a atenção da equipe. Um ambiente acolhedor faz diferença na hora de tirar dúvidas, criar uma rotina e seguir treinando.</p>
    </div>
    <figure className="steel-film">
      <video autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback poster={media.gymFloor} aria-label="Vídeo da Steel Gym">
        <source src={media.video} type="video/mp4" />
      </video>
      <figcaption>Steel Gym no Instagram</figcaption>
    </figure>
  </section>;
}

function Reviews() {
  return <section className="section reviews" id="avaliacoes">
    <div className="wrap" data-reveal>
      <div className="split-heading">
        <div><p className="eyebrow">Avaliações</p><h2>Quem treina<br /> <em>conta.</em></h2></div>
        <div className="rating"><div><strong>{gym.rating}</strong> / 5,0</div><span className="stars" aria-hidden="true">★★★★★</span><p>{gym.reviewCount} avaliações no Google</p></div>
      </div>
      <div className="quotes">{reviews.map(review => <figure key={review}>
        <span className="quote-mark" aria-hidden="true">“</span><blockquote>{review}</blockquote><figcaption>Avaliação no Google</figcaption>
      </figure>)}</div>
      <a className="text-link" href={gym.google} target="_blank" rel="noreferrer">Consultar avaliações no Google <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}

function Mascot() {
  return <section className="section wrap editorial mascot" aria-labelledby="mascot-title" data-reveal>
    <div className="section-copy">
      <h2 id="mascot-title">O mascote da <em>Steel.</em></h2>
    </div>
    <figure className="editorial-photo">
      <img src={media.mascot} alt="Mascote da Steel Gym no salão de treino" loading="lazy" />
    </figure>
  </section>;
}

function Contact() {
  return <>
    <section className="callout">
      <div className="wrap" data-reveal>
        <h2>Chegou a sua vez<br /> de <em>evoluir.</em></h2>
        <p>Conheça a Steel Gym e faça parte de uma história construída com disciplina e dedicação desde 2001.</p>
        <WhatsApp />
      </div>
    </section>
    <section className="section wrap contact" id="contato">
      <div className="section-copy" data-reveal>
        <p className="eyebrow">Localização e contato</p><h2>Visite a <em>Steel.</em></h2>
        <address>
          <p>{gym.address}</p>
          <p><a href={gym.telephone}>{gym.phone}</a></p>
          <p>{gym.hours}</p>
          <p><a href={gym.instagram} target="_blank" rel="noreferrer">@steelgymacademia <span aria-hidden="true">↗</span></a></p>
        </address>
        <div className="actions"><a className="button outline" href={gym.route} target="_blank" rel="noreferrer">Abrir rota <span aria-hidden="true">↗</span></a><WhatsApp /></div>
      </div>
      <iframe className="map" src={gym.map} title="Localização da Steel Gym no Google Maps" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
    </section>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-main"><Brand />
        <nav aria-label="Navegação do rodapé">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="footer-social"><a href={gym.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={gym.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Steel Gym Academia</p><p>{gym.address}</p></div>
    </div>
  </footer>;
}

function App() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.animate([{ opacity: 0.65, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], {
          duration: 490, easing: 'cubic-bezier(.2,.65,.3,1)',
        });
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip" href="#conteudo">Ir para o conteúdo</a>
    <Header />
    <main id="conteudo"><Hero /><About /><Gallery /><Coaching /><Reviews /><Mascot /><Contact /></main>
    <Footer />
    <WhatsApp label="WhatsApp" className="floating" />
  </>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
