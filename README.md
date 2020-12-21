### reactApatment의 목적
지도에 나와있는 지역을 클릭하면 해당 지역에 실제로 거래된 아파트의 정보를 알려주는 웹 사이트로 어플과 인터넷에 올라와 있는 허의 매물 가격에 
현혹되지 않고 해당 지역의 실제로 거래된 아파트의 가격을 알려주는 웹 사이트 입니다.

---

```javascript
//.env설정
PORT=5000
JUSO_NUMBER_KEY = "JusoAPI="
REALSTATE_LIST_KEY= "Apatment API"

```
Juso API : https://www.juso.go.kr/addrlink/devAddrLinkRequestWrite.do?returnFn=write&cntcMenu=URL
아파트 실 거래 API : https://www.data.go.kr/data/15057511/openapi.do
Juso_API는 사이트에 들어가 도로명 주소 -> 검색 API로 신청하시면 됩니다.
아파트 실 거래 API는 로그인 후 시크릿 키를 입력시켜 주면 됩니다.

---

비 동기처리를 위해 async, await를 활용해 Juso를 받아오는 서버에 응답을 요청한 후 응답이 올 때까지 대기 후 응답이 오면 아파트 실 거래 API에 요청을 보내 응답을 클라이언트로 응답할 수 있게 적용 했습니다.
```javascript
const pick = async function(req,res)  {
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

```
