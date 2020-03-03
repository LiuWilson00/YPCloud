<template>
  <div class="tweenTest">
    <h1 class="animated bounceIn">Where is jujue</h1>
    <button type="submit" class="submit" @click="clickHandler">
      <span v-if="!load">Write Me</span>
      <span v-if="load">Erase</span>
    </button>

    <button v-on:click="shuffle">Shuffle</button>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>

    <transition-group name="list-complete" tag="p">
      <div v-for="item in items" v-bind:key="item" class="area list-complete-item">
        <transition
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutRight"
        >
          <div class="box" @click="findJuJue(item)" v-if="gameStart"></div>
        </transition>
        <img :src="item==3?icon:crow" class="list-complete-item" />
      </div>
    </transition-group>
    <transition @before-enter="beforeEnter" leave-active-class="animated bounceOutRight">
      <h1 class="juJueMsg" v-if="load">{{juJueMsg}}</h1>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "../../node_modules/animate.css/animate.css";
button {
  margin: 1rem;
}
.box {
  width: 100px;
  height: 100px;
  background-color: dodgerblue;
  position: absolute;
}
#obj {
  position: relative;
  left: 200px;
  top: 20px;
  width: 50px;
  height: 50px;
  background: #6fb936;
  border-radius: 5px;
}
.list-complete-item {
  width: 100px;
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
<script>
import anime from "animejs";
import lodash from "lodash";
import icon from "@/assets/gitpage_icon.png";
import crow from "@/assets/crow.png";

export default {
  name: "WhereIsJuJue",
  data() {
    return {
      juJueMsg: "You Win",
      load: false,
      compolate: false,
      nextNum: 10,
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      juItem: [false, false, true, false, false],
      icon,
      crow,
      gameStart: false
    };
  },
  methods: {
    beforeEnter(el) {
      const vm = this;
      anime({
        targets: el,
        translateX: 250
      });
    },
    enter(el) {},
    clickHandler() {
      this.load = !this.load;
      this.compolate = !this.compolate;
    },
    randomIndex: function() {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++);
    },
    remove: function() {
      this.items.splice(this.randomIndex(), 1);
    },
    shuffle: function() {
      this.gameStart = true;
      this.items = _.shuffle(this.items);
    },
    findJuJue: function(ans) {
      this.gameStart = false;
      if (ans == 3) {
        this.juJueMsg = "You Win";
        this.load = true;
      } else {
        this.juJueMsg = "You lose";
        this.load = true;
      }
    }
  },
  mounted() {}
};
</script>