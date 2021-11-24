

import * as fs from "fs"
import * as carbon from "carbone"
import { buffer } from "stream/consumers";

export class GeneratePdf
  {
   static async generateReport(data:any) {
    // carbon.render('src/data/utilities/report_new.docx', data, function(err, result) {})
    const fileBuffer=fs.readFileSync('src/data/utilities/report_new.docx')

    const options={
      convertTo :"pdf"
    }

     carbon.render('src/data/utilities/report_new.docx', data, options,  function(err, result) {
       if (err) {
         console.log(err);
       }
       // console.log(result)
       return fs.writeFileSync("result.pdf", result);
     });
    // return new Promise((resolve, reject) => {
    //
    //
    // });


  }
}
