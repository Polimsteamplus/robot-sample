input.onPinPressed(TouchPin.P1, function () {
    high2Now = true
    basic.showIcon(IconNames.Heart)
    strip.showColor(neopixel.rgb(255, 20, 20))
    strip.show()
    pins.servoWritePin(AnalogPin.P14, 55)
    pins.servoWritePin(AnalogPin.P15, 30)
    music.playTone(523, music.beat(BeatFraction.Whole))
    music.rest(music.beat(BeatFraction.Sixteenth))
    music.playTone(523, music.beat(BeatFraction.Quarter))
    pins.servoWritePin(AnalogPin.P14, 40)
    music.playTone(494, music.beat(BeatFraction.Half))
    music.rest(music.beat(BeatFraction.Eighth))
    basic.pause(100)
    music.playTone(523, music.beat(BeatFraction.Eighth))
    pins.servoWritePin(AnalogPin.P14, 105)
    pins.servoWritePin(AnalogPin.P15, 75)
    music.rest(music.beat(BeatFraction.Eighth))
    music.playTone(659, music.beat(BeatFraction.Whole))
    high2Now = false
})
let high2Now = false
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P13, 8, NeoPixelMode.RGB)
let timeSinceHigh2 = input.runningTime()
let timeBetweenAsk4High2 = 20000
// EYES
// Straight = 80
// Left = 105
// Right = 55
// 
pins.servoWritePin(AnalogPin.P14, 80)
// ARM
// Down @ Side = 75
// Up = 20
// 
pins.servoWritePin(AnalogPin.P15, 75)
strip.setBrightness(50)
strip.show()
basic.forever(function () {
    high2Now = false
    pins.servoWritePin(AnalogPin.P14, 80)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    strip.clear()
    strip.show()
    if (input.runningTime() - timeSinceHigh2 > timeBetweenAsk4High2 / 2) {
        basic.showIcon(IconNames.SmallHeart)
        if (input.runningTime() - timeSinceHigh2 > timeBetweenAsk4High2 / 4) {
            basic.showLeds(`
                . # . # .
                # . # . #
                # . . . #
                . # . # .
                . . # . .
                `)
            if (input.runningTime() - timeSinceHigh2 > timeBetweenAsk4High2) {
                timeSinceHigh2 = input.runningTime()
                basic.showLeds(`
                    . . . . .
                    . . . . .
                    . . # . .
                    . . . . .
                    . . . . .
                    `)
                pins.servoWritePin(AnalogPin.P14, 90)
                pins.servoWritePin(AnalogPin.P15, 20)
                basic.pause(500)
                music.setVolume(255)
                for (let index = 0; index < randint(5, 8); index++) {
                    music.setVolume(randint(150, 255))
                    music.playTone(randint(250, 500), music.beat(BeatFraction.Eighth))
                    music.rest(music.beat(BeatFraction.Eighth))
                    strip.showColor(neopixel.rgb(randint(0, 100), randint(0, 100), randint(0, 100)))
                    strip.show()
                }
                music.playTone(523, music.beat(BeatFraction.Eighth))
                while (high2Now == false) {
                    pins.servoWritePin(AnalogPin.P14, 105)
                    basic.showLeds(`
                        . . . . .
                        . . . . .
                        . . # . .
                        . . . . .
                        . . . . .
                        `)
                    basic.pause(500)
                    basic.showLeds(`
                        . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
                        `)
                }
            }
        }
    }
})
