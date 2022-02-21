Project hosted live on: [https://editor.p5js.org/AakSin/sketches/_B3RK30Lv](https://editor.p5js.org/AakSin/sketches/_B3RK30Lv)

# Planning

I was inspired by [Aaron Sherwood's website](https://aaron-sherwood.com/). 

<a href="https://gyazo.com/1cc605d867d512a753e10f4f7a0ace4d"><img src="https://i.gyazo.com/1cc605d867d512a753e10f4f7a0ace4d.gif" alt="Image from Gyazo" width="1000"/></a>

# Coding

The coding part was very challenging. I tried solving this issue without using vectors at first. Without vectors, all the particles were moving in the same direction and 
I couldn't get the circle effect I wanted. I then started learning about vectors. All of the tutorials implementing vectors for an attraction-repulsions system involved an 
entire physics system like motion and velocity. I didn't want my particles to be in constant motion thus I didn't engange in that. After many failed attempts with text, I 
decided to go back to basics and tried implementing a vector system with just 2 particles. [Here's the link to the file with vector experiments](https://editor.p5js.org/AakSin/sketches/PW2UD2yys).

[Coding's train video](https://www.youtube.com/watch?v=OAcXnzRNiCY) helped me finally understand that I had to use vector subtraction to get the direction the force between 2 particles was acting on.

I then played around and finally implemented a particle system I was happy with text. I then added random and noise into the program to see the output I would get. I realized it
looked similar to caligraphy and decided to play with a Japanese font. Hence, the project is titled calligraphy. I have included various elements like smooth circle and color size change to 
emulate an actual brush.
<img src="https://i.imgur.com/sTze9FA.png">
<a href="https://gyazo.com/7a099d408aef89c93ff3263e02bfd833"><img src="https://i.gyazo.com/7a099d408aef89c93ff3263e02bfd833.gif" alt="Image from Gyazo" width="414"/></a>
# Todo

- Something I'd like to implement is somehow make the calligraphy look more watery. Maybe I would have to increase the circle size to simulate a droplet effect.
- I'd also like to add an on-click interaction. So that upon clicking on the canvas maybe we get more points there or something (simulating painting with a caligraphy brush).
