# Concepts, Sketches and Ideas

<img src="https://i.imgur.com/adZYV7I.jpg" height=700>
<div>
<img src="https://i.imgur.com/esEHLbt.jpg" height=500 >
<img src="https://i.imgur.com/vNQ1f0V.jpg" height=500  >
  </div>
<img src="https://i.imgur.com/ERAAUvx.jpg">

I spent the majority of the time on sketches, ideas and music for the game during the weekend. After a lot of sketching and ideation, I came up with this game concept - 
a character (sketched in the last sketch) floats in space while randomly generated planets spawn to the beat of the music. The character can be controlled by the arrow keys and
the goal of the game is to dodge these randomly spawning planets by floating up and down. The game lasts the duration of the song. If the song finishes, you win the game.
[The song](https://www.youtube.com/watch?v=esjN9TdbzdE) is 4 minutes in length.
    
Some of the initial ideas as you can see in the sketches were a forest with spirits in it, and you had to interact with the spirits to obtain certain points to win the game. I felt it would
just be a lot of dialog, so I decided not to do that. Another idea was a bird rowing a boat and dodging stones that spawn to music. I couldn't find a song I liked for that
so I went with this idea. This gives me a lot of customizability in terms of planet design as well.

# Coding
Most of the coding I have done is just trying to understand all the sound analysis offered by p5.js. I have looked through amplitude analysis, waveform analysis and frequency analysis. The code for my experiments with these 
analysis to the selected song can be found [here](https://github.com/AakSin/IntroToIM/tree/main/week5). I will need some help understanding all this music data and chosing
which points to spawn the planets to in the song (I have the beat drop, the kicks and vocal highs in mind). 
<div>
<img src="https://i.imgur.com/fxYjytT.png" height=500 >
<img src="https://i.imgur.com/qpnmNEl.png" height=500  >
  </div>
    
# To Do
Through office hours, I will first get a thorough understanding of all the music analysis P5 offers. Then i'll code the parameters out on which to spawn the planet.
Before focusing on the art I will focus on making a simple prototype of the game. Then I will start working on the art for the character (I plan on sketching an SVG) and 
writing code for the generative art planets (I plan on using createGraphics and masking for that, unless there exists a simpler way). 
