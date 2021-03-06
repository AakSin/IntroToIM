Hosted live on [https://aaksin.github.io/IntroToIM/week5/game](https://aaksin.github.io/IntroToIM/week5/game)
# Week 5
## Concepts, Sketches and Ideas

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

## Coding
Most of the coding I have done is just trying to understand all the sound analysis offered by p5.js. I have looked through amplitude analysis, waveform analysis and frequency analysis. The code for my experiments with these 
analysis to the selected song can be found [here](https://github.com/AakSin/IntroToIM/tree/main/week5). I will need some help understanding all this music data and chosing
which points to spawn the planets to in the song (I have the beat drop, the kicks and vocal highs in mind). 
<div>
<img src="https://i.imgur.com/fxYjytT.png" height=500 >
<img src="https://i.imgur.com/qpnmNEl.png" height=500  >
  </div>
    
## To Do
Through office hours, I will first get a thorough understanding of all the music analysis P5 offers. Then i'll code the parameters out on which to spawn the planet.
Before focusing on the art I will focus on making a simple prototype of the game. Then I will start working on the art for the character (I plan on sketching an SVG) and 
writing code for the generative art planets (I plan on using createGraphics and masking for that, unless there exists a simpler way). 

# Week 6 and 7

## Description & Game Play

The game is based on Singaporean songwriter and producer [Yeule](https://en.wikipedia.org/wiki/Yeule). She is floating in space and planets are generated to certain music trigger events. The planets are randomly generated and have random attributes like size, speed, acceleration, y-axis travel distance etc. hence you have to be on your toes all the time. You lose the game if your health drops to 0. You win the game if you survive the entire song. With both of these options you can chose to start again.

## Concept and Art

I realized chosing the music was quintessential for me to proceed with my project. I spent some time listening to tracks that matched the final sketch I had done and finalized [Pocky Boy by Yeule](https://www.youtube.com/watch?v=muCYlrHjg3o).
I started sketching her out based on her outfit and makeup in Serotonin II (the album pocky boy is from). Here's her side by side with a reference pic on Procreate.

<img src="https://i.imgur.com/Cnnpapq.jpg">

The game is titled Glitch Princess after her latest album + the aesthetics she has generated. These aesthetics have inspired my creative prcoess a lot, as I feel like there is no one pushing the boundaries of music, art, video,fashion or production like her



I was also looking to make my own background and here is a version I came up with on procreate. It didn't match the game's color pallete and hence I didn't stick with it.
Instead I went for a coded background that reacts to music.

<img src="https://i.imgur.com/l89qnhD.jpg">

I also wanted to do all of the planet's sprite sheets by myself but then I decided coding them out would be interesting as well. Here's 1 planet that I finished the animation for.

<img src="./assets/asteroid.png">

The rest of the planets that are not coded were downloaded from Deep Fold's pixel planet generator on itch.io. Credits given at the end.

## Coding - challenges and solutions

- One of the main problems was triggering events like the planet generation to music. A lot of time was spent on this step. I had office hours with the professor
regarding this as well. She recommended recording the mids+highs or setting up intervals. I tried both approached and seperately on both .amplitude() and .fft() but
neither worked well. I decided to combine both approaches and that finally worked. The code runs differently for the parts with synths and the parts with drums. Also
the planet generation was being too frequent for the game to be playable, hence I set up a frame count difference so that if the trigger event happened in less than 30
frames, then it would simply skip it.

https://github.com/AakSin/IntroToIM/blob/1b94285b3da6f0c39b9eefe3ad80f54d6c484b6b/week5/game/sketch.js#L113-L150

- Another challenge was getting the planets which are procedurally generated by code to display correctly. This process had a lot of hassles including the planets sometimes
being squares. Sometimes only 1 frame was displayed of the planets. Sometimes the color generation wasn't correct. The optimum approach was found to be mask a createGraphic element.
I soon found out that wasn't possible and hence I applied the solution found [here](https://github.com/processing/p5.js/issues/3900) - creating an image from the graphic each frame and applying the mask to it.

https://github.com/AakSin/IntroToIM/blob/efa10d2c73a20d9cda46b1ac82ac8e04feaaddb3/week5/game/planet.js#L71-L163

- With these 2 major hurdles out of the way, the rest was relatively bug-less. The sprite and planet collision detection was a bit tricky but with the help of
professor and some videos by Dan Schiffman I was able to figure it out.

https://github.com/AakSin/IntroToIM/blob/efa10d2c73a20d9cda46b1ac82ac8e04feaaddb3/week5/game/sketch.js#L165-L171

- The rotation effect on the procedurally generated planets is simply a black smoke code I had written for a previous class overlayed. The gentle noise smoke moving pattern gives the simulation of light rotating on the planet.

https://github.com/AakSin/IntroToIM/blob/efa10d2c73a20d9cda46b1ac82ac8e04feaaddb3/week5/game/planet.js#L91-L99

- The background generated galaxy is a sketch done by Ahmed Moussa (credited at the end). I played around with it and altered it with my variables to make it react to music.

https://github.com/AakSin/IntroToIM/blob/efa10d2c73a20d9cda46b1ac82ac8e04feaaddb3/week5/game/sketch.js#L151-L152

- NOTE: A brief note on the procedurally generated planets: one of the planets is 10 print with a random background. The other planet is smoke I had written for an
assignment to use noise, I just figured out how to randomly color it. The third planet was coded for this game and it basically assigns a random color value to each pixel hence creating this kind of glitch disco ball effect. Snippet linked below.

https://github.com/AakSin/IntroToIM/blob/efa10d2c73a20d9cda46b1ac82ac8e04feaaddb3/week5/game/planet.js#L119-L131

## Learnings



### Art

I learnt a lot about art through this game. This was the first time I have ever painted in my life. I have done some basic sketching here and there but this was the
first art piece done by me (no joke, start to finish, sketching to painting for the first time). I feel like I have a better grasp of that process now especially 
drawing with lighting etc. I explored frame by frame animation on Procreate as well with the 15 frame spritesheet shown above. I learnt the basics and I'd like to explore this more.

### Music Analysis

I spent a lot of time on this process. As you can see in the uploaded files, it contains both amplitude and frequency analysis. I understand the concept of amplitudes, frequencies etc. more meaningfully and especially have a better understanding of extracting meaningful data from music. I have been telling proffesor 
that I had wanted to do a music visualizer for so long, and it was nice to finally get it done.

### OOP (Object Oriented Programming)

I have programmed now for about a decent bit of time but it was always without any formal training. So yes I had learnt about the concept of OOP, modularity, classes etc. but it never sunk in. With this game, I feel like I finally understand how to write more modular code especially using OOP. I feel like I have never used classes at the level I used them at here. Nearly every attribute of the planets were generated randomly and I am very proud of that fact.

## To-Do

- Draw frame by frame animation for Yeule (main character sprite) so that her hair floats, skirt floats, legs kick etc. 
- Add a story line
- Add a better end screen
- Look more into optimization of code
- Add music to home screen
- Make health bar look better
- Add some sort of monsters that maybe you can shoot down or fight
- Remix the music my own way so I can learn more about music production and remixing as well

## Credits

[Ahmed Moussa's p5 sketch of a galaxy](https://editor.p5js.org/AhmadMoussa/sketches/euZJvkj5i)

[Deep Fold's pixel planet generator](https://deep-fold.itch.io/pixel-planet-generator)

Of course, [Pocky Boy by Yeule](https://www.youtube.com/watch?v=muCYlrHjg3o)
