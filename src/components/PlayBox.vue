<template>
  <div class="page-content">
    <div class="container box-form">
      <div class="frame" id="goal-frame">
        <div class="title">Goal image</div>
        <div class="puzzle">
          <Puzzle
            ref="goalPuzzle"
            :type="1"
            :matrix="goalMatrix"
            :playable="editGoal"
            :active="goalMatrixActive"
          />
        </div>
      </div>
      <div
        class="box-form"
        style="display: flex; justify-content: space-between"
      >
        <!-- <div
                    class="btn btn-icon"
                    @click="changeGoalMatrix"
                    title="Thay đổi ma trận đích"
                >
                    <icon
                        icon="material-symbols:change-circle-outline-rounded"
                        height="25px"
                    />
                </div>
                <div
                    class="btn btn-icon"
                    @click="confirmGoalMatrix"
                    title="Xác nhận ma trận đích"
                >
                    <icon icon="gg:check-o" height="25px" />
                </div> -->
        <div
          class="btn btn-icon"
          @click="sufferStartMatrix"
          title="Tạo ma trận bắt đầu ngẫu nhiên"
        >
          <icon icon="fad:random-1dice" height="25px" />
        </div>
        <div
          class="btn btn-icon"
          @click="selfPickingStart_Fnc"
          title="Tự sắp xếp ma trận ban đầu"
        >
          <icon icon="game-icons:jigsaw-piece" height="25px" />
        </div>
        <div
          class="btn btn-icon"
          @click="confirmDone"
          title="Xác nhận ma trận ban đầu và đích"
        >
          <icon icon="gg:check-o" height="25px" />
        </div>
        <div class="btn btn-icon" @click="cancelPickingMatrix" title="Huỷ">
          <icon icon="game-icons:cancel" height="25px" />
        </div>
        <div
          class="btn btn-icon"
          @click="sufferStartMatrix"
          title="Bắt đầu chơi"
        >
          <icon icon="ion:game-controller" height="25px" />
        </div>
        <div class="btn btn-icon" @click="sufferStartMatrix" title="Sử dụng AI">
          <icon icon="fluent:brain-circuit-20-filled" height="25px" />
        </div>
      </div>
      <div class="frame" id="goal-frame">
        <div class="title">Start image</div>
        <div class="puzzle">
          <Puzzle
            v-if="!selfPickingStart"
            ref="startPuzzle"
            :type="startMatrixType"
            :matrix="startMatrix"
            :playable="playing"
            :active="startMatrixActive"
          />
          <div class="temp-matrix" v-else>
            <div
              v-for="(row, rowIndex) in startMatrix"
              :key="rowIndex"
              class="row"
            >
              <drop
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                @drop="dropEvent($event, rowIndex, cellIndex)"
                mode="cut"
              >
                <drag
                  v-if="cell"
                  :data="cell"
                  @cut="remove(rowIndex, cellIndex)"
                >
                  <Piece :value="cell" :type="1" :size="50" :active="true"
                /></drag>
                <Piece
                  v-else
                  :value="cell"
                  :type="1"
                  :size="50"
                  :active="true"
                />
              </drop>
            </div>
          </div>
        </div>
      </div>
      <div
        class="box-form"
        v-show="selfPickingStart"
        style="display: flex; align-items: center"
      >
        <div class="piece-to-pick">
          <drag
            v-for="(piece, index) in pieceToPick"
            :key="index"
            :data="piece"
            @cut="returnToQueue(piece)"
          >
            <Piece :value="piece" :size="50" :active="true" :type="1" />
          </drag>
        </div>
      </div>
    </div>
    <div class="container box-form"></div>
    <div class="container box-form"></div>
  </div>
</template>

<script>
import Puzzle from './Puzzle.vue'
import Piece from './Piece.vue'
import { Drag, Drop } from 'vue-easy-dnd'

export default {
  components: { Puzzle, Piece, Drag, Drop },
  data() {
    return {
      goalMatrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      startMatrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      pieceToPick: [],
      editGoal: false,
      playing: false,
      selfPickingStart: false,
      goalMatrixActive: false,
      startMatrixActive: false,
      startMatrixType: 1,
      currentPiece: null,
      top: null,
      left: null,
      confirmDonePrepare: false,
      removeapiece: false,
    }
  },
  methods: {
    dropEvent(e, rowIndex, cellIndex) {
      if (this.startMatrix[rowIndex][cellIndex] != 0)
        this.currentPiece = this.startMatrix[rowIndex][cellIndex]
      this.startMatrix[rowIndex][cellIndex] = e.data
    },
    returnToQueue(n) {
      if (this.currentPiece) this.pieceToPick.push(this.currentPiece)
      const index = this.pieceToPick.indexOf(n)
      if (index > -1) {
        this.pieceToPick.splice(index, 1)
      }
      this.currentPiece = null
    },
    remove(rowIndex, cellIndex) {
      if (this.currentPiece)
        this.startMatrix[rowIndex][cellIndex] = this.currentPiece
      else this.startMatrix[rowIndex][cellIndex] = 0
      this.currentPiece = null
      // console.log(this.startMatrix);
    },
    confirmDone() {
      if (this.selfPickingStart) {
        if (this.pieceToPick.length != 1) {
          this.$toast.error('Chưa chọn xong ma trận ban đầu !')
          return
        } else {
          const leftPiece = this.pieceToPick[0]
          //disable this in goal matrix
          for (let i = 0; i < this.goalMatrix.length; i++) {
            for (let j = 0; j < this.goalMatrix[i].length; j++) {
              if (this.goalMatrix[i][j] == leftPiece) {
                this.goalMatrix[i][j] = 0
                break
              }
            }
          }
          this.pieceToPick = []
          this.confirmDonePrepare = true
          this.selfPickingStart = false
        }
      }
    },
    changeGoalMatrix() {
      this.editGoal = true
      this.goalMatrixActive = true
    },
    confirmGoalMatrix() {
      this.editGoal = false
      this.goalMatrix = this.$refs.goalPuzzle.matrix
      this.goalMatrixActive = false
    },
    cancelPickingMatrix() {
      this.selfPickingStart = false
      this.pieceToPick = []
      this.startMatrix = [
        [1, 2, 3],
        [4, 5, 6],
        [0, 7, 8],
      ]
    },
    isCompeleteMatrix(m) {
      //find if matrix not have 0 retrun false
      const fm = m.flat()
      for (let i = 0; i < fm.length; i++) {
        if (fm[i] == 0) {
          return true
        }
      }
      return false
    },
    removeAPiece(n) {},
    sufferStartMatrix() {
      if (this.selfPickingStart) {
        console.log(this.$toast)
        this.$toast.error('Đang sắp xếp ma trận bắt đầu bằng kéo thả !')

        return
      } else if (!this.isCompeleteMatrix(this.startMatrix)) {
        this.$toast.error('Chọn phần lược bỏ trên ma trận bắt đầu !')
        this.startMatrixActive = true
        this.removeapiece = true
        return
      }
      const remain = this.startMatrix.flat()
      this.startMatrix = []
      for (let i = 0; i < 3; i++) {
        this.startMatrix.push([])
        for (let j = 0; j < 3; j++) {
          const index = Math.floor(Math.random() * remain.length)
          this.startMatrix[i].push(remain[index])
          remain.splice(index, 1)
        }
      }
    },
    selfPickingStart_Fnc() {
      this.pieceToPick = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      this.startMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
      this.selfPickingStart = true
    },
    confirmStartMatrix() {
      if (this.pieceToPick.length != 1) return
      this.selfPickingStart = false
      this.startMatrixType = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.piece-to-pick {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}
.page-content {
  display: flex;
  justify-content: space-between;
}
.btn-icon {
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
