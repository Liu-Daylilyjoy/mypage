import SkillsItem from "@/components/common/SkillItem/SkillItem"

const information = {
  name: "Liudy",
  profile: `Hello! I'm Liudy, a first-year postgraduate student with a 
  strong passion for front-end development, web design, and user interaction.`,
  skills: [
    {
      name: "HTML",
      level: 90,
    },
    {
      name: "CSS",
      level: 90,
    },
    {
      name: "JavaScript",
      level: 90,
    },
    {
      name: "React",
      level: 85,
    },
    {
      name: "Git",
      level: 80,
    },
    {
      name: "TypeScript",
      level: 80,
    },
    {
      name: "Next.js",
      level: 90,
    },
    {
      name: "Vue",
      level: 30,
    },
    {
      name: "Minecraft(doge)",
      level: 100,
    }
  ]
}

export default function Home() {
  return (
    <div className="h-[200vh] mx-10 pt-25 flex flex-col">
      <div className="flex flex-col self-center">
        <div className="max-w-3xl my-10 text-6xl">{information.name}</div>
        <div className="max-w-3xl text-xl/loose text-primary/70 text-wrap-balance ">
          <hr />
          <header className="mb-10">
            {information.profile}
          </header>

          <main>
            <h1 className="text-2xl font-bold mb-5">My Skills</h1>
            {information.skills.map((skill) => (
              <SkillsItem key={skill.name} {...skill} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
