import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "Pensamento computacional: fundamentos da computação e lógica de programação",
    platform: "Alura",
    href: "https://cursos.alura.com.br/certificate/leonardofernandesmastroto/computacao-fundamentos-computacao-pensamento-computacional",
    category: "Fundamentos",
  },
  {
    title: "Python: começando com a linguagem",
    platform: "Alura",
    href: "https://cursos.alura.com.br/certificate/leonardofernandesmastroto/python-introducao-a-linguagem",
    category: "Python",
  },
  {
    title: "Python: crie a sua primeira aplicação",
    platform: "Alura",
    href: "https://cursos.alura.com.br/certificate/leonardofernandesmastroto/python-crie-sua-primeira-aplicacao",
    category: "Python",
  },
  {
    title: "Carreira Desenvolvimento Back-End Python: Boas-vindas e primeiros passos",
    platform: "Alura",
    href: "https://cursos.alura.com.br/user/leonardofernandesmastroto/course/carreira-python-backend-boas-vindas/certificate",
    category: "Python",
  },
  {
    title: "DevOps: trabalhando com repositórios no GitHub",
    platform: "Alura",
    href: "https://cursos.alura.com.br/certificate/leonardofernandesmastroto/devops-trabalhando-repositorios-github",
    category: "DevOps",
  },
];

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-2">
            <span className="text-muted-foreground">{'// '}</span>certificados
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minhas <span className="gradient-text">conquistas</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Certificados conquistados ao longo da jornada de aprendizado. Cada um representa um passo a mais na construção de uma base sólida.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {certificates.map((cert, i) => (
            <motion.a
              key={cert.title}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 card-glow-hover transition-all duration-300 hover:border-primary/30"
            >
              <div className="p-2.5 rounded-md bg-secondary shrink-0">
                <Award className="text-primary" size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate md:whitespace-normal">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs text-muted-foreground">{cert.platform}</span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-secondary text-accent">
                    {cert.category}
                  </span>
                </div>
              </div>

              <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={16} />
            </motion.a>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> echo "mais certificados em breve..." <span className="animate-blink text-primary">▋</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;
