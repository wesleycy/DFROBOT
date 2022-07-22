naturalScience.microIoT_MQTT_Event(naturalScience.TOPIC.topic_0, function (message) {
	
})
let CO2 = ""
let temp = 0
let F = 0
let C = 0
naturalScience.microIoT_WIFI("Teacher", "MKpc24471924")
naturalScience.microIoT_ThingSpeak_configura("2YEQSIJTGYAWWITN")
DFRobot_DS1307.start()
DFRobot_DS1307.setDataTime(2022, 7, 22, 5, 8, 16, 0)
naturalScience.clearOLEDRow(1)
let beat = 1
basic.forever(function () {
    if (beat == DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND)) {
        beat += 1
        if (beat == 59) {
            beat = 1
        }
        naturalScience.clearOLED(3, 3, 1)
        naturalScience.clearOLED(6, 6, 1)
    } else {
        naturalScience.setOLEDShowString(3, 3, 1, ":")
        naturalScience.setOLEDShowString(6, 6, 1, ":")
    }
    if (DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_HOUR) < 10) {
        naturalScience.setOLEDShowNumber(1, 1, 1, 0)
        naturalScience.setOLEDShowNumber(2, 2, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_HOUR))
    } else {
        naturalScience.setOLEDShowNumber(1, 2, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_HOUR))
    }
    if (DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_MINUTE) < 10) {
        naturalScience.setOLEDShowNumber(4, 4, 1, 0)
        naturalScience.setOLEDShowNumber(5, 5, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_MINUTE))
    } else {
        naturalScience.setOLEDShowNumber(4, 5, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_HOUR))
    }
    if (DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND) < 10) {
        naturalScience.setOLEDShowNumber(7, 7, 1, 0)
        naturalScience.setOLEDShowNumber(8, 8, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND))
    } else {
        naturalScience.setOLEDShowNumber(7, 8, 1, DFRobot_DS1307.getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND))
    }
})
basic.forever(function () {
    naturalScience.requstdata()
    if (naturalScience.getTVOC(CT.CO2) < 500) {
        naturalScience.microIoT_setIndexColor(naturalScience.microIoT_ledRange(1, 4), 0x00ff00)
    }
    if (naturalScience.getTVOC(CT.CO2) > 500 && naturalScience.getTVOC(CT.CO2) < 100) {
        naturalScience.microIoT_setIndexColor(naturalScience.microIoT_ledRange(1, 1), 0xffff00)
    }
    if (naturalScience.getTVOC(CT.CO2) > 1000 && naturalScience.getTVOC(CT.CO2) < 2500) {
        naturalScience.microIoT_setIndexColor(naturalScience.microIoT_ledRange(2, 2), 0xff8000)
    }
    if (naturalScience.getTVOC(CT.CO2) > 2500 && naturalScience.getTVOC(CT.CO2) < 5000) {
        naturalScience.microIoT_setIndexColor(naturalScience.microIoT_ledRange(3, 3), 0xff0000)
    }
    if (naturalScience.getTVOC(CT.CO2) > 5000) {
        naturalScience.microIoT_setIndexColor(naturalScience.microIoT_ledRange(4, 4), 0xff9da5)
    }
})
basic.forever(function () {
    naturalScience.requstdata()
    C = parseFloat(naturalScience.getWatertemp())
    F = Math.trunc(C * 1.8 + 32)
    naturalScience.setOLEDShowNumber(1, 16, 7, C)
    naturalScience.setOLEDShowNumber(1, 16, 8, F)
    naturalScience.setOLEDShowString(6, 16, 7, "C")
    naturalScience.setOLEDShowString(4, 16, 8, "F")
    naturalScience.setOLEDShowString(1, 16, 6, "water temp")
})
basic.forever(function () {
    naturalScience.requstdata()
    naturalScience.setOLEDShowString(1, 16, 2, "" + naturalScience.getTVOC(CT.TVOC) + "TVOC")
})
basic.forever(function () {
    naturalScience.requstdata()
    temp = parseFloat(naturalScience.getBME(BME.TEMP))
    CO2 = convertToText(naturalScience.getTVOC(CT.CO2))
    naturalScience.setOLEDShowString(1, 16, 3, "temp:" + naturalScience.getBME(BME.TEMP) + " c")
    naturalScience.setOLEDShowString(1, 16, 4, "CO2:" + naturalScience.getTVOC(CT.CO2))
    if (temp > 40) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
    }
})
basic.forever(function () {
    naturalScience.requstdata()
    if (DFRobot_DS1307.dataJudgemt(DFRobot_DS1307.TIME.DS1307_REG_SECOND, 0)) {
        naturalScience.clearOLEDRow(1)
        naturalScience.microIoT_http_TK_GET(CO2, naturalScience.getBME(BME.TEMP))
        basic.pause(1000)
    }
    naturalScience.microIoT_showColor(0x000000)
})
