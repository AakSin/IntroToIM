Live at [https://editor.p5js.org/AakSin/sketches/4MQkx38CE](https://editor.p5js.org/AakSin/sketches/4MQkx38CE)

The project generates 20 fishes in a pond randomly. They have random attributes like color, orientation and size too. On clicking near fishes, they dart away from you. Tap closer to the head for bigger fishes.

# Planning 

I was going through the computer generated art examples provided to us in the start of this class. I stumbled upon a frog pond in [this magazine](http://dada.compart-bremen.de/docUploads/COMPUTER_GRAPHICS_AND_ART_Aug1977.pdf).

<img src="https://i.imgur.com/aQWDnvr.png" width=500>

Here are some sketches I made for what the fishes are going to look like. After this step I set to coding.

<img src="https://i.imgur.com/auaKJdz.jpg" width=500>

# Coding

I created a class called fish. It had properites of 
- X Coordinate
- Y Coordinate
- Color for Each Body Part
- Orientation (whether the fish would swim up or down)

I created methods for them. The methods were for 
- drawing the fishes
- making the fishes move in a curved path (I used the equation of y=x^2 to do so).
- making the fishes dart away from you when you clicked near them 

The last point caused me a lot of challenegse. I finally figured out how to do so by using the mousePressed function. I call the dartAway function on every single fish but it is only triggered if the mouse click was sufficiently near to the fishes. I create a ripple animation on the click, and the ripple makes the fish dart away.

<img src="https://i.gyazo.com/fe2f67bf0549074d350541b0ea61045c.gif" width="600">

# Challenges

I faced a challenge in making the fishes follow a curved path. Using the default y=x^2 equation was making the fishes go too fast. Hence, I divided it by 500. I also faced a challenge in making them dart away when you click near them. I'd also like to make a better ripple animation, currently it's just 3 blue circles.
