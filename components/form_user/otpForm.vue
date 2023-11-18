<template>
    <div
      class="container height-100 d-flex justify-content-center align-items-center"
    >
      <div class="position-relative">
        <div class="card p-2 text-center">
          <h6>
            Nhập OTP để xác nhận đăng kí!
          </h6>
          <div>
            <span style="color: #999">Mã xác minh đã được gửi đến email của bạn</span>
          </div>
          <div
            id="otp"
            class="inputs d-flex flex-row justify-content-center mt-2"
          >
            <input
              v-for="(input, index) in otpInputs"
              :key="index"
              ref="otpInput"
              v-model="otp[index]"
              class="m-2 text-center form-control rounded"
              :maxlength="1"
              @input="handleInput(index)"
            />
          </div>
          <div class="mt-4">
            <button class="btn btn-success px-4 validate" @click="validateOTP">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
   </template>
   
   
   <script>
   export default {
    data() {
      return {
        otp: ['', '', '', '', '', ''],
        otpInputs: Array.from({ length: 6 }, (_, i) => i + 1),
      }
    },
    mounted() {
      this.OTPInput()
    },
    methods: {
      handleInput(index) {
        if (this.otp[index] !== '' && index !== this.otp.length - 1) {
          this.$refs.otpInput[index + 1].focus()
        }
      },
      validateOTP() {
        const otpValue = this.otp.join('')
        // eslint-disable-next-line no-console
        console.log('Mã OTP đã nhập: ', otpValue)
        // Thêm xử lý validate ở đây
      },
      OTPInput() {
        const inputs = this.$el.querySelectorAll('#otp > *[id]')
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') {
              inputs[i].value = ''
              if (i !== 0) inputs[i - 1].focus()
            } else if (i === inputs.length - 1 && inputs[i].value !== '') {
              return true
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode)
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            }
          })
        }
      },
    },
   }
   </script>
   
   
   <style scoped>
   .height-100 {
    height: 100vh;
   }
   
   
   .card {
    width: 400px;
    border: none;
    height: 300px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
   }
   
   
   .card h6 {
    color: #28a745;
    font-size: 20px;
   }
   
   
   .inputs input {
    width: 40px;
    height: 40px;
   }
   
   
   .form-control:focus {
    box-shadow: none;
    border: 2px solid #28a745;
   }
   
   
   .validate {
    border-radius: 20px;
    height: 40px;
    background-color: #53bb6c;
    border: 1px solid #28a745;
    width: 140px;
   }
   </style>