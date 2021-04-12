import { auth } from '~/plugins/firebase.js'
import { firestore } from '~/plugins/firebase.js'
import axios from 'axios'


export const strict = false

export const state = () => ({
    user: null,
    username: "",
    useremail: "",
    shops: [
        {"company":"ティーガイア", "shopname":"久御山店"},
        {"company":"滋賀テレコム", "shopname":"西大津店"},
        {"company":"滋賀テレコム", "shopname":"堅田店"},
        {"company":"滋賀テレコム", "shopname":"滋賀高月店"},
        {"company":"滋賀テレコム", "shopname":"今津店"},
        {"company":"滋賀テレコム", "shopname":"甲賀店"},
        {"company":"滋賀テレコム", "shopname":"安曇川店"},
        {"company":"ズーム", "shopname":"王子公園店"},
        {"company":"ＩＴＸ", "shopname":"六甲道店"},
        {"company":"ティーガイア", "shopname":"西明石店"},
        {"company":"ティーガイア", "shopname":"御影クラッセ店"},
        {"company":"ＩＴＸ", "shopname":"西宮鞍掛店"},
        {"company":"エムエスケイ", "shopname":"上甲子園店"},
        {"company":"エムエスケイ", "shopname":"三木店（兵庫県）"},
        {"company":"エムエスケイ", "shopname":"名谷店"},
        {"company":"エムエスケイ", "shopname":"阪急伊丹店"},
        {"company":"ミツワ", "shopname":"三木志染店"},
        {"company":"ミツワ", "shopname":"宝塚店"},
        {"company":"ミツワ", "shopname":"川西店"},
        {"company":"ミツワ", "shopname":"川西多田店"},
        {"company":"ＩＴＸ", "shopname":"新三田店"},
        {"company":"ＩＴＸ", "shopname":"三田ウッディタウン店"},
        {"company":"ＩＴＸ", "shopname":"岡場店"},
        {"company":"ＩＴＸ", "shopname":"すずらん台店"},
        {"company":"ＩＴＸ", "shopname":"イオンモール神戸北店"},
        {"company":"ティーガイア", "shopname":"二見店"},
        {"company":"ティーガイア", "shopname":"神戸ハーバーランドｕｍｉｅ店"},
        {"company":"ニッソウ", "shopname":"明石店"},
        {"company":"番所自動車工業", "shopname":"南あわじ店"},
        {"company":"番所自動車工業", "shopname":"淡路店"},
        {"company":"番所自動車工業", "shopname":"洲本店"},
        {"company":"エリアマーケティングオフィス", "shopname":"吹田店"},
        {"company":"ティーガイア", "shopname":"東梅田店（ｄ　ｇａｒｄｅｎ東梅田店）"},
        {"company":"マイム", "shopname":"箕面店"},
        {"company":"コネクシオ", "shopname":"天神橋店"},
        {"company":"ティーガイア", "shopname":"江坂店"},
        {"company":"エリアマーケティングオフィス", "shopname":"茨木新庄店"},
        {"company":"エリアマーケティングオフィス", "shopname":"茨木鮎川店"},
        {"company":"コネクシオ", "shopname":"豊中店"},
        {"company":"コネクシオ", "shopname":"西中島店"},
        {"company":"コネクシオ", "shopname":"深江橋店"},
        {"company":"コネクシオ", "shopname":"京橋店"},
        {"company":"コネクシオ", "shopname":"茨木Ｒ１７１店"},
        {"company":"コネクシオ", "shopname":"野田阪神店"},
        {"company":"コネクシオ", "shopname":"八尾南店"},
        {"company":"コネクシオ", "shopname":"八尾太子堂店"},
        {"company":"コネクシオ", "shopname":"八尾市役所前店"},
        {"company":"コネクシオ", "shopname":"藤井寺店"},
        {"company":"コネクシオ", "shopname":"松原店"},
        {"company":"ＴＲ・ＣＯＭ", "shopname":"岸和田２６号線店"},
        {"company":"ティーガイア", "shopname":"アリオ八尾店"},
        {"company":"スマートバリュー", "shopname":"泉ケ丘店"},
        {"company":"スマートバリュー", "shopname":"光明池店"},
        {"company":"スマートバリュー", "shopname":"岸和田店"},
        {"company":"スマートバリュー", "shopname":"中百舌鳥店"},
        {"company":"スマートバリュー", "shopname":"深井店"},
        {"company":"スマートバリュー", "shopname":"アリオ鳳店"},
        {"company":"ダンク", "shopname":"和泉中央店"},
        {"company":"ダンク", "shopname":"泉大津駅前店"},
        {"company":"兼松コミュニケーションズ", "shopname":"金剛店"},
        {"company":"ＴＲ・ＣＯＭ", "shopname":"門真店"},
        {"company":"コネクシオ", "shopname":"寝屋川店"},
        {"company":"タイホー通信工業", "shopname":"喜連瓜破店"},
        {"company":"ティーガイア", "shopname":"なんば御堂筋店"},
        {"company":"ティーガイア", "shopname":"上本町店"},
        {"company":"ティーガイア", "shopname":"大日店"},
        {"company":"ティーガイア", "shopname":"大東南店"},
        {"company":"ティーガイア", "shopname":"小阪店"},
        {"company":"ＩＴＸ", "shopname":"イオンモール大日店"},
        {"company":"兼松コミュニケーションズ", "shopname":"ビバモール寝屋川店"},
        {"company":"コネクシオ", "shopname":"あべのキューズモール店"},
        {"company":"コネクシオ", "shopname":"枚方招提店"},
        {"company":"コネクシオ", "shopname":"樟葉駅前店"},
        {"company":"ティーガイア", "shopname":"淀屋橋店"},
        {"company":"ドコモＣＳ", "shopname":"大東店"},
        {"company":"光栄自動車整備", "shopname":"姫路西店"},
        {"company":"光栄自動車整備", "shopname":"高砂店"},
        {"company":"光栄自動車整備", "shopname":"姫路辻井店"},
        {"company":"光栄自動車整備", "shopname":"加古川明姫店"},
        {"company":"光栄自動車整備", "shopname":"加古川店"},
        {"company":"光栄自動車整備", "shopname":"和田山店"},
        {"company":"光栄自動車整備", "shopname":"豊岡店"},
        {"company":"光栄自動車整備", "shopname":"浜坂店"},
        {"company":"サイバーリンクス", "shopname":"南海市駅前店"},
        {"company":"サイバーリンクス", "shopname":"田辺店"},
        {"company":"サイバーリンクス", "shopname":"橋本店"},
        {"company":"サイバーリンクス", "shopname":"橋本彩の台店"},
        {"company":"サイバーリンクス", "shopname":"岩出店"},
        {"company":"サイバーリンクス", "shopname":"かつらぎ店"},
        {"company":"サイバーリンクス", "shopname":"ＪＲ和歌山駅前店"},
        {"company":"レイドック", "shopname":"田辺新庄店"},
    ],
    skp_data:[],
    rows:[],

})

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    },
    setUserinfo(state, userinfos) {
        state.username = userinfos.username
        state.useremail = userinfos.useremail
    },
    skpSetData(state, result_array) {
        result_array.forEach((item) => {
            console.log(item)
            state.rows.push(item)
        })
    }
 }

export const actions = {
    signUp({ commit }, { email, password }) {
        return auth().createUserWithEmailAndPassword(email, password)
    },

    signInWithEmail({ commit }, { email, password }) {
        return auth().signInWithEmailAndPassword(email, password)
    },

    signOut() {
        return auth().signOut()
    },

    getUserInfo() {
        var self = this;
        var CurrentUser = auth().currentUser
        var UserDoc = firestore().doc(`users/${CurrentUser.uid}`)

        UserDoc.get().then(function(doc) {
            console.log(doc.data().username)
            var username = doc.data().username
            var usermail = doc.data().email

            var userinfos = {
                "username": username,
                "useremail": usermail,
            }

            self.commit('setUserinfo', userinfos)
        })
    },

    async getSkpData() {
        var self = this;
        var result_array = [];
        var _result = await this.$axios.$get("/api/get_skp_info");
        // 先頭３行削除
        // _result.shift()
        // _result.shift()
        // _result.shift()
        // _result.pop()
        // _result.pop()
        // _result.pop()
        
        
        _result.forEach((item) => {
            var ROWS_DATA = {};
            ROWS_DATA.id = item[0];
            ROWS_DATA.time = item[1];
            ROWS_DATA.code = item[2];
            ROWS_DATA.tantou = item[3];
            ROWS_DATA.area = item[4];
            ROWS_DATA.shop = item[5];
            ROWS_DATA.shiten = item[6];
            ROWS_DATA.adaputer = item[7];
            ROWS_DATA.skp_kokyaku = item[8];
            ROWS_DATA.package = item[9];
            console.log(ROWS_DATA)
            result_array.push(ROWS_DATA);
        })
        
        console.log(result_array)
        await self.commit('skpSetData', result_array)
    },



}

export const getters = {
    user(state){
        return state.user
    },
    isAuthenticated (state) {
        return !!state.user
    },
    getShops(state) {
        return state.shops
    },
}
