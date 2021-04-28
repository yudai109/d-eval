import { auth } from "~/plugins/firebase.js";
import { firestore } from "~/plugins/firebase.js";
import axios from "axios";

export const strict = false;

export const state = () => ({
  user: null,
  username: "",
  useremail: "",
  shops: [
    // { shop_id: "kumiyama", company: "ティーガイア", shopname: "久御山店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nishi_otsu", company: "滋賀テレコム", shopname: "西大津店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "katata", company: "滋賀テレコム", shopname: "堅田店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "shiga_takatsuki", company: "滋賀テレコム", shopname: "滋賀高月店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "imazu", company: "滋賀テレコム", shopname: "今津店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kouga", company: "滋賀テレコム", shopname: "甲賀店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "yasukumogawa", company: "滋賀テレコム", shopname: "安曇川店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ojikoen", company: "ズーム", shopname: "王子公園店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "rokomiti", company: "ITX", shopname: "六甲道店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nishiakashi", company: "ティーガイア", shopname: "西明石店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "mikage_kurasse", company: "ティーガイア", shopname: "御影クラッセ店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nishinomiya_kurakake", company: "ITX", shopname: "西宮鞍掛店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kamikoshien", company: "エムエスケイ", shopname: "上甲子園店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "miki", company: "エムエスケイ", shopname: "三木店（兵庫県）", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "myodani", company: "エムエスケイ", shopname: "名谷店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "hankyu_itami", company: "エムエスケイ", shopname: "阪急伊丹店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "miki_shijimi", company: "ミツワ", shopname: "三木志染店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "takaraduka", company: "ミツワ", shopname: "宝塚店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kawanishi", company: "ミツワ", shopname: "川西店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kawanishi_tada", company: "ミツワ", shopname: "川西多田店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "shin_sanda", company: "ITX", shopname: "新三田店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "sanda_udi_town", company: "ITX", shopname: "三田ウッディタウン店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "okaba", company: "ITX", shopname: "岡場店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "suzurandai", company: "ITX", shopname: "すずらん台店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ion_mol_kobekita", company: "ITX", shopname: "イオンモール神戸北店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "futami", company: "ティーガイア", shopname: "二見店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kobe_haber_land", company: "ティーガイア", shopname: "神戸ハーバーランドｕｍｉｅ店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "akashi", company: "ニッソウ", shopname: "明石店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "minami_awaji", company: "番所自動車工業", shopname: "南あわじ店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "awaji", company: "番所自動車工業", shopname: "淡路店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "sumoto", company: "番所自動車工業", shopname: "洲本店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "suita", company: "エリアマーケティングオフィス", shopname: "吹田店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // {
    //   shop_id: "higashi_umeda", company: "ティーガイア",
    //   shopname: "東梅田店（ｄ ｇａｒｄｅｎ東梅田店）",
    //   pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0
    // },
    // { shop_id: "mino", company: "マイム", shopname: "箕面店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "temkom_bashi", company: "コネクシオ", shopname: "天神橋店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "esaka", company: "ティーガイア", shopname: "江坂店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ibaraki_shinjo", company: "エリアマーケティングオフィス", shopname: "茨木新庄店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ibaraki_ayukawa", company: "エリアマーケティングオフィス", shopname: "茨木鮎川店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "toyonaka", company: "コネクシオ", shopname: "豊中店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nishinakajima", company: "コネクシオ", shopname: "西中島店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "fukae_bashi", company: "コネクシオ", shopname: "深江橋店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kyobashi", company: "コネクシオ", shopname: "京橋店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ibaraki_R171", company: "コネクシオ", shopname: "茨木Ｒ１７１店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "noda_hanashin", company: "コネクシオ", shopname: "野田阪神店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "yao_minami", company: "コネクシオ", shopname: "八尾南店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "yao_taishido", company: "コネクシオ", shopname: "八尾太子堂店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "yao_shiyakusyomae", company: "コネクシオ", shopname: "八尾市役所前店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "fujii_dera", company: "コネクシオ", shopname: "藤井寺店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "matubara", company: "コネクシオ", shopname: "松原店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kisiwada_26gousen", company: "ＴＲ・ＣＯＭ", shopname: "岸和田２６号線店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ario_yao", company: "ティーガイア", shopname: "アリオ八尾店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "izumi_oka", company: "スマートバリュー", shopname: "泉ケ丘店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "koumyo_ike", company: "スマートバリュー", shopname: "光明池店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kishiwada", company: "スマートバリュー", shopname: "岸和田店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nakamozu", company: "スマートバリュー", shopname: "中百舌鳥店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "fukai", company: "スマートバリュー", shopname: "深井店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ario_kaede", company: "スマートバリュー", shopname: "アリオ鳳店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "izumi_tyuo", company: "ダンク", shopname: "和泉中央店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "izumi_otsu", company: "ダンク", shopname: "泉大津駅前店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kongo", company: "兼松コミュニケーションズ", shopname: "金剛店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kadoma", company: "ＴＲ・ＣＯＭ", shopname: "門真店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "neyagawa", company: "コネクシオ", shopname: "寝屋川店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kiri_uriwari", company: "タイホー通信工業", shopname: "喜連瓜破店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "namba_midosuji", company: "ティーガイア", shopname: "なんば御堂筋店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "uemhonmachi", company: "ティーガイア", shopname: "上本町店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "dainichi", company: "ティーガイア", shopname: "大日店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "daito_minami", company: "ティーガイア", shopname: "大東南店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kosaka", company: "ティーガイア", shopname: "小阪店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "ion_dainichi", company: "ITX", shopname: "イオンモール大日店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "biba_neyagawa", company: "兼松コミュニケーションズ", shopname: "ビバモール寝屋川店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "abeno_Qs_mall", company: "コネクシオ", shopname: "あべのキューズモール店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "hirakata_shodai", company: "コネクシオ", shopname: "枚方招提店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kuzuha_ekimae", company: "コネクシオ", shopname: "樟葉駅前店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "yodoyabashi", company: "ティーガイア", shopname: "淀屋橋店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "daito", company: "ドコモＣＳ", shopname: "大東店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "himeji_nishi", company: "光栄自動車整備", shopname: "姫路西店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "takasago", company: "光栄自動車整備", shopname: "高砂店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "himeji_tujii", company: "光栄自動車整備", shopname: "姫路辻井店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kakogawa_meiki", company: "光栄自動車整備", shopname: "加古川明姫店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "kakogawa", company: "光栄自動車整備", shopname: "加古川店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "wadayama", company: "光栄自動車整備", shopname: "和田山店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "toyoka", company: "光栄自動車整備", shopname: "豊岡店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "hamasaka", company: "光栄自動車整備", shopname: "浜坂店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "nankai_shieki", company: "サイバーリンクス", shopname: "南海市駅前店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "tanabe", company: "サイバーリンクス", shopname: "田辺店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "hashimoto", company: "サイバーリンクス", shopname: "橋本店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "hashimoto_ayanodai", company: "サイバーリンクス", shopname: "橋本彩の台店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "iwade", company: "サイバーリンクス", shopname: "岩出店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "katuragi", company: "サイバーリンクス", shopname: "かつらぎ店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "jr_wakayamaeki", company: "サイバーリンクス", shopname: "ＪＲ和歌山駅前店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 },
    // { shop_id: "tanabe_shinjo", company: "レイドック", shopname: "田辺新庄店", pi: 0, hstab:0, migration: 0 ,smtab: 0, dcard_gold:0, dcard_regu:0, hikari_shinki:0, hikari_tenyo:0, hikari_henko:0 }
  ],
  skp_data: [],
  reports: [],
  rows: []
});

// --------------------
// mutation
// --------------------
export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setUserinfo(state, userinfos) {
    state.username = userinfos.username;
    state.useremail = userinfos.useremail;
  },
  skpSetData(state, result_array) {
    result_array.forEach(item => {
      state.rows.push(item);
    });
  },
  setShopsInfo(state, datas) {
    datas.forEach(data => {
      state.shops.push(data);
    });
  },
  setReportData(state, repo_datas) {
    repo_datas.forEach(repo_data => {
      state.reports.push(repo_data);
    });
  },
  editShopInfo(state, edit_data) {
    var index = state.shops.findIndex(el => el.shopname === edit_data.shopname);
    state.shops[index].pi = edit_data.pi;
    state.shops[index].hstab = edit_data.hstab;
    state.shops[index].migration = edit_data.migration;
    state.shops[index].smtab = edit_data.smtab;
    state.shops[index].dcard_gold = edit_data.dcard_gold;
    state.shops[index].dcard_regu = edit_data.dcard_regu;
    state.shops[index].hikari_shinki = edit_data.hikari_shinki;
    state.shops[index].hikari_tenyo = edit_data.hikari_tenyo;
    state.shops[index].hikari_henko = edit_data.hikari_henko;
  },

  editRepoData(state, edit_data) {
    var index = state.reports.findIndex(el => el.doc_id === edit_data.doc_id);
    console.log(index)
    state.reports[index].shop = edit_data.shop;
    state.reports[index].attend = edit_data.attend;
    state.reports[index].sko_type = edit_data.sko_type;
    state.reports[index].username = edit_data.username;
    state.reports[index].activity_repo = edit_data.activity_repo;
    state.reports[index].impression_repo = edit_data.impression_repo;
    state.reports[index].request_repo = edit_data.request_repo;
    state.reports[index].conflict_repo = edit_data.conflict_repo;
  }
};

