// 全部名字
let arr = []
// 有效名字
let arrName = []
// 有效序号
let arrRes = []

;$(function () {
    studens.forEach((item) => {
        let arrGroup = []
        item.forEach((it) => {
            arrGroup.push(it.trim())
            if (it.trim() != "") {
                arrName.push(it.trim())
            }
        })
        arr.push(arrGroup)
    })
    arrName.forEach((item, index) => {
        arrRes.push(index)
    })
    console.log(arr)
    console.log(arrName)
    console.log(arrRes)

    createMainTable(arr)
});

// 事件绑定
;$(function () {
    let $btn = $("#main-begin-btn")
    let $timeSelect = $("#main-time-select")
    let $settingBtn = $("#settginBtn")
    let $setDialogSave = $("#setDialogSave")
    let $mainListDialog = $("#main-list-dialog")
    let $nameList = $("#nameList")
    $btn.click(function () {
        // console.log($timeSelect.val())
        if (arrRes.length == 0) {
            return
        }
        const time = $timeSelect.val()
        let selIdx = -1
        let timeId = window.setInterval(function () {
            $(".main-col").removeClass("main-col-active")
            selIdx = genRandom(1, arrRes.length) - 1
            $(`#btn-${arrRes[selIdx]}`).addClass("main-col-active")
        }, time)
        window.setTimeout(function () {
            window.clearInterval(timeId)
            $(".main-col").removeClass("main-col-active")
            $(`#btn-${arrRes[selIdx]}`).addClass("main-col-actived")
            console.log(arrRes[selIdx])
            $("#main-name-list").append($(`<span class="badge badge-success sel-name">${arrName[arrRes[selIdx]]}</span>`))
            $("#modal-name").text(arrName[arrRes[selIdx]])
            $("#selModal").modal('show')
            $nameList.text($nameList.text() + arrName[arrRes[selIdx]] + "\n")
            arrRes.splice(selIdx, 1)
        }, durationTime)
    })
    $settingBtn.click(function () {
        $("#settginsModal").modal("show")
        $("#duratineTimeSet").val(durationTime)
    })
    $setDialogSave.click(function () {
        durationTime = parseInt($("#duratineTimeSet").val())
    })
    $mainListDialog.click(function () {
        $("#nameListModal").modal("show")
    })
});

// 创建table内容
function createMainTable(arr) {
    let idx = 0
    arr.forEach(item => {
        let row = $(`<div class="main-row"></div>`)
        item.forEach(it => {
            if (it.trim() == "") {
                row.append($(`<span class="main-col main-col-empty">${it}</span>`))
            } else {
                row.append($(`<span class="main-col" id="${"btn-" + idx}">${it}</span>`))
                idx++
            }
        })
        $("#main-table").append(row)
    })
}

// 随机数生成
function genRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
