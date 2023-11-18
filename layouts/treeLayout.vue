<template>
  <div class="app">
    <header-layout />
 
 
    <main class="main">
      <!-- Nội dung của trang sẽ được hiển thị ở đây -->
      <div class="zoom_outer">
        <div id="zoom">
          <nuxt />
        </div>
      </div>
    </main>
  </div>
 </template>
 
 
 <script>
 import headerLayout from '../components/headerLayout.vue'
 export default {
  components: { headerLayout},
  mounted() {
    let scale = 0.401878
    let panning = false
    let pointX = -19388
    let pointY = -19738.3
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
 }
 </script>
 
 
 <style scoped>
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
 </style>