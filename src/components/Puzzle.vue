<template>
  <div :class="type === 1 ? 'type1' : ''">
    <div v-for="(row, rowIndex) in matrix" :key="rowIndex" class="row">
      <Piece
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :value="cell"
        :type="type"
        :size="50"
        :active="active"
        @click="switchCell(rowIndex, cellIndex)"
      />
    </div>
  </div>
</template>

<script>
import Piece from './Piece.vue'

export default {
  props: {
    type: {
      type: Number,
      required: true,
      value: 1,
    },
    matrix: {
      type: Array,
      required: true,
      value: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ],
    },
    playable: {
      type: Boolean,
      required: true,
      value: true,
    },
    active: {
      type: Boolean,
      required: true,
      value: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    switchCell(rowIndex, cellIndex) {
      // Implement the logic to switch the "0" cell with the clicked cell
      if (this.matrix[rowIndex][cellIndex] === 0) return
      if (this.playable === false) return
      if (rowIndex > 0 && this.matrix[rowIndex - 1][cellIndex] === 0) {
        this.matrix[rowIndex - 1][cellIndex] = this.matrix[rowIndex][cellIndex]
        this.matrix[rowIndex][cellIndex] = 0
      } else if (
        rowIndex < this.matrix.length - 1 &&
        this.matrix[rowIndex + 1][cellIndex] === 0
      ) {
        this.matrix[rowIndex + 1][cellIndex] = this.matrix[rowIndex][cellIndex]
        this.matrix[rowIndex][cellIndex] = 0
      } else if (cellIndex > 0 && this.matrix[rowIndex][cellIndex - 1] === 0) {
        this.matrix[rowIndex][cellIndex - 1] = this.matrix[rowIndex][cellIndex]
        this.matrix[rowIndex][cellIndex] = 0
      } else if (
        cellIndex < this.matrix[rowIndex].length - 1 &&
        this.matrix[rowIndex][cellIndex + 1] === 0
      ) {
        this.matrix[rowIndex][cellIndex + 1] = this.matrix[rowIndex][cellIndex]
        this.matrix[rowIndex][cellIndex] = 0
      }
    },
  },
  components: { Piece },
}
</script>

<style lang="scss">
.type1 {
  border: 1px solid #b0b0b0;
  margin-top: 10px;
}
.row {
  display: flex;
}
.empty {
  background-color: #e0e0e0;
  color: #e0e0e0;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #e0e0e0;
  // background-color: $success;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
