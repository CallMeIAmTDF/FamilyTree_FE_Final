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
      infoPersonFamily: {
        1: {
          data: {
            id: 1,
            parentId: 3,
            info: {
              name: 'Tôi',
              gender: 'male',
            },
            spouseIds: [1],
            groupId: 1,
            side: '',
            rank: 0,
          },
          fatherId: 4,
          motherId: 19,
          siblingIds: [10, 12],
          spousePersonIds: [6],
          childrenIds: [2, 7, 8],
        },
        2: {
          data: {
            id: 2,
            parentId: 1,
            info: {
              name: 'Con 1',
              gender: 'male',
            },
            spouseIds: [2],
            groupId: 2,
            side: '',
            rank: -1,
          },
          fatherId: 1,
          motherId: 6,
          siblingIds: [7, 8],
          spousePersonIds: [3],
          childrenIds: [22],
        },
        3: {
          data: {
            id: 3,
            parentId: null,
            info: {
              name: 'Vợ con 1',
              gender: 'female',
            },
            spouseIds: [2],
            groupId: 2,
            side: '',
            rank: -1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [2],
          childrenIds: [22],
        },
        4: {
          data: {
            id: 4,
            parentId: 4,
            info: {
              name: 'Bố',
              gender: 'male',
            },
            spouseIds: [3],
            groupId: 3,
            side: '0',
            rank: 1,
          },
          fatherId: 5,
          motherId: 15,
          siblingIds: [13],
          spousePersonIds: [19],
          childrenIds: [1, 10, 12],
        },
        5: {
          data: {
            id: 5,
            parentId: null,
            info: {
              name: 'Ông nội',
              gender: 'male',
            },
            spouseIds: [4, 12],
            groupId: 4,
            side: '00',
            rank: 2,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [15, 20],
          childrenIds: [4, 13],
        },
        6: {
          data: {
            id: 6,
            parentId: null,
            info: {
              name: 'Vợ tôi',
              gender: 'female',
            },
            spouseIds: [1],
            groupId: 1,
            side: '',
            rank: 0,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [1],
          childrenIds: [2, 7, 8],
        },
        7: {
          data: {
            id: 7,
            parentId: 1,
            info: {
              name: 'Con 2',
              gender: 'male',
            },
            spouseIds: [5],
            groupId: 5,
            side: '',
            rank: -1,
          },
          fatherId: 1,
          motherId: 6,
          siblingIds: [2, 8],
          spousePersonIds: [],
          childrenIds: [],
        },
        8: {
          data: {
            id: 8,
            parentId: 1,
            info: {
              name: 'Con 3',
              gender: 'female',
            },
            spouseIds: [6],
            groupId: 6,
            side: '',
            rank: -1,
          },
          fatherId: 1,
          motherId: 6,
          siblingIds: [2, 7],
          spousePersonIds: [9],
          childrenIds: [],
        },
        9: {
          data: {
            id: 9,
            parentId: null,
            info: {
              name: 'Chồng con 3',
              gender: 'male',
            },
            spouseIds: [6],
            groupId: 6,
            side: '',
            rank: -1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [8],
          childrenIds: [],
        },
        10: {
          data: {
            id: 10,
            parentId: 3,
            info: {
              name: 'Chị tôi',
              gender: 'female',
            },
            spouseIds: [7, 13],
            groupId: 7,
            side: '',
            rank: 0,
          },
          fatherId: 4,
          motherId: 19,
          siblingIds: [1, 12],
          spousePersonIds: [11, 21],
          childrenIds: [],
        },
        11: {
          data: {
            id: 11,
            parentId: null,
            info: {
              name: 'Chồng chị tôi',
              gender: 'male',
            },
            spouseIds: [7],
            groupId: 7,
            side: '',
            rank: 0,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [10],
          childrenIds: [],
        },
        12: {
          data: {
            id: 12,
            parentId: 3,
            info: {
              name: 'Em gái tôi',
              gender: 'female',
            },
            spouseIds: [8],
            groupId: 8,
            side: '',
            rank: 0,
          },
          fatherId: 4,
          motherId: 19,
          siblingIds: [1, 10],
          spousePersonIds: [],
          childrenIds: [],
        },
        13: {
          data: {
            id: 13,
            parentId: 4,
            info: {
              name: 'Bác trai',
              gender: 'male',
            },
            spouseIds: [9, 10],
            groupId: 9,
            side: '',
            rank: 1,
          },
          fatherId: 5,
          motherId: 15,
          siblingIds: [4],
          spousePersonIds: [14, 16],
          childrenIds: [17],
        },
        14: {
          data: {
            id: 14,
            parentId: null,
            info: {
              name: 'Bác gái',
              gender: 'female',
            },
            spouseIds: [9],
            groupId: 9,
            side: '',
            rank: 1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [13],
          childrenIds: [17],
        },
        15: {
          data: {
            id: 15,
            parentId: null,
            info: {
              name: 'Bà nội',
              gender: 'female',
            },
            spouseIds: [4],
            groupId: 4,
            side: '01',
            rank: 2,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [5],
          childrenIds: [4, 13],
        },
        16: {
          data: {
            id: 16,
            parentId: null,
            info: {
              name: 'Bác gái 2',
              gender: 'female',
            },
            spouseIds: [10],
            groupId: 9,
            side: '',
            rank: 1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [13],
          childrenIds: [],
        },
        17: {
          data: {
            id: 17,
            parentId: 9,
            info: {
              name: 'Con bác',
              gender: 'female',
            },
            spouseIds: [11],
            groupId: 10,
            side: '',
            rank: 1,
          },
          fatherId: 13,
          motherId: 14,
          siblingIds: [],
          spousePersonIds: [18],
          childrenIds: [],
        },
        18: {
          data: {
            id: 18,
            parentId: null,
            info: {
              name: 'Chồng con bác',
              gender: 'male',
            },
            spouseIds: [11],
            groupId: 10,
            side: '',
            rank: 1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [17],
          childrenIds: [],
        },
        19: {
          data: {
            id: 19,
            parentId: null,
            info: {
              name: 'Mẹ',
              gender: 'female',
            },
            spouseIds: [3],
            groupId: 3,
            side: '1',
            rank: 1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [4],
          childrenIds: [1, 10, 12],
        },
        20: {
          data: {
            id: 20,
            parentId: null,
            info: {
              name: 'Bà nội 2',
              gender: 'female',
            },
            spouseIds: [12],
            groupId: 4,
            side: '',
            rank: 2,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [5],
          childrenIds: [],
        },
        21: {
          data: {
            id: 21,
            parentId: null,
            info: {
              name: 'Chồng 2 của chị',
              gender: 'male',
            },
            spouseIds: [13],
            groupId: 7,
            side: '',
            rank: 1,
          },
          fatherId: null,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [10],
          childrenIds: [],
        },
        22: {
          data: {
            id: 22,
            parentId: 2,
            info: {
              name: 'Con con 1',
              gender: 'male',
            },
            spouseIds: [14],
            groupId: 10,
            side: '',
            rank: -2,
          },
          fatherId: 2,
          motherId: 3,
          siblingIds: [],
          spousePersonIds: [],
          childrenIds: [23],
        },
        23: {
          data: {
            id: 23,
            parentId: 14,
            info: {
              name: 'Cháu con 1',
              gender: 'female',
            },
            spouseIds: [15],
            groupId: 11,
            side: '',
            rank: -3,
          },
          fatherId: 22,
          motherId: null,
          siblingIds: [],
          spousePersonIds: [],
          childrenIds: [],
        },
      },

      newData: {},
    }
  },

  computed: {
    familyMembers() {
      return [this.newData]
    },
  },
  mounted() {
    this.newData = this.convertFamilyData(this.infoPersonFamily, 5)
    // eslint-disable-next-line no-console
    console.log({ newData: this.newData })

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
