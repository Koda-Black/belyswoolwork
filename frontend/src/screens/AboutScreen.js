import React from "react";
import { Link } from "react-router-dom";
import data from "../data";
import Newsletter from "../components/Newsletter";

export const AboutScreen = () => {
  return (
    <>
      <section id="page__header" className="about__header">
        <h2>#KnowUs</h2>
        <p>Keep up with our modus operandi</p>
      </section>

      <section id="about__head" className="section-p1">
        <img src="img/about/a6.jpg" alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            praesentium aliquid dolores est voluptas vitae ex dignissimos iste
            asperiores amet. Rem enim velit aliquam dolorum doloremque iure
            molestias ex suscipit? Explicabo praesentium aliquid dolores est
            voluptas vitae ex dignissimos iste asperiores amet. Rem enim velit
            aliquam dolorum doloremque iure molestias ex suscipit?
          </p>

          <abbr title="">
            Create stunning images with as much as little control as you like
            thanks to a choice of Basic and Creative modes.
          </abbr>

          <br />
          <br />

          {/* <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
            Create stunning images with as much as little control as you like
            thanks to a choice of Basic and Creative modes.
          </marquee> */}
        </div>
      </section>

      <section id="about__app" className="section-p1">
        <h1>
          Download Our{" "}
          <Link to="/" className="download-app">
            App
          </Link>
        </h1>
        <div className="video">
          <video autoplay muted loop src="/images/about/1.mp4"></video>
        </div>

        <h2>Coming Soon</h2>
      </section>

      <section id="feature" className="section-p1">
        {data.features.map((feature) => (
          <div className="feature__box" key={feature.title}>
            <img src={feature.image} alt={feature.title} />
            <h6>{feature.title}</h6>
          </div>
        ))}
      </section>

      <Newsletter />
    </>
  );
};
