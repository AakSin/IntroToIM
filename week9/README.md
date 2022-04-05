# Metronome Game
<a href="https://vimeo.com/695983993"> Link to video of working </a>
## Inspiration & Concept

I was practicing with a metronome before working on the project, and when I got to make the project I decided to create a metronome sort of game. The game basically works like this -

The Yellow LED can be controlled by the Potentiometer and it's blinking speed can be increased or decreased

The Green LED can be controlled by the button and pressing the button lights it up

The RED LED lights up when both the Green and Yellow are lit up at the same time

So, the concept of the game is to keep tapping the button in time with the Yellow LED.


## Coding & Challenges

The coding was fairly straightforward for the most part. We had been taught how to use the potentiometer, so I used the value of that as a delay for the yellow LED. Controlling an LED with a button was taught as well. The challenges I encountered were - 

- delay() delays the entire program and that was causing issues in my program. I asked the professor for help with this and she sent me the example code for making an LED blink without delay. It involved counting the difference in milliseconds each time the program is ran.

https://github.com/AakSin/IntroToIM/blob/d58f5a797c1a0ba66065fb40c8fde13cf79bf2b8/week9/Week_9_Assignment.ino#L31-L41

- I wanted to know when both the LEDs were on and I was wondering if there was a way to check the state of an output. Professor then told me to just store it in a variable as I was the one setting the state.

# Learnings & To-Do

I learnt a lot about working with analog and digital inputs. Also creating 3 circuits to run simulataneoulsy on the breadboard was challening too. I still struggle with the physical aspect of Arduino but with this project I have a better understanding of where to connect certain wires.

To-Do:
- Right now, you can hold down the button all the time and the red LED keeps lighting up, hence you can cheat on this game. I am thinking of solutions for this. One I think is calculating the time difference between the last time the button was pressed and the time you are pressing now. If it is withing the range of yellow LED's interval then we can light up the red LED.
