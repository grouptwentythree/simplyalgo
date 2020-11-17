import React from 'react';
import './Title.css';
import image from './simplyimg.png';
import testImage from './testimage.png';
import trains from './trains.png'
import cta from './cta.png'

export default function Title() {
    return (
<div>
  <section class="coloured-section" id="title">
    <div class="container-fluid">

    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="">SimplyAlgo</a>
      </nav>


    <div class="row">
      <div class="col-lg-6">
        <h1 class="big-heading">Trading Reimagined: designed for your financial success </h1>
        <button type="button" class="btn btn-dark btn-lg btn-block getstarted-button">Get Started</button>
      </div>
      <div class="col-lg-6">
        <img class="title-image" src={image} alt="iphone-mockup"></img>
      </div>
    </div>

    </div>
  </section>


  <section class="white-section" id="features">
    <div class="container-features">

      <div class="feature-firstrow">
         <div class="feature-item">
          <img src={testImage} alt="image" class="feature-image"></img>
         </div>
        <div class="feature-item">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Morbi consectetur urna non ex vestibulum, eleifend tristique ligula ullamcorper. Nullam fermentum, 
          augue et volutpat mattis, libero sem posuere ante, id interdum dui urna sed elit. Etiam facilisis quam 
          at auctor ullamcorper. Duis viverra blandit posuere. Nam maximus lacinia ante, ac ultrices ex tincidunt eu.</p>
        </div>
      </div>

      <div class="feature-row">
        <div class="feature-item">
        <h2>World class systems keep you connected</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at porta ex, 
          ac dapibus diam. Mauris at quam libero. Ut a turpis sit amet diam pellentesque lacinia.
           Nullam vel sem lectus. In quis arcu nec orci tristique tempus in eu metus. In maximus ut nunc elementum lacinia. 
           Cras porttitor blandit posuere.</p>
        </div>
        <div class="feature-item">
          <img src={trains} alt="image" class="feature-imageT"></img>
         </div>
      </div>

      <div class="feature-row">

      </div>

    </div>
  </section>

  <section class="green-section" id="join">
  <div class="container-cta">
     <div class="cta">
      <div class="feature-item">
          <img src={cta} alt="image" class="feature-image"></img>
         </div>
        <div class="feature-cta">
        <h2>This is your year</h2>
        <p class="cta-text">Morbi consectetur urna non ex vestibulum, eleifend tristique ligula ullamcorper. Nullam fermentum, 
          augue et volutpat mattis, libero sem posuere ante, id interdum dui urna sed elit. Etiam facilisis quam 
          at auctor ullamcorper. Duis viverra blandit posuere. Nam maximus lacinia ante, ac ultrices ex tincidunt eu.</p>
        
        </div>
     </div>
   </div>
  </section>

  <section class="white-section">
     <div class="container-fluid">
     <h2 class="faq-header">FAQs</h2>
     <div>
       
     </div>

     </div>
   </section>

   <section class="footer-section">
     <div class="container-footer">
       <p>© 2020 SimplyAlgo</p>
       <p>Made with 💖 by Alex, David, and Kevin</p>
     </div>
   </section>

</div> 
    );
}