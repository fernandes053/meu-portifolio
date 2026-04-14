import { motion } from "framer-motion";
import { Code2, GraduationCap, Zap, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const languages = ["Python", "JavaScript", "C++", "Dart"];

const stats = [
  { icon: GraduationCap, label: "Semestre", value: "5º" },
  { icon: Zap, label: "Certificados", value: "5+" },
  { icon: Terminal, label: "Commits", value: "0" },
];

const AboutSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [commitCount, setCommitCount] = useState<string>(stats[2].value);

  useEffect(() => {
    const abortController = new AbortController();

    const loadCommitCount = async () => {
      try {
        const response = await fetch("/api/commit-count", {
          signal: abortController.signal,
        });

        if (!response.ok) return;

        const data = await response.json();
        if (typeof data.commitCount === "number") {
          setCommitCount(data.commitCount.toLocaleString("pt-BR"));
        }
      } catch {
        // Intencional: mantém fallback local se a API falhar.
      }
    };

    void loadCommitCount();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-2">
            <span className="text-muted-foreground">{'// '}</span>sobre-mim
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Quem é o <span className="gradient-text">Leonardo</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Terminal-style about */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">sobre_mim.md</span>
            </div>

            <div className="p-6 font-mono text-sm leading-relaxed space-y-4">
              <p className="text-muted-foreground">
                <span className="text-primary">{'>'}</span> Olá! Sou o <span className="text-foreground font-medium">Leonardo Fernandes</span>, tenho 20 anos e sou estudante de <span className="text-accent">Engenharia da Computação</span> no 5º semestre na <span className="text-foreground font-medium">Facens</span>.
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">{'>'}</span> Minha jornada na programação começou com curiosidade e vontade de entender como as coisas funcionam por trás das telas. Hoje, estudo por conta própria <span className="text-foreground">Python</span>, <span className="text-foreground">HTML</span>, <span className="text-foreground">CSS</span> e <span className="text-foreground">JavaScript</span>.
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">{'>'}</span> Sou apaixonado por <span className="text-foreground">desenvolvimento web</span> e por praticar <span className="text-foreground">lógica de programação</span>. Gosto de resolver problemas e transformar ideias em código funcional.
              </p>
              <p className="text-muted-foreground">
                <span className="text-primary">{'>'}</span> Meu objetivo? Me tornar um <span className="text-accent">desenvolvedor full-stack</span> e contribuir para projetos que impactam vidas.
              </p>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Interactive Languages Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="rounded-lg border border-border bg-card p-6 text-center card-glow-hover transition-all duration-300 hover:border-primary/30 cursor-pointer relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Code2 className="mx-auto mb-3 text-primary" size={24} />
              <p className="text-2xl font-bold text-foreground">{languages.length}</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">Linguagens</p>
              
              {/* Hover tooltip */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isHovering ? 1 : 0,
                  y: isHovering ? 0 : 8,
                  scale: isHovering ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 pointer-events-none"
              >
                <div className="bg-card border border-primary/30 rounded-lg p-3 shadow-lg shadow-primary/10 min-w-[160px]">
                  <div className="flex flex-col gap-1.5">
                    {languages.map((lang) => (
                      <span key={lang} className="font-mono text-xs text-primary flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="rounded-lg border border-border bg-card p-6 text-center card-glow-hover transition-all duration-300 hover:border-primary/30"
              >
                <stat.icon className="mx-auto mb-3 text-primary" size={24} />
                <p className="text-2xl font-bold text-foreground">
                  {stat.label === "Commits" ? commitCount : stat.value}
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
