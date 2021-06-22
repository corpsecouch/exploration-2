<template>
  <div id="app">

    <div id="buttons">
      <button v-if="!listening" @click="start" class="start">Start</button>
      <button v-if="listening" @click="stop" class="stop">Stop</button>
    </div>

    <div v-if="error" id="error">
      <div><strong>Error:</strong> {{error.error}}</div>
      <div v-if="error.message">{{error.message}}</div>
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisErrorEvent">{{ error.constructor.name }}</a>
    </div>

    <div id="video">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/u9WHs49nlHk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <div id="transcript">
        <div class="result" v-for="( item, index ) in results" :key="index" :class="{ interim: !item.isFinal }">
          <span v-if="!item.isFinal">
            <span class="word" v-for="( item, index ) in item[0].transcript.split(' ')" :key="index">{{ item }}</span>
          </span>
          <span v-else>{{ item[0].transcript }}</span>
        </div>
    </div>

  </div>
</template>

<script>
import SpeechAPI from './speech'
export default {
  name: 'App',
  data () {
    return {
      api: new SpeechAPI(),
      results: [],
      listening: false,
      error: null
    }
  },
  mounted () {
    this.api.addEventListener('result', this.onResult)
    this.api.addEventListener('error', this.onError)
  },
  methods: {
    onResult () {
      this.results = this.api.results
    },
    onError (event) {
      console.error(event)
      console.log()
      this.error = event
    },
    start () {
      this.api.start()
      this.error = null
      this.listening = true
    },
    stop () {
      this.api.stop()
      this.listening = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1rem;
  width: 50%;
}

#app > div + * {
  margin-top: 1rem;
}

button.start {
  background-color: green;
}

button.stop {
  background-color: red;
}

button {
  cursor: pointer;
  color: white;
  border: none;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
}

button + * {
  margin-left: 1rem;
}

#error {
  background-color: salmon;
  border: 1px red solid;
  padding: 0.5rem;
}

#transcript {
  text-align: left;
  padding-top: 0.5rem;
  border-top: 1px lightgrey dashed
}

#transcript > div {
  display: table;
  margin-top: 0.5rem;
}

#transcript .interim .word {
  background-color: lightyellow;
}

#transcript .word + .word::before {
  content: ' '
}

#transcript > div:first-child {
  margin-top: 0;
}
</style>
