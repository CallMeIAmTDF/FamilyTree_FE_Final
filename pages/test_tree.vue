<template>
  <div class="zoom_outer">
    <div id="zoom">
      <div id="tree" class="tree">
        <ul>
          <family-member
            v-if="newData.childrens && newData.childrens.length"
            :key="newData.data.id"
            :member="newData"
            :info-person-family="infoPersonFamily"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FamilyMember from '~/components/familyTree/FamilyMember.vue'
//   import groupTree from '~/components/familyTree/groupTree.vue'

export default {
  components: {
    //   groupTree,
    FamilyMember,
  },
  data() {
    return {
      infoPersonFamily: {},
      newData: {},
    }
  },

  computed: {
    familyMembers() {
      return [this.newData]
    },
  },

  created() {
    this.getPersonFamily()
  },

  mounted() {
    this.newData = {}

    let scale = 0.833334
    let panning = false
    let pointX = -41046.9
    let pointY = -41408.2
    let start = { x: 0, y: 0 }

    const zoom = document.getElementById('zoom')

    function setTransform() {
      zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`
    }

    zoom.onmousedown = function (e) {
      e.preventDefault()
      start = { x: e.clientX - pointX, y: e.clientY - pointY }
      panning = true
    }

    zoom.onmouseup = function (e) {
      panning = false
    }

    zoom.onmousemove = function (e) {
      e.preventDefault()
      if (!panning) {
        return
      }
      pointX = e.clientX - start.x
      pointY = e.clientY - start.y
      setTransform()
    }

    zoom.onwheel = function (e) {
      e.preventDefault()
      const xs = (e.clientX - pointX) / scale
      const ys = (e.clientY - pointY) / scale
      const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
      if (delta < 0 && scale <= 0.0778866) {
        return
      }
      if (delta > 0 && scale >= 1) {
        return
      }
      if (delta > 0) {
        scale *= 1.2
      } else {
        scale /= 1.2
      }
      pointX = e.clientX - xs * scale
      pointY = e.clientY - ys * scale
      setTransform()
    }

    window.addEventListener('load', () => {
      pointX += 1
      setTransform()
    })
  },
  
  methods: {
    async getPersonFamily() {
      try {
        const res = await this.$axios.get(
          'http://localhost:8080/familyTree/getDataV2?pid=47'
        )

        this.infoPersonFamily = res.data.data

        this.newData = this.convertFamilyData(this.infoPersonFamily, 65)
        // eslint-disable-next-line no-console
        console.log({ newData: this.newData })
        // eslint-disable-next-line no-console
        console.log(this.infoPersonFamily)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    convertFamilyData(data, personId) {
      const person = data[personId]
      const result = {
        data: person.data,
        spouses: [],
        childrens: [],
      }

      if (person.spousePersonIds.length > 0) {
        person.spousePersonIds.forEach((spouseId) => {
          const spouse = data[spouseId]
          result.spouses.push(spouse)
        })
      }

      if (person.childrenIds.length > 0) {
        person.childrenIds.forEach((childId) => {
          const child = data[childId]
          const childObj = {
            data: child,
            spouses: [],
            childrens: [],
          }

          if (child.spousePersonIds.length > 0) {
            child.spousePersonIds.forEach((childSpouseId) => {
              const childSpouse = data[childSpouseId]
              childObj.spouses.push(childSpouse)
            })
          }

          if (child.childrenIds.length > 0) {
            const grandchildren = child.childrenIds.map((grandchildId) => {
              return this.convertFamilyData(data, grandchildId)
            })
            childObj.childrens = grandchildren
          }

          result.childrens.push(childObj)
        })
      }

      return result
    },
  },
}
</script>
<style scoped>
:root {
  --height-line: 100px;
}

* {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* --------------------------- Zoom and drag --------------------------- */
.main {
  padding: 0;
  margin: 0;
  outline: 0;
  overflow: hidden;
}

#zoom {
  margin: auto;
  transform: translateY(-50%);
  transform-origin: 0px 0px;
  cursor: grab;
  background: #fff1dc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  width: 100000px;
  height: 100000px;
}

.zoom_outer {
  flex: 1 1 auto;
  background: #000;
}

/* --------------------------- tree --------------------------- */

.tree ul {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: var(--height-line);

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: var(--height-line) 5px 0 5px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 2px solid black;
  width: 100%;
  height: var(--height-line);
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 2px solid black;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/
.tree li:only-child {
  padding-top: 0;
}

/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}

/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before {
  border-right: 2px solid black;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 2px solid black;
  width: 0;
  height: var(--height-line);
}

/* --------------------------- Person --------------------------- */
.group {
  display: inline-flex;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.item ~ .item {
  padding-left: 36px;
}

.person {
  width: 200px;
  height: 350px;
  border-radius: 4px;

  font-size: 48px;
  font-weight: bold;
  text-align: center;
}

.person:hover {
  background-color: yellow !important;
}

.person ~ .person {
  margin-left: 4px;
}

.person.male {
  border: 2px solid blue;
  color: blue;
  background-color: #0000ff45;
}

.person.female {
  border: 2px solid red;
  color: red;
  background: #ff000036;
}
</style>
