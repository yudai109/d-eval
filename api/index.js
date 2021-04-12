const app = require("express")();
const scraping = require('./scraping.js')


app.get('/get_skp_info', async(req, res) => {
    const summary = await scraping.getSkpData()
    res.send(summary);
});

module.exports = {
    path: "/api/",
    handler: app
};