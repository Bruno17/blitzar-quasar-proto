<template>
  <q-page class="flex flex-center">
    <div>
     <q-btn color="white" text-color="black" label="Standard" @click="getForm()" />
    <blitz-form v-model="formData" :schema="data.schema" />
    </div>
    <div>
      <br><br>
      {{ tabpanel }}
      <br><br>
      {{ formData }}
      <br><br>
      {{data.schema}}
    </div>
  </q-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { api } from 'boot/axios'

// import what you need
import { BlitzForm, BlitzListForm, BlitzTable } from 'blitzar'
// include Blitzar's CSS (kept at minimal and doesn't pollute global scope)
import 'blitzar/dist/style.css'

const schema = [
  {
    id: 'name',
    component: 'q-input',
    outlined: true,
    internalLabels:true,
    label: 'Superhero name',
    subLabel: 'Think of something cool.',
  },
  {
    id: 'powerOrigin',
    label: 'Power origin',
    internalLabels: true,
    subLabel: 'Where does your power come from?',
    // component props:
    component: 'q-select',
    outlined: true,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
  },
]

export default defineComponent({
  name: 'PageIndex',
  components: { BlitzForm, BlitzListForm, BlitzTable },
    setup() {
      const formData = ref({})
      const data = reactive({ schema:[] })
      //data = []
      //data.value = schema
      function test () {
        console.log('testfunction');
      }


      function getForm () {
    api.get('/controllers/form',{
      transformResponse: [function (data) {
        console.log(data)
        data = JSON.parse(data, function(key, value) {
          if (typeof value === "string" &&
            value.startsWith("/function(") &&
            value.endsWith("}/")) {
                value = value.substring(9, value.length - 1);
                console.log(value)
                var string = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
                var func = value.slice(value.indexOf("){") + 2, value.lastIndexOf("}")); 
                if(/\S+/g.test(string)){
                    console.log(string)
                    console.log(func)
                    return (new Function(string,func))

                }else{
                    return (new Function(value.slice(value.indexOf("{") + 1, value.lastIndexOf("}"))));
                }
                
            }
            if (typeof value === "string" &&
            value.startsWith("/String(") &&
            value.endsWith(")/")){
                value = value.substring(8, value.length - 2);
            }
            return value;
        })
        console.log(data)
        return data;
      }]
    })
      .then((response) => {
        //jn = JSON.parse(response.data)
        console.log(response.data);
        data.schema = response.data
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
      }
      onMounted(() => {
        data.schema = schema
      })


      return {
        data,
        schema,
        formData,
        tabpanel: ref('tab1'),
        getForm,
        test
      }
  }

})
</script>
