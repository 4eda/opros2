<template>
<div class="blog">
         <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <b-alert show v-if="!end_">
                    <h2>Простой и быстрый опрос</h2>
                    <div>Пройдите его и мы сможем детально рассчитать цену Вашего заказа и сообщить её Вам.</div>
                    <div><strong>Вопрос</strong>: <strong>{{index}}</strong> из <strong>{{totalLength}}</strong></div>
                </b-alert>
                <b-alert show v-else>
                    <h2>Как с Вами связаться?</h2>
                    <div>Заполните данные и мы пришлем приблизительную стоимость наших услуг за выбранные Вами позиции.</div>
                </b-alert>
            </b-col>
        </b-row>
    </b-container>

    <div class="question-box-container">
        <b-jumbotron v-if="showForm===0">
            <template slot="lead">
                {{currentQuestion.question}}
            </template>
            <hr class="my-4">
            <div v-if="currentQuestion.type=='single'">
                <b-list-group
                    v-for="(answer, i) in answers"
                    :key="i"
                    @click="selectAnswer(i)"
                    class="cp"
            >
                <b-form-radio v-model="selected" name="some-radios" :value="answer">{{answer}}</b-form-radio>
            </b-list-group>
            <div :class="setClass()" class="mt-3 selected">

                <!--end if/else
            если ifYes, то должно быть только ДВА ответа!
            Если отвечаем на первый, то срабатывает условие (показываем input, textarea ... )
            Если есть ifYes и текстовое поле нужно вводить
            -->
                <div v-if="currentQuestion.ifYes===true
                &&currentQuestion.ifYesDataType=='textarea'
                &&this.selectedIndex!==null
                &&this.selectedIndex==0"
                >
                    <hr>
                    <div class="tl sml">{{currentQuestion.ifYesDataText}}:</div>
                    <b-form-textarea
                            v-model="text"
                            rows="3"
                            max-rows="6"
                            @input="inputUpdate()"
                    ></b-form-textarea>
                </div>

                <!--Если есть ifYes и input поле нужно вводить-->
                <div
                        v-if="currentQuestion.ifYes===true
                &&currentQuestion.ifYesDataType=='input'
                &&this.selectedIndex!==null
                &&this.selectedIndex==0"
                >
                    <hr>
                    <div class="tl sml">{{currentQuestion.ifYesDataText}}:</div>

                    <b-form-input v-model="text" @input="inputUpdate()" :type="currentQuestion.ifYesDataTypeInput"></b-form-input>

                </div>

                Выбранный Вами вариант: <strong>{{ selected }}</strong></div>
            </div>

            <div v-else>
                <b-list-group
                    v-for="(answer, i) in answers"
                    :key="i"
                    @click="selectAnswer(i)"
                    class="cp"
                >
                    <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
                        <b-form-checkbox :value="answer" @click="variantFunc()">{{answer}}</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-list-group>

                <div :class="setClass()" class="mt-3 selected"><span v-html="variantFunc()"></span></div>
            </div>

            <b-button
                    @click="next(),clearClass()"
                    variant="success"
                    :disabled="isDisabled()"
            >Следующий</b-button>
        </b-jumbotron>
        </div>
    </div>
</template>

<script>

export default {
      props:{
            currentQuestion: Object,
            index: Number,
            totalLength: Number,
            next: Function
        },
        data(){
            return{
                selectedIndex: null,
                selected:'',
                class_:'show',
                disabledBtn:'',
                disabledBtnSend:true,
                variant:'Выбранный Вами вариант',
                userAnsvers:{},
                text:'',
                end_:false,
                error:'',
                ok:'',
                questions:[],
                index:0,
                index2:1,
            }
        },
 mounted: function(){
      fetch('questions.json',{
          method: 'get'
      }).then((response)=>{
          return response.json()
      }).then((jsonData)=>{
          this.questions=jsonData.results
      })
 },
        methods:{
             next(){
        if(this.questions.length!=this.index2){
            this.index++
            this.index2++
        }
             },
            selectAnswer(index){
                this.selectedIndex = index
            },
            setClass(){
                if(this.selected!=''){
                    return this.class_
                }
            },
            inputUpdate(){
                this.userAnsvers[`${this.index}-${this.currentQuestion.ifYes}`]=this.text
            },
            clearClass(){
                /*Add new value to our userAnswers*/
                if(this.index==this.totalLength){
                    this.end_=this.showForm=true
                }
                this.userAnsvers[`${this.index}. ${this.currentQuestion.question}`]=`${this.selected}`
                this.selectedIndex=null
                return  this.selected = this.text=''
            },
            isDisabled(){
                if(this.selected==''){
                    return this.disabledBtn='disabled'
                }
            },
            variantFunc(){
                if(Array.isArray(this.selected)){
                    if(this.selected.length>1){
                        let str=''
                        this.selected.forEach(function(el) {
                            str+=`<li>${el}</li>`;
                        });
                        return this.variant = `Выбранные Вами варианты: <ul style="text-align:left">${str}</ul>`
                    }else{
                        return this.variant = `Выбранный Вами вариант: ${this.selected}`
                    }
                }
            }
            },
        computed:{
            answers(){
                let answers=[...this.currentQuestion.answers]
                return answers
            }
        },
    }
  </script>