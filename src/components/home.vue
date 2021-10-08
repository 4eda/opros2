<template>
  <div class="home">
    <h1>{{title}}</h1>
        <form class="form-signin flex-grow" action="" method="post">
                             <label for="name"  class="sr-only">{{ FirstName }}</label>
                             <input type="text" id="name" name="name" class="form-control mt-2" placeholder="Имя" required="" autofocus="">
                             <label for="family" class="sr-only">{{ TwoName }}</label>
                             <input type="text" id="family" name="family" class="form-control mt-2" placeholder="Фамилия" required="" autofocus="">
                             <label for="Otch" class="sr-only">{{ Otch }}</label>
                             <input type="text" id="Otch" name="Otch" class="form-control mt-2" placeholder="Отчество" required="" autofocus="">
                             <label for="email" class="sr-only">{{ email }}</label>
                             <input type="email" onkeydown="this.style.width = ((this.value.length + 5) * 8) + 'px';" style="min-width: 100%;" id="email" name="email" class="form-control mt-2" placeholder="Email" required="" autofocus="">
                             <label for="Phone" class="sr-only">{{ Phone }}</label>
                             <input type="tel"  id="Phone" name="Phone" class="form-control mt-2" placeholder="Телефон" required="">
                            <div v-if="!isShow1">
                             <button class="btn btn-lg btn-success btn-block mt-2 mb-3" >Отправить</button>
                             </br>
                             </div>
                             <router-link to="/blog"><button class="btn btn-success">Далее</button></router-link>
                            </form>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: 'Home',
      FirstName: 'Введите Имя',
      TwoName: 'Введите Фамилию',
      Otch: 'Введите Отчество',
      email: 'Введите E-Mail',
      Phone: 'Введите номер телефона',
      isShow1: false,
      isShow2: false
      
    }
  },
  methods:{
   isShowText() {
          this.isShow1 = !this.isShow1;
          this.isShow2 = !this.isShow2;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row img{
  max-height: 15em;
  width: 100%;
}
.row h3{
  cursor:pointer;
}
</style>