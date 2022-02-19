import React from 'react';
import aboutImage from '../../images/image-03.png';

function About() {

  return (
    <section className="about">
      <img src={aboutImage} className="about__image" alt="About" />
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">NewsExplorer was developed by Gilad Tsiprun as the final assignment of the Practicum Web Development Bootcamp,
          using the following technologies: React, Javascript, CSS on the frontend and Node, Experss and MongoDB on the backend.
          As a student in Practicum I worked on assigments with tight schedules, recieved code reviews and refractored my code accordingly,
          made responsive websites using React with integrated API's, both external and internal backend that is connected to a vm.  </p>
      </div>
    </section>
  )
}

export default About;