const app = Vue.createApp({
  data() {
    return {
      monster: 100,
      hero: 100,
      gameOver: false,
      heroTurn: true,
      specialAttack: false,
      stepCount: 0,
      log: []
    }
  },
  watch: {
    stepCount(value) {
      if (value === 5) {
        this.specialAttack = true
        this.stepCount = 0;
      }
    },
    heroTurn(value) {
      if (!value) {
        setTimeout(() => {
          this.attack('toHero')
        }, 2000);
      }
    }
  },
  computed: {
    monsterHealthStyles() {
      return {
        background: this.getHealthLineColor(this.monster),
        width: this.monster + '%'
      };
    },
    heroHealthStyles() {
      return {
        background: this.getHealthLineColor(this.hero),
        width: this.hero + '%'
      };
    },
    gameResult() {
      return {
        text: this.monster <= 0 ? 'You win!' : "You loose!",
        class:  this.monster <= 0 ? 'win' : 'loose'
      }
    }
  },
  methods: {
    logData(personage, action, value) {
      this.log.push({personage, action, value})
    },
    doSpecialAttack() {
      if (this.specialAttack) {
        const points = 20;
        this.monster -= points;
        this.specialAttack = false;
        this.heroTurn = false
        this.logData('player', 'special', points)
      }
    },
    getDamage(value) {
      return Math.floor(Math.random() * value)
    },
    heal() {
      const points = 10
      this.hero += points
      this.stepCount += 1
      if (this.hero >= 100) this.hero = 100;
      this.heroTurn = false
      this.logData('player', 'heal', points)
    },
    attack(toPersonage) {
      if (toPersonage === 'toMonster') {
        const points = this.getDamage(10)
        this.monster -= points;
        this.stepCount += 1
        this.heroTurn = false
        this.logData('player', 'attack', points)
      } else if(toPersonage === 'toHero') {
        const points = this.getDamage(15)
        this.hero -= points;
        this.heroTurn = true
        this.logData('monster', 'attack', points)
      }
      this.checkGameEnd();
    },
    checkGameEnd() {
      if (this.monster <= 0 || this.hero <= 0) {
        this.gameOver = true
      }
    },
    getHealthLineColor(personage) {
      let color;
      if (personage > 70) {
        color = '#00b000'
      } else if (personage <= 70 && personage > 50) {
        color = 'yellow'
      } else if (personage <= 50 && personage > 20) {
        color = "orange"
      } else if (personage <= 20) {
        color = 'red'
      }
      return color
    }
  }
})

app.mount("#app")
