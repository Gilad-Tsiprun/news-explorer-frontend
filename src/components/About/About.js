import React from 'react';
import aboutImage from '../../images/image-03.png';

function About() {

  return (
    <section className="about">
      <img src={aboutImage} className="about__image" alt="About" />
      <div className="about__text-container">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.

          You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
      </div>
    </section>
  )
}

export default About;