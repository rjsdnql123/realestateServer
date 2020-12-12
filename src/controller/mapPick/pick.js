const axios = require('axios')
require('dotenv').config()

console.log(process.env.REALSTATE_LIST_KEY,'exv')
const pick = async function(req,res)  {
  axios
  .get(
    `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.JUSO_NUMBER_KEY}&currentPage=1&countPerPage=10&resultType=json&keyword=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%A7%88%ED%8F%AC%EA%B5%AC`
  )
  .then((Response) => {
    let juso = Response.data.results.juso[0].admCd.substring(0,5)
    axios
    .get(
      `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?ServiceKey=${process.env.REALSTATE_LIST_KEY}&LAWD_CD=${juso}&DEAL_YMD=201512`
    )
    .then((Response) => {
      res.send(Response.data.response.body.items.item)
    })
    .catch((Error) => {
      console.log(Error);
    });
  });

}

module.exports = pick;