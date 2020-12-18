const axios = require('axios')
require('dotenv').config()


const pick = async function(req,res)  {
  // console.log(encodeURIComponent(req.query.firstJuso))
  await axios
  .get(
    `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.JUSO_NUMBER_KEY}&currentPage=1&countPerPage=10&resultType=json&keyword=${req.query.firstJuso+req.query.nextJuso}`
  )
  .then((Response) => {
    let juso = Response.data.results.juso[0].admCd.substring(0,5)
    axios
    .get(
      `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?ServiceKey=${process.env.REALSTATE_LIST_KEY}&LAWD_CD=${juso}&DEAL_YMD=201512`
    )
    .then((Response) => {
      console.log(Response.data.response.body.items.item)
      res.send(Response.data.response.body.items.item)
    })
    .catch((Error) => {
      console.log(Error);
    });
  });

}

module.exports = pick;