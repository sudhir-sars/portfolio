import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 flex justify-center ">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-[70%] button-primary-without-hover">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="text-lg mb-6">
          Hi there! I'm a passionate web developer with a keen interest in backend development. I love bringing ideas to life through code and creating engaging digital experiences.
        </p>
        <p className="text-lg mb-6">
          With a background in languages like C++, JavaScript, C, Go and Python, and frameworks like HTML, CSS, Bootstrap, Node.js, and React.js, I enjoy diving into complex challenges and finding elegant solutions.
        </p>
        <p className="text-lg mb-6">
          I thrive in collaborative environments and enjoy working with teams to deliver high-quality software products. My strong problem-solving skills, coupled with effective communication and project management abilities, enable me to contribute effectively to any project.
        </p>
        <p className="text-lg mb-6">
          In my free time, I love to experiment with new technologies, contribute to open-source projects, and continuously expand my knowledge and skills.
        </p>
        <p className="text-lg mb-6">
          Feel free to connect with me on <a href="https://linkedin.com/in/sudhir-sars" target='_blank' className="text-blue-400 hover:underline">LinkedIn</a> or check out my <a href="https://github.com/sudhir-sars" className="text-blue-400 hover:underline">GitHub</a> profile to learn more about my work.
        </p>
        <p className="text-lg mb-6">
          You can also reach me via email at <a href="mailto:sudhir.sars@gmail.com" target='_blank' className="text-blue-400 hover:underline">sudhir.sars@gmail.com</a> or give me a call at <span className="font-semibold">+91-8054881181</span>.
        </p>
        <div className="flex justify-center">
          <a href="/"   className="button-primary px-5 rounded-lg py-2">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default About;