// --------------------
// actions
// --------------------
export const actions = {
  // 個人レポート情報
  getSkpRepoData() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;
    var current_user = auth().currentUser;
    var skp_repo_col = firestore().collection(
      `users/${current_user.uid}/skp_repo`
    );
    var repo_datas = [];

    skp_repo_col
      .get()
      .then(qs => {
        qs.forEach(doc => {
          var repo_data = {};
          repo_data.doc_id = doc.id;
          repo_data.createdAt = doc.data().createdAt;
          repo_data.shop = doc.data().shop;
          repo_data.attend = doc.data().attend;
          repo_data.skp_type = doc.data().skp_type;
          repo_data.username = doc.data().username;
          repo_data.activity_repo = doc.data().activity_repo;
          repo_data.impression_repo = doc.data().impression_repo;
          repo_data.request_repo = doc.data().request_repo;
          repo_data.conflict_repo = doc.data().conflict_repo;
          repo_datas.push(repo_data);
        });
      })
      .then(() => {
        self.commit("setReportData", repo_datas);
      });
  },

  // 全ショップ情報
  getShopsInfo() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;
    var shopsCol = firestore().collection(`shops`);
    var datas = [];

    shopsCol
      .get()
      .then(qs => {
        qs.forEach(doc => {
          var shops_data = {};
          var MarksDoc = firestore().doc(
            `shops/${doc.id}/${year}_${month}/marks`
          );
          MarksDoc.get().then(el => {
            shops_data.shop_id = el.data().shop_id;
            shops_data.company = el.data().company;
            shops_data.shopname = el.data().shopname;
            shops_data.pi = el.data().pi;
            shops_data.hstab = el.data().hstab;
            shops_data.migration = el.data().migration;
            shops_data.smtab = el.data().smtab;
            shops_data.dcard_gold = el.data().dcard_gold;
            shops_data.dcard_regu = el.data().dcard_regu;
            shops_data.hikari_shinki = el.data().hikari_shinki;
            shops_data.hikari_tenyo = el.data().hikari_tenyo;
            shops_data.hikari_henko = el.data().hikari_henko;
          });
          datas.push(shops_data);
        });
      })
      .then(() => {
        self.commit("setShopsInfo", datas);
      });
  },

  signUp({ email, password }) {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }, { email, password }) {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signOut() {
    return auth().signOut();
  },

  getUserInfo() {
    var self = this;
    var CurrentUser = auth().currentUser;
    var UserDoc = firestore().doc(`users/${CurrentUser.uid}`);

    UserDoc.get().then(function(doc) {
      console.log(doc.data().username);
      var username = doc.data().username;
      var usermail = doc.data().email;

      var userinfos = {
        username: username,
        useremail: usermail
      };
      self.commit("setUserinfo", userinfos);
    });
  },

  async getSkpData() {
    var self = this;
    var result_array = [];
    var _result = await this.$axios.$get(`/api/get_skp_info`);

    _result.forEach(item => {
      var rows_data = {};
      rows_data.id = item[0];
      rows_data.time = item[1];
      rows_data.code = item[2];
      rows_data.tantou = item[3];
      rows_data.area = item[4];
      rows_data.shop = item[5];
      rows_data.shiten = item[6];
      rows_data.adaputer = item[7];
      rows_data.skp_kokyaku = item[8];
      rows_data.package = item[9];
      result_array.push(rows_data);
    });

    await self.commit("skpSetData", result_array);
  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  getShops(state) {
    return state.shops;
  }
};
