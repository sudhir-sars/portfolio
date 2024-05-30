import React from 'react';

const Publications = () => {
  // Define projects and their publications statically
  const projects = [
    {
      name: 'CROPGUARD',
      publications: [
        {
          title: 'An Efficient Diagnostic Approach for Multi-Class Classification of Wheat Leaf Disease Using Deep Transfer and Ensemble Learning',
          description: 'This paper presents an efficient diagnostic approach for multi-class classification of wheat leaf disease using deep transfer and ensemble learning.',
          url: 'https://ieeexplore.ieee.org/abstract/document/10467803?casa_token=GNJufxeUqRcAAAAA:weoRIIKgXphfTbhCkjyn_5ZYnWu_mFKo79fuL08R8v0LVJr3cM66ZISA2vZp2S0fz0OoC2t5HoTI#fig1'
        },
        {
          title: 'A New Diagnostic Approach for the Detection of Wheat Leaf Disease Using Deep Transfer and Ensemble Learning Based Models',
          description: 'This paper proposes a new diagnostic approach for the detection of wheat leaf disease using deep transfer and ensemble learning based models.',
          url: 'https://ieeexplore.ieee.org/abstract/document/10395689?casa_token=KHE8YcH37W4AAAAA:_DzCW-2YHwlQKSmbiU6QzjLhEj8DPhx2sPhCy7I_w3PLXmMcgq0I1tc1D38s65lPj9f3P6AA40tb'
        },
        {
          title: 'A Brief Overview of Deep Learning based Techniques for the Detection of Wheat Leaf Disease',
          description: 'This paper provides a brief overview of deep learning based techniques for the detection of wheat leaf disease.',
          url: 'https://ieeexplore.ieee.org/abstract/document/10142846?casa_token=RbRxSf6AiRsAAAAA:R0CcZZVfHlLPLt7k2tq-TO92FrKMqhBZ1beYMXsQPeKsZfPtfP9DNHtdwAGDv0SIBaabMFPfIuOe'
        }
      ],
    },
    
  ];

  // Render the publications list
  const renderPublications = () => {
    return (
      <div className=' flex text-white mt-16 justify-center'>
        <div>
          <h1 className=" mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-100">Publications</h1>
          <div className='w-[70vw] '>

          {projects.map((project, index) => (
          <div key={index} className="mb-8">
            <h2 className="font-bold text-xl mb-4">{project.name}</h2>
            <div className=" flex flex-col justify-center space-y-4">
              {project.publications.map((publication, idx) => (
                <div key={idx} className="button-primary-without-hover rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">{publication.title}</h3>
                  <p className="text-gray-300">{publication.description}</p>
                  <a href={publication.url} className="block text-blue-600 hover:underline mt-2" target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
              ))}
            </div>
          </div>
        ))}
          </div>
        </div>
        </div>

      
      // <div className='mt-16 text-white'>
      //   <h1 className="font-bold text-3xl mb-6">Publications</h1>
      //   <div className='flex w-[80vw] flex-col justify-center '>
      //   {projects.map((project, index) => (
      //     <div key={index} className="mb-8 flex justify-center">
      //       <h2 className="font-bold text-xl mb-4">{project.name}</h2>
      //       <div className=" flex flex-col justify-center space-y-4">
      //         {project.publications.map((publication, idx) => (
      //           <div key={idx} className="bg-white rounded-lg shadow-md p-6">
      //             <h3 className="font-semibold text-lg mb-2">{publication.title}</h3>
      //             <p className="text-gray-600">{publication.description}</p>
      //             <a href={publication.url} className="block text-blue-600 hover:underline mt-2" target="_blank" rel="noopener noreferrer">Read More</a>
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   ))}
      // </div>
      // </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {renderPublications()}
    </div>
  );
};

export default Publications;
