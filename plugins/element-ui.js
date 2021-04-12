import Vue from 'vue'

// ElementUI
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'

// vue-json-to-csv
import VueJsonToCsv from "vue-json-to-csv";

// vSelect セレクトボックス
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'; 

// vue-good-tabele
    import VueGoodTablePlugin from 'vue-good-table';
    // import the styles
    import 'vue-good-table/dist/vue-good-table.css'



Vue.use(ElementUI, { locale })
    .use(VueGoodTablePlugin)
    .component('v-select', vSelect)
    .component('vue-json-to-csv', VueJsonToCsv)