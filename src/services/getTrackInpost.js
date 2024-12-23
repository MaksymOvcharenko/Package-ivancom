export async function fetchInPostData(code) {
  const email = "ivancom.krakow@gmail.com";
  const password = "Vasilisa2010@";
  const content = `<paczkomaty><code>${code}</code></paczkomaty>`;
  const dateRange = `<dateRange><startDate>2024-09-20</startDate><endDate>2024-12-31</endDate></dateRange>`;
  const paging = `<paging><limit>97</limit><offset>1</offset></paging>`;

  const xmlBody = `email=${email}&password=${password}&content=${content}${dateRange}${paging}`;
  console.log(xmlBody);

  const response = await fetch(
    "https://api.paczkomaty.pl/?do=revloggetreport",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: xmlBody,
    }
  );

  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");
  console.log(xml);
  const data = {
    status:
      xml.querySelector("reverseReturnPackStatus")?.textContent || "NotSend",
    track:
      xml.querySelector("reverseReturnPackCode")?.textContent ||
      "Ще не надана до Поштомату",
  };
  console.log(data);

  return data;
}
