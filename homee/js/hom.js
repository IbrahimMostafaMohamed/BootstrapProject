tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "transparent" },

  particles: {
    number: { value: 150 },
    color: { value: "#ffffff" },

    opacity: {
      value: { min: 0.3, max: 1 },
      animation: {
        enable: true,
        speed: 0.3
      }
    },

    size: {
      value: { min: 1, max: 2 }
    },

    move: {
      enable: true,
      speed: 0.5,
      random: true,
      direction: "none",
      outModes: { default: "out" }
    }
  },

  emitters: [
    {
      direction: "top-right",
      rate: {
        delay: 5,
        quantity: 2
      },
      size: {
        width: 0,
        height: 0
      },
      particles: {
        move: { speed: 25, straight: true },
        size: { value: 2 },
        life: { duration: 2 },
        opacity: { value: 1 }
      }
    }
  ],

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: { repulse: { distance: 100 } }
  },

  detectRetina: true
});