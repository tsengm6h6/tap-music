// Control View change
const kickLabels = document.querySelectorAll(`.kick label`)
kickLabels.forEach(label => label.addEventListener('change', () => {
  label.classList.toggle('bg-red-300')
}))

const ClapLabels = document.querySelectorAll(`.clap label`)
ClapLabels.forEach(label => label.addEventListener('change', () => {
  label.classList.toggle('bg-yellow-300')
}))

const SnareLabels = document.querySelectorAll(`.snare label`)
SnareLabels.forEach(label => label.addEventListener('change', () => {
  label.classList.toggle('bg-green-300')
}))

const OpenhatLabels = document.querySelectorAll(`.openhat label`)
OpenhatLabels.forEach(label => label.addEventListener('change', () => {
  label.classList.toggle('bg-blue-300')
}))

const Btn = document.querySelector('button')
Btn.addEventListener('click', () => {
  document.querySelectorAll('button svg').forEach(svg => {
    svg.classList.toggle('hidden')
  })
})


// Control Sound change
window.onload = function () {

  const kick = new Tone.Player("/sounds/kick.wav").toDestination();
  const clap = new Tone.Player("/sounds/clap.wav").toDestination();
  const snare = new Tone.Player("/sounds/snare.wav").toDestination();
  const openhat = new Tone.Player("/sounds/openhat.wav").toDestination();

  let index = 0

  Tone.Transport.scheduleRepeat(repeat, '8n')

  function repeat(time) {
    let step = index % 8 // 每 8 次一輪
    console.log(step)
    let kickInput = document.querySelector(`.kick label:nth-child(${step + 1}) input`) // step 從 0 開始
    if (kickInput.checked) {
      kick.start()
    }

    let clapInput = document.querySelector(`.clap label:nth-child(${step + 1}) input`)
    if (clapInput.checked) {
      clap.start()
    }

    let snareInput = document.querySelector(`.snare label:nth-child(${step + 1}) input`)
    if (snareInput.checked) {
      snare.start()
    }

    let openhatInput = document.querySelector(`.openhat label:nth-child(${step + 1}) input`)
    if (openhatInput.checked) {
      openhat.start()
    }
    index++
  }
}

document.querySelector('button').addEventListener('click', function () {
  if (Tone.context.state !== 'running') {
    Tone.context.resume().then(() => {
      console.log('Playback resumed successfully');
      Tone.Transport.start()
    });
  }
  Tone.Transport.toggle() // If it is started, it will stop it, otherwise it will start the Transport.
});