<template>
  <div class="page-content">
    <div class="container box-form">
    <div class="frame" id="goal-frame">
      <div class="title">Goal image</div>
      <div class="puzzle">
        <Puzzle ref="goalPuzzle"
          :type="1"
          :matrix="goalMatrix"
          :playable="editGoal"
          :active="goalMatrixActive"
        />
      </div>
    </div>
    <div class="box-form" style="display: flex; justify-content: space-between;">
      <div class="btn btn-icon" @click="changeGoalMatrix" title="Thay đổi ma trận đích">
        <icon icon="material-symbols:change-circle-outline-rounded" height="25px" />
      </div>
      <div class="btn btn-icon" @click="confirmGoalMatrix" title="Xác nhận ma trận đích">
        <icon icon="gg:check-o" height="25px" />
      </div>
      <div class="btn btn-icon" @click="sufferStartMatrix" title="Tạo ma trận bắt đầu ngẫu nhiên">
        <icon icon="fad:random-1dice" height="25px" />
      </div>
      <div class="btn btn-icon" @click="selfPickingStart_Fnc" title="Tự sắp xếp ma trận ban đầu">
        <icon icon="game-icons:jigsaw-piece" height="25px" />
      </div>
      <div class="btn btn-icon" @click="sufferStartMatrix" title="Bắt đầu chơi">
        <icon icon="ion:game-controller" height="25px" />
      </div>
      <div class="btn btn-icon" @click="sufferStartMatrix" title="Sử dụng AI">
        <icon icon="fluent:brain-circuit-20-filled" height="25px" />
      </div>
    </div>
    <div class="frame" id="goal-frame">
      <div class="title">Start image</div>
      <div class="puzzle">
        <Puzzle ref="startPuzzle"
          :type="1"
          :matrix="startMatrix"
          :playable="playing"
          :active="startMatrixActive"
        />
      </div>
    </div>
    <div class="box-form" v-show="selfPickingStart">
      <div class="btn r-btn btn-icon" @click="confirmStartMatrix" title="Sử dụng AI">
        <icon icon="material-symbols:done-rounded" height="25px" />
      </div>
    </div>
  </div>
  <div class="container box-form"></div>
  <div class="container box-form"></div>
  </div>
</template>

<script>
import Puzzle from './Puzzle.vue';

export default {
  components: { Puzzle },
  data() {
    return {
      goalMatrix: [
        [1,2,3],
        [4,5,6],
        [0,7,8],
      ],
      startMatrix: [
        [1,2,3],
        [4,5,6],
        [0,7,8],
      ],
      editGoal: false,
      playing: false,
      selfPickingStart: false,
      goalMatrixActive: false,
      startMatrixActive: false,
    };
  },
  methods: {
    changeGoalMatrix() {
      this.editGoal = true;
      this.goalMatrixActive = true;
    },
    confirmGoalMatrix() {
      this.editGoal = false;
      this.goalMatrix = this.$refs.goalPuzzle.matrix;
      this.goalMatrixActive = false;
    },
    sufferStartMatrix(){
      this.startMatrix = [];
      const remain = [0,1,2,3,4,5,6,7,8];
      for(let i = 0; i < 3; i++){
        this.startMatrix.push([]);
        for(let j = 0; j < 3; j++){
          const index = Math.floor(Math.random() * remain.length);
          this.startMatrix[i].push(remain[index]);
          remain.splice(index, 1);
        }
      }
    },
    selfPickingStart_Fnc(){
      this.selfPickingStart = true;
    },
    confirmStartMatrix(){
      this.selfPickingStart = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-content{
  display: flex;
  justify-content: space-between;
}
.btn-icon{
  cursor: pointer;
  margin: 0 10px;
  width: 36px;
  height: 36px;
}
#goal-frame {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.container {
  width: 30%;
  min-height: 90vh;
  margin-top: 10px;
  // padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media screen and (min-height: 1000px) {
  .container {
    padding: 40px 20px;
  }
}
</style>
