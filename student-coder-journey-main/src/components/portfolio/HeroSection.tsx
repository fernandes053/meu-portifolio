import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const roles = [
  "Estudante de Engenharia da Computação",
  "Desenvolvedor Python",
  "Entusiasta de Desenvolvimento Web",
  "Aprendiz Full-Stack",
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 scanline pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-primary">$</span> whoami
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-body mb-6">
            <span className="text-foreground">Leonardo </span>
            <span className="gradient-text">Fernandes</span>
          </h1>

          <div className="h-8 md:h-10 flex items-center justify-center">
            <span className="font-mono text-lg md:text-xl text-primary text-glow">
              {displayText}
              <span className="animate-blink text-primary">▋</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-muted-foreground max-w-xl mx-auto text-base"
          >
            Transformando café em código desde 2023. Explorando o mundo da tecnologia,
            uma linguagem de cada vez.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#certificates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-opacity border-glow"
            >
              Ver Certificados
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-foreground font-mono text-sm font-medium hover:bg-secondary transition-colors"
            >
              Fale Comigo
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="text-muted-foreground animate-bounce" size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
