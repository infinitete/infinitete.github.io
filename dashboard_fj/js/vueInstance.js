const keyWordsSearch = new Vue({
    el: '#keyWordsSearch',
    data: {
        baseURL: 'http://10.99.2.103:8182/rest/',
        listTotal: [], // 请求回来的所有的数据
        meetList: [], //满足搜索条件的数据
        // totalPage: '', // 总页数
        pageSize: 12, // 每页显示的数目 默认12
        curPage: 0, //当前页数
        toPage: '',
        showTable: false,
        categoryMapping: {
            id: '序号',
            XZXDRMC: '企业名称',
            XZXKMC: '事项',
            YXQZ: '日期',
            SJLYDW: '数据来源',
            XKJG: '机关单位',
            LABEL: '数据分类',
            DJZT: '备注'
        },
        formData: {
            name: '',
            category: '',
            integrityLevel: '',
            fillDate: '', //填报时间区间开始
            fillDateEnd: '', //填报时间区间结束
        },
        levelArr: ['年检（审）信息（或定期检验）',
                    '荣誉、表彰信息',
                    '抽查检查信息',
                    '小微企业享受扶持政策信息',
                    '守信“红名单”信息',
                    '信用评价信息',
                    '联合惩戒信息',
                    '行政处罚信息',
                    '行政许可信息',
                    '登记、备案类信息',
                    '失信“黑名单”信息',
                    '行政许可变更信息'],
        // list: []
    },

    methods: {

        addId(list) {
            var arr = []
            list.forEach((item, index) => { // 筛选出来的数据加上序号
                let obj = {}
                Object.assign(obj, {
                    'id': index
                }, item)
                arr.push(obj)
            })
            return arr

        },

        searchBtn() {
            const vm = this;
            const NAME = vm.formData.name;
            const CATEGORY = vm.formData.category;
            const listTotal = vm.listTotal
            const integrityLevel = vm.formData.integrityLevel
            const fillDate = vm.formData.fillDate
            const fillDateEnd = vm.formData.fillDateEnd


            var tmpArr = listTotal
            if (integrityLevel) {
                tmpArr = tmpArr.filter((item, index) => {
                    return item.LABEL == integrityLevel
                })
            }
            if (fillDate) {
                tmpArr = tmpArr.filter((item, index) => {
                    return new Date(item.YXQZ) >= new Date(fillDate)
                })
            }
            if (fillDateEnd) {
                tmpArr = tmpArr.filter((item, index) => {
                    return new Date(item.YXQZ) <= new Date(fillDateEnd)
                })
            }
            if (NAME) {
                 tmpArr = tmpArr.filter((item, index) => {
                    var reg = RegExp(NAME, 'g')
                    return reg.test(item.XZXDRMC)
                })
            }
            tmpArr = vm.addId(tmpArr)

            vm.curPage = 0
            console.log(tmpArr.length)
            vm.meetList = tmpArr
        },

        nextPage() {
            const vm = this
            if (vm.curPage >= vm.totalPage) {
                return
            }
            vm.curPage += 1
        },
        previousPage() {
            const vm = this
            if (vm.curPage == 0) {
                return
            }
            vm.curPage -= 1
        },

        topageEvent() {
            const vm = this
            const toPage = vm.toPage
            if (Number.isNaN(toPage) || toPage < 0 || toPage > vm.totalPage) {
                return
            }
            vm.curPage = Number(toPage) //字符串转为bumber类型
        },

    },

    computed: {
        list() {
            const vm = this
            const curPage = vm.curPage
            const pageSize = vm.pageSize

            const tempList = vm.meetList.slice(curPage * pageSize, (curPage + 1) * pageSize)
            return tempList
        },
        categoryList() {
            const vm = this
            if (vm.meetList.length) {
                const item = vm.meetList[0]

                return Object.keys(item)
            }
            return []
        },
        totalPage() {
            const vm = this
            const meetList = vm.meetList
            const pageSize = vm.pageSize
            return Math.floor(meetList.length / pageSize)
        },
        totalItems() {
            const vm = this
            const meetList = vm.meetList
            return meetList.length

        }
    },

    created() {
        const vm = this
        // axios.get(`${this.baseURL}FJ_14`).then((res) => {
        //     vm.listTotal = res.data.data
        //     vm.meetList = vm.addId(res.data.data)
        //     vm.showTable = true
        // })
        $.getJSON('./json/FJ14.json',function (res) {
            vm.listTotal = [res.data[0]]

            vm.meetList = vm.addId([res.data[0]])
            vm.showTable = true
        })
    },


})
