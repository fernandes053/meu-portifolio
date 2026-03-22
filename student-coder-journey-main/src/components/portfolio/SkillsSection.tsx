import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "Python", level: 55, category: "Linguagens" },
  { name: "HTML / CSS", level: 60, category: "Linguagens" },
  { name: "JavaScript", level: 45, category: "Linguagens" },
  { name: "C++", level: 50, category: "Linguagens" },
  { name: "Dart / Flutter", level: 30, category: "Linguagens" },
  { name: "Git & GitHub", level: 60, category: "Ferramentas" },
  { name: "VS Code", level: 65, category: "Ferramentas" },
  { name: "DevOps (Básico)", level: 35, category: "Ferramentas" },
  { name: "POO", level: 50, category: "Conceitos" },
  { name: "Ponteiros & Memória", level: 45, category: "Conceitos" },
  { name: "Versionamento", level: 60, category: "Conceitos" },
  { name: "REST APIs", level: 35, category: "Conceitos" },
];

const categories = ["Linguagens", "Ferramentas", "Conceitos"];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-1.5">
      <span className="font-mono text-sm text-foreground">{skill.name}</span>
      <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
        }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-card/50 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary mb-2">
            <span className="text-muted-foreground">{'// '}</span>habilidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Stack & <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="font-mono text-sm text-accent mb-6 uppercase tracking-wider">{cat}</h3>
              <div className="space-y-5">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Git commands showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-lg border border-border bg-card overflow-hidden max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">terminal — bash</span>
          </div>
          <div className="p-5 font-mono text-sm space-y-2">
            <p><span className="text-primary">$</span> <span className="text-muted-foreground">git init</span></p>
            <p className="text-terminal-dim">Initialized empty Git repository</p>
            <p><span className="text-primary">$</span> <span className="text-muted-foreground">git add . && git commit -m "feat: meu primeiro projeto"</span></p>
            <p className="text-terminal-dim">[main (root-commit)] feat: meu primeiro projeto</p>
            <p><span className="text-primary">$</span> <span className="text-muted-foreground">git branch -M main</span></p>
            <p><span className="text-primary">$</span> <span className="text-muted-foreground">git push -u origin main</span></p>
            <p className="text-terminal-dim">✓ Everything up to date 🚀</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
