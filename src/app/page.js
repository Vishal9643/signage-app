
"use client"
import React from "react";
import style from "./page.module.css";
// import videoOfSignage from "./assets/video.mp4"


const Home = () => {
  return (
  

      <div>
        <header className={style.header}>
        
          <div className="overlay"></div>
          <video playsInline autoPlay muted loop>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div className="w-100 text-white">
                <h2 className="display-4">
                  Unleash the Power of Exceptional Signage Solutions from the
                  Leading Signage Manufacturing Company
                </h2>
                <hr style={{ height: "2px" }} />
                <p className="lead mb-0">
                  Welcome to Signage Works, where excellence meets innovation in
                  the world of signage manufacturing. As the premier industry
                  leader, we are dedicated to delivering unmatched signage
                  solutions that captivate audiences and elevate brands to new
                  heights. Our passionate craftsmanship, coupled with our
                  relentless pursuit of quality, sets us apart as the go-to choice
                  for businesses seeking impactful visual communication. Whether
                  you require stunning custom-made signs, awe-inspiring outdoor
                  displays, or sophisticated indoor signage, our expert team
                  combines state-of-the-art technology with artistic brilliance to
                  bring your vision to life. Stand out in today's fiercely
                  competitive marketplace with our tailored solutions that boost
                  brand visibility, evoke emotions, and leave a lasting
                  impression. Partner with us and experience the pinnacle of
                  signage manufacturing excellence, backed by our unwavering
                  commitment to your success.
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="container my-5">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis quam
            minima perspiciatis eos tenetur. Praesentium dolores at quos aperiam
            sed, sint provident consectetur incidunt, nostrum porro earum commodi,
            ex architecto.
          </p>
        </div>
      </div> 
  );
};

export default Home;