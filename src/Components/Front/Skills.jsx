import React, { useEffect, useState } from 'react';

const SkillBar = ({ name, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1 ">
      <span>{name.toUpperCase()}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full h-4 rounded-2xl overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-pink-500"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const Skills = () => {
  const [designSkills, setDesignSkills] = useState([]);
  const [devSkills, setDevSkills] = useState([]);

  useEffect(() => {
    fetch('/skills.json')
      .then((res) => res.json())
      .then((data) => {
        setDesignSkills(data.designSkills);
        setDevSkills(data.devSkills);
      })
      .catch((err) => console.error('Failed to fetch skills:', err));
  }, []);

  return (
<div className=" py-12 px-6 sm:px-10 md:px-20">
      <div className="text-pink-500 font-semibold mb-2 md:text-left">Features</div>
      <div className="text-3xl sm:text-4xl font-bold mb-10 md:text-left">Skills Overview</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6 md:text-left">Design Skill</h2>
          {designSkills.map((skill) => (
            <SkillBar key={skill.id} name={skill.name} value={skill.value} />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 md:text-left">Development Skill</h2>
          {devSkills.map((skill) => (
            <SkillBar key={skill.id} name={skill.name} value={skill.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
