/**
 * This is the sightseeings dataset for CHINADLE.
 *
 * https://github.com/z0gSh1u/chinadle
 */

// prettier-ignore
type ChinaProvinceOrCity =
  | '北京市'  | '广东省'
  | '山东省'  | '江苏省'
  | '河南省'  | '上海市'
  | '河北省'  | '浙江省'
  | '香港特别行政区'
  | '陕西省'  | '湖南省'
  | '重庆市'  | '福建省'
  | '天津市'  | '云南省'
  | '四川省'  | '广西壮族自治区'
  | '安徽省'  | '海南省'
  | '江西省'  | '湖北省'
  | '山西省'  | '辽宁省'
  | '黑龙江'  | '内蒙古自治区'
  | '澳门特别行政区'
  | '贵州省'  | '甘肃省'
  | '青海省'  | '新疆维吾尔自治区'
  | '西藏自治区'  | '吉林省'
  | '宁夏回族自治区'
  | '台湾'

export interface Sight {
  name: string
  coord: {
    lon: number
    lat: number
  }
  belong: ChinaProvinceOrCity
  brief: string
}

function makeSight(
  name: string,
  coord: string,
  belong: ChinaProvinceOrCity,
  brief: string
) {
  const _coord = coord.split(',').map(parseFloat)
  return {
    name,
    coord: {
      lon: _coord[0],
      lat: _coord[1],
    },
    belong,
    brief,
  } as Sight
}

export const ChinaSights: Sight[] = [
  makeSight(
    '泰山',
    '117.094738,36.269893',
    '山东省',
    '“直通帝座”的天堂，百姓崇拜，帝王告祭的神山。'
  ),

  makeSight(
    '黄山',
    '118.168089,30.13039',
    '安徽省',
    '被联合国教科文组织公布为世界地质公园。'
  ),

  makeSight(
    '长白山',
    '128.083986,42.066898',
    '吉林省',
    '中国满族的发祥地和满族文化圣山。'
  ),

  makeSight(
    '日月潭',
    '120.911881,23.854467',
    '台湾',
    '北半湖形状如圆日，南半湖形状如弯月。'
  ),

  makeSight(
    '故宫',
    '116.403414,39.924091',
    '北京市',
    '明清两代的皇家宫殿，旧称紫禁城。'
  ),

  makeSight(
    '黄鹤楼',
    '114.309043,30.550317',
    '湖北省',
    '因唐代诗人崔颢登楼所题《黄鹤楼》一诗而名扬四海。'
  ),

  makeSight(
    '黄果树瀑布',
    '105.679142,25.985778',
    '贵州省',
    '世界上最大的瀑布群'
  ),

  makeSight('秦始皇兵马俑', '109.2851,34.389417', '陕西省', '世界第八大奇迹'),

  makeSight(
    '武夷山',
    '117.963042,27.668108',
    '福建省',
    '典型的丹霞地貌，《世界遗产名录》'
  ),

  makeSight(
    '九寨沟',
    '103.921224,33.163223',
    '四川省',
    '中国第一个以保护自然风景为主要目的的自然保护区'
  ),

  makeSight(
    '布达拉宫',
    '91.125038,29.660346',
    '西藏自治区',
    '吐蕃王朝赞普松赞干布为迎娶文成公主而兴建。'
  ),

  makeSight(
    '武夷山',
    '117.963042,27.668108',
    '福建省',
    '典型的丹霞地貌，《世界遗产名录》。'
  ),

  makeSight(
    '东方明珠',
    '121.506379,31.245414',
    '上海市',
    '集都市观光、时尚餐饮、购物娱乐、历史陈列、浦江游览、会展演出、广播电视发射等多功能于一体的上海市标志性建筑之一。'
  ),

  makeSight(
    '井冈山',
    '114.143789,26.636167',
    '江西省',
    '开创了中国第一个农村革命根据地。'
  ),
]
