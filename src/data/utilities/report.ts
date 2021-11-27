

import * as fs from "fs"
import * as carbon from "carbone"
import { buffer } from "stream/consumers";
import { Readable, Stream } from "stream";

export class GeneratePdf
  {

   static async generateReport(data:any) {
     return new Promise<Readable>((resolve, reject) => {
        // const fileBuffer=fs.readFileSync('src/data/utilities/report_new.docx')

       const options={
         convertTo :"pdf"
       }
       carbon.render('src/data/utilities/report_new.docx', data, options,
         (err, result) => {
           if (err) {
             reject(err);
           }
           // console.log(result)

           const stream = new Readable()
           stream.push(result);
           stream.push(null);
            resolve(stream)
         }


       );

     })
    // carbon.render('src/data/utilities/report_new.docx', data, function(err, result) {})


     // (err, result) => {
     //   if (err) {
     //     console.log(err);
     //   }
     //   // console.log(result)
     //   return fs.writeFileSync("result.pdf", result);
     // }
     //
    // return new Promise((resolve, reject) => {
    //
    //
    // });


  }
}
