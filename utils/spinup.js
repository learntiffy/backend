const request = require('request');
const cron = require('node-cron');
const logger = require('./logger');

exports.start = () => {
    cron.schedule('0 */14 * * * *', function () {
        spinup();
    });
}

spinup = () => {
    request.get(
        'https://tiffy-backend-onex.onrender.com/admin/get/area',
        function (error, response, body) {
            logger.info('CRON_JOB');
        }
    );
}