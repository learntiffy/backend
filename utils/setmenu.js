const cron = require('node-cron');
const MenuDay = require('../models/MenuDay');
const MenuuDay = require("../data/MenuDay");

exports.start = () => {
    cron.schedule('0 0 0 * * *', function () {
        setmenu();
    });
}

setmenu = async () => {
    menuDay = await MenuDay.find();
    const TODAY_LUNCH = menuDay.find(x => x.day === MenuuDay.TOMO_LUNCH);
    const TODAY_DINNER = menuDay.find(x => x.day === MenuuDay.TODAY_DINNER);
    const TOMO_LUNCH = menuDay.find(x => x.day === MenuuDay.TOMO_LUNCH);
    const TOMO_DINNER = menuDay.find(x => x.day === MenuuDay.TOMO_DINNER);

    TODAY_LUNCH.menu = TOMO_LUNCH.menu;
    TODAY_DINNER.menu = TOMO_DINNER.menu;

    TOMO_LUNCH.isSet = false;
    TOMO_DINNER.isSet = false;

    await TODAY_LUNCH.save();
    await TODAY_DINNER.save();
    await TOMO_LUNCH.save();
    await TOMO_DINNER.save();
}