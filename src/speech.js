'use strict';

const SpeechRecognition = window.SpeechRecgonition || window.webkitSpeechRecognition

export default class SpeechAPI extends SpeechRecognition {
  #isListening = false
  #transcript = ''
  #results = null

  constructor () {
    super()
    this.interimResults = true
    this.continuous = true
    this.debug = false

    this.addEventListener('result', event => {
      //this.log('result', event)

      this.#results = event.results
      this.#transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
    })

    /*
    this.addEventListener('start', () => {
      this.log('start')
    })

    this.addEventListener('end', () => {
      this.log('end')
    })

    this.addEventListener('error', event => {
      this.log('error', event)
    })

    this.addEventListener('audiostart', () => {
      this.log('audiostart')
    })

    this.addEventListener('audioend', () => {
      this.log('audioend')
    })

    this.addEventListener('nomatch', event => {
      this.log('nomatch', event)
    })

    this.addEventListener('soundstart', () => {
      this.log('soundstart')
    })

    this.addEventListener('soundend', () => {
      this.log('soundend')
    })

    this.addEventListener('speechstart', () => {
      this.log('speechstart')
    })

    this.addEventListener('speechend', () => {
      this.log('speechend')
    })
    */

    // throw an error if no interface exists
    //if (!this.#recognitionInterface) throw new Error('No Speech Recognition')

    // create a SpeechRecogntion instance
    //this.#recognitionInstance = new this.#recognitionInterface()
  }

  start () {
    super.start()
    this.#isListening = true
  }

  stop () {
    super.stop()
    this.#isListening = false
  }

  get transcript () { return this.#transcript }

  get results () { return this.#results }

  get isListening () { return this.#isListening }

  /*log (...args) {
    if(this.debug) console.log('SpeechAPI', args)
  }*/
}
