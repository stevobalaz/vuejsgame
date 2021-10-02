function randomAtack(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    atackMonster() {
      this.currentRound++;
      const damage = randomAtack(5, 15);
      this.monsterHealth = this.monsterHealth - damage;
      this.addLogMessage('player', 'atack', 'damage');
      this.atackPlayer();
    },
    atackPlayer() {
      const damage = randomAtack(12, 20);
      this.playerHealth = this.playerHealth - damage;
      this.addLogMessage('monster', 'atack', 'damage');
    },
    specialAttack() {
      this.currentRound++;
      const damage = randomAtack(25, 40);
      this.monsterHealth = this.monsterHealth - damage;
      this.addLogMessage('player', 'special-atack', 'damage');
      this.atackPlayer();
    },
    heal() {
      this.currentRound++;
      const heal = randomAtack(20, 30);
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.addLogMessage('player', 'heal', 'heal');
      this.atackPlayer();
    },
    restartGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrenderGame() {
      this.winner = 'Monster';
      this.logMessages = [];
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'DRAW';
        // DRAW
      } else if (value <= 0) {
        this.winner = 'Monster';
      }
      // PLAYER LOST
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'DRAW';
        // DRAW
      } else if (value <= 0) {
        // MONSTER LOST
        this.winner = 'Player';
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return {
        width: this.monsterHealth + '%',
      };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return {
        width: this.playerHealth + '%',
      };
    },
  },
});

app.mount('#game');
