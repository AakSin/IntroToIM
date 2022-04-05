// constants won't change. They're used here to set pin numbers:
const int buttonPin = 7;     // the number of the pushbutton pin
const int ledPin =  11;// the number of the LED pin
unsigned long previousMillis = 0;    
const int ledPin2 =  12;
const int ledPin3 =  13;
const int POT = A0;
// variables will change:
int buttonState = 0;
int ledState = LOW;
int led2State = LOW;
void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {

  
  long interval  = analogRead(POT);
  Serial.println(ledState);
Serial.print(led2State);
  // the interval at which you want to blink the LED.
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (led2State == LOW) {
      led2State = HIGH;
    } else {
      led2State = LOW;
    }
  }
    // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED off:
    ledState = LOW;
  } else {
       // turn LED on:
    ledState = HIGH;
 
  }
  digitalWrite(ledPin, ledState);

    // set the LED with the ledState of the variable:
    digitalWrite(ledPin2, led2State);

    if(ledState == HIGH && led2State==HIGH){
      digitalWrite(ledPin3, HIGH);
      
      }else{
        digitalWrite(ledPin3, LOW);
      }

}
