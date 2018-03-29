layui.use('laydate', function () {
    var laydate = layui.laydate;

    //执行一个laydate实例
    // laydate.render({
    //     elem: '#updateDate', //指定元素
    //     done: function (value) {
    //         keyWordsSearch.formData.updateDate = value // 选择日期完成事件,将选择的日期赋值给vue formData对象
    //     }
    // });
    // laydate.render({
    //     elem: '#updateDateEnd', //指定元素
    //     done: function (value) {
    //         keyWordsSearch.formData.updateDateEnd = value // 选择日期完成事件,将选择的日期赋值给vue formData对象
    //     }
    // });
    laydate.render({
        elem: '#fillDate', //指定元素
        // show: true,
        done: function (value) {
            keyWordsSearch.formData.fillDate = value // 选择日期完成事件,将选择的日期赋值给vue formData对象
        }
    });
    laydate.render({
        elem: '#fillDateEnd', //指定元素
        // show: true,
        done: function (value) {
            keyWordsSearch.formData.fillDateEnd = value // 选择日期完成事件,将选择的日期赋值给vue formData对象
        }
    });

});

layui.use('form', function () {
    var form = layui.form;
    form.on('select(integrityLevel)', function (data) {
        // console.log(data.elem); //得到select原始DOM对象
        keyWordsSearch.formData.integrityLevel = keyWordsSearch.levelArr[data.value] //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
    });
});