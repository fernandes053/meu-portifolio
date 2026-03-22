import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/fernandes053", user: "@fernandes053" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/leonardo-fernandes-mastroto-63aa7b351/", user: "@Leonardo Fernandes Mastroto" },
  { icon: Mail, label: "Email", href: "mailto:leonardofernandesmastroto@gmail.com", user: "leonardofernandesmastroto@gmail.com" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-card/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-mono text-sm text-primary mb-2">
            <span className="text-muted-foreground">{'// '}</span>contato
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vamos <span className="gradient-text">conversar</span>?
          </h2>
          <p className="text-muted-foreground mb-12">
            Estou aberto a oportunidades de estágio, projetos colaborativos ou apenas trocar uma ideia sobre tecnologia!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card card-glow-hover hover:border-primary/30 transition-all duration-300 group"
            >
              <social.icon className="text-muted-foreground group-hover:text-primary transition-colors" size={28} />
              <span className="font-medium text-foreground">{social.label}</span>
              <span className="font-mono text-xs text-muted-foreground text-center break-all">{social.user}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="mailto:leonardofernandesmastroto@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-mono text-sm font-medium hover:opacity-90 transition-opacity border-glow"
          >
            <Send size={16} />
            Enviar um email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
