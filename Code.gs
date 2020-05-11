/*
 * 
 * FUNCTION 1:
 * Function automatically submit forms with data pulled from a spreadsheet
 */

function submitForm(){
  // id,report,sum,loc,count,sex,age,symp,hosp,start,end,visit,wuhan,source
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
 
// https://docs.google.com/forms/d/e/1FAIpQLSd2IDGmjVwmM6F0cx9Xej2h_RZp_NQ5aLqkHYAmC45IMqNiEQ/viewform?usp=sf_link
  var form = FormApp.openById(getIdFromUrl("https://docs.google.com/forms/d/1BbRtgDiTrabABMZxZfKXRir8egEoMaB59puhu2Uj4Z4/edit"));
  
  for (var x = 0; x < values.length; x++) {

    var formResponse = form.createResponse();
    var items = form.getItems();

    var row = values[x];

// ID; 969149567
    var formItem = items[0.0].asTextItem();   
    var response = formItem.createResponse(row[0]); 
    formResponse.withItemResponse(response);
    
// Reporting Date: 1038042681
    var formItem = items[1.0].asTextItem();   
    var response = formItem.createResponse(row[2]);     
    formResponse.withItemResponse(response);
    
// Summary: 1543673881
    var formItem = items[2.0].asParagraphTextItem();   
    var response = formItem.createResponse(row[4]);     
    formResponse.withItemResponse(response);

// Location: 472111752
    var formItem = items[3.0].asTextItem();   
    var response = formItem.createResponse(row[5]);     
    formResponse.withItemResponse(response);

// Country: 2136245124
    var formItem = items[4.0].asTextItem();   
    var response = formItem.createResponse(row[6]);     
    formResponse.withItemResponse(response);

// Gender: 2071293520
    var formItem = items[5.0].asTextItem();   
    var response = formItem.createResponse(row[7]);     
    formResponse.withItemResponse(response);

// Age: 119193450
    var formItem = items[6.0].asTextItem();   
    var response = formItem.createResponse(row[8]);     
    formResponse.withItemResponse(response);

// Symptoms On-Set: 1747076458
    var formItem = items[7.0].asTextItem();   
    var response = formItem.createResponse(row[9]);     
    formResponse.withItemResponse(response);

// Hospital Visit On: 1356865469
    var formItem = items[8.0].asTextItem();   
    var response = formItem.createResponse(row[11]);     
    formResponse.withItemResponse(response);

// Exposure Start: 701693435
    var formItem = items[9.0].asTextItem();   
    var response = formItem.createResponse(row[12]);     
    formResponse.withItemResponse(response);

// Exposure End: 195136721
    var formItem = items[10.0].asTextItem();   
    var response = formItem.createResponse(row[13]);     
    formResponse.withItemResponse(response);
  
// Visiting Wuhan: 1245752783  
    var formItem = items[11.0].asTextItem();   
    var response = formItem.createResponse(row[14]);     
    formResponse.withItemResponse(response);
  
// From Wuhan: 884006624  
    var formItem = items[12.0].asTextItem();   
    var response = formItem.createResponse(row[15]);     
    formResponse.withItemResponse(response);

// Source: 984998798  
    var formItem = items[13.0].asTextItem();   
    var response = formItem.createResponse(row[19]);     
    formResponse.withItemResponse(response);
    
    formResponse.submit();
    Utilities.sleep(500);

  }
}

/*
 * 
 * FUNCTION 2:
 * Function to extract ID from URL inputs
 */
function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

/*
 * 
 * FUNCTION 3:
 * Function automatically submit forms with data pulled from API
 */

function submitFormAPI(){

  var countryPool = UrlFetchApp.fetch("https://api.covid19api.com/countries");
  var value = JSON.parse(countryPool.getContentText());
  Logger.log(values);

  var form = FormApp.openById(getIdFromUrl("https://docs.google.com/forms/d/1BbRtgDiTrabABMZxZfKXRir8egEoMaB59puhu2Uj4Z4/edit"));
  
}

/*
 * 
 * FUNCTION 4: FAILED
 * Function SUPPOSEDLY automatically submit forms by constructing a valid URL with entry ID of each form component
 */
function submit (id,report,sum,loc,count,sex,age,symp,hosp,start,end,visit,wuhan,source) {

  var formId = '1FAIpQLSd2IDGmjVwmM6F0cx9Xej2h_RZp_NQ5aLqkHYAmC45IMqNiEQ';
  var queryString = '/formResponse?&entry.969149567=' + id + 
    '&entry.1038042681='+ report +
    '&entry.1543673881='+ sum +
    '&entry.472111752='+ loc +
    '&entry.2136245124='+ count +
    '&entry.2071293520='+ sex +
    '&entry.119193450='+ age +
    '&entry.1747076458='+ symp +
    '&entry.1356865469='+ hosp +
    '&entry.701693435='+ start +
    '&entry.195136721='+ end +
    '&entry.1245752783='+ visit +
    '&entry.884006624='+ wuhan +
    '&entry.984998798='+ source +
    '&submit=SUBMIT';

  var url = 'https://docs.google.com/forms/d/e/' + formId + queryString

  var opts = {
    method: "POST",
    mode: "no-cors", 
    redirect: "follow", 
    referrer: "no-referrer"
  }
  return url;
}
