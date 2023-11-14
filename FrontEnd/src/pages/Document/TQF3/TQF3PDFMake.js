import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

const createCLObody = (array) => {
    let mybody = [[{text:'ลำดับที่',alignment:'center'}, {text:'การพัฒนาผลการเรียนรู้',alignment:'center'}, {text:'วิธีการสอน',alignment:'center'}, {text:'วิธีการประเมินผล',alignment:'center'}]];
    array.map((el,index) => {
        mybody.push([{text:index+1,alignment:'center'},el.text,el.howteach,el.howeva])
    })
    console.log(mybody)
    return mybody
}

const createTeachPlanbody = (array) => {
    let mybody = [[{text:'สัปดาห์ที่',alignment:'center'}, {text:'หัวข้อ/รายละเอียดและจำนวนชั่วโมง',alignment:'center'}, {text:'กิจกรรมการเรียนการสอน',alignment:'center'}, {text:'ผู้สอน',alignment:'center'}]];
    array.map((el,index) => {
        mybody.push([{text:index+1,alignment:'center'},el.title+'\nจำนวนชั่วโมง : '+el.hour+" ชั่วโมง",el.activity,el.professorweek])
    })
    return mybody
}

const createEvaluationPlanbody = (array) => {
    let mybody = [[{text:'กิจกรรมที่',alignment:'center'}, {text:'วิธีการประเมินผลนักศึกษาและสัดส่วนการประเมินผล',alignment:'center'}, {text:'ผลการเรียนรู้	',alignment:'center'}, {text:'สัปดาห์ที่ประเมิน',alignment:'center'}]];
    array.map((el,index) => {
        mybody.push([{text:index+1,alignment:'center'},el.howeva+' ('+el.evaratio+"%)",el.evaoutcome,el.evaweek])
    })
    return mybody
}

const TQF3PDFMake = async (data) => {
    // console.log("[TQF3PDFMake.js] data",data)
    let docDefination = {
        pageSize: 'A4',
        info: {
            title: data.code + ' ' + data.engname,
        },
        content: [
            //หมวดที่1
            { text: 'หมวดที่ 1 ข้อมูลทั่วไป', style: 'header' },
            //หมวดที่ 1.1
            { text: '1. รหัสวิชา, ชื่อรายวิชา และจำนวนหน่วยกิต', style: 'firstsubheader' },
            {
                columns: [
                    { width: '40%', text: 'รหัสรายวิชา', style: 'paragraph' },
                    {
                        stack: [
                            data.code ? data.code : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '40%', text: 'ชื่อวิชา (ภาษาไทย)', style: 'paragraph' },
                    {
                        stack: [
                            data.thainame ? data.thainame : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '40%', text: 'ชื่อวิชา (ภาษาอังกฤษ)', style: 'paragraph' },
                    {
                        stack: [
                            data.engname ? data.engname : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '40%', text: 'จำนวนหน่วยกิต', style: 'paragraph' },
                    {
                        stack: [
                            data.credit ? data.credit : ' '
                        ]
                    }
                ]
            },
            //หมวดที่ 1.2
            { text: '2. หลักสูตร และประเภทของรายวิชา', style: 'subheader' },
            { text: data.tqf2program_label ? data.tqf2program_label : ' ', style: 'paragraph' },
            { text: data.tqf2course_label ? data.tqf2course_label : ' ', style: 'paragraph' },
            //หมวดที่ 1.3
            { text: '3. อาจารย์ผู้รับผิดชอบรายวิชาและอาจารย์ผู้สอน', style: 'subheader' },
            data.Professor.map((el, index) => {
                return el.thainame ? { text: el.thainame, style: 'paragraph' } : ' '
            }
            ),
            //หมวดที่ 1.4
            { text: '4. ภาคเรียน/ปีการศึกษา', style: 'subheader' },
            { text: data.termyear_code ? `ภาคเรียนที่ ${data.termyear_code.slice(0, 1)} ปีการศึกษา ${parseInt(data.termyear_code.slice(2)) + 543}` : ' ', style: 'paragraph' },
            //หมวดที่ 1.5
            { text: '5.รายวิชาที่ต้องเรียนมาก่อน (Pre-requisites)', style: 'subheader' },
            { text: data.pre_requisites_st ? data.pre_requisites_st : ' ', style: 'paragraph' },
            { text: data.pre_requisites_nd ? data.pre_requisites_nd : '', style: 'paragraph' },
            //หมวดที่ 1.6
            { text: '6. รายวิชาที่ต้องเรียนพร้อมกัน (Co-requisites)', style: 'subheader' },
            { text: data.co_requisites ? data.co_requisites : ' ', style: 'paragraph' },
            //หมวดที่ 1.7
            { text: '7. สถานที่เรียน', style: 'subheader' },
            { text: data.place ? data.plcae : 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี', style: 'paragraph' },
            //หมวดที่ 1.8
            { text: '8. วันที่จัดทำหรือปรับปรุงรายละเอียดของรายวิชาครั้งล่าสุด', style: 'subheader' },
            { text: data.UpdateDate ? data.UpdateDate : 'Unknow', style: 'paragraph' },
            //หมวดที่ 2
            { text: 'หมวดที่ 2 จุดมุ่งหมายและวัตถุประสงค์', style: 'header', headlineLevel: 1 },
            //หมวดที่ 2.1
            { text: '1. จุดมุ่งหมายของรายวิชา', style: 'firstsubheader' },
            { text: data.outcome ? data.outcome : ' ', style: 'paragraph' },
            //หมวดที่ 2.2
            { text: '2. วัตถุประสงค์ในการพัฒนาปรับปรุงรายวิชา', style: 'subheader' },
            { text: data.objective ? data.objective : ' ', style: 'paragraph' },
            //หมวดที่ 3
            { text: 'หมวดที่ 3 ลักษณะและการดำเนินการ', style: 'header', headlineLevel: 1 },
            //หมวดที่ 3.1
            { text: '1. คำอธิบายรายวิชา', style: 'firstsubheader' },
            { text: data.description ? data.description : ' ', style: 'paragraph' },
            //หมวดที่ 3.2
            { text: '2. จำนวนชั่วโมงที่ใช้ต่อภาคการศึกษา', style: 'subheader' },
            {
                columns: [
                    { width: '50%', text: 'บรรยาย :', style: 'paragraph' },
                    {
                        stack: [
                            data.describe ? data.describe : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '50%', text: 'สอนเสริม :', style: 'paragraph' },
                    {
                        stack: [
                            data.additionteach ? data.additionteach : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '50%', text: 'การฝึกปฏิบัติ/งานภาคสนาม/การฝึกงาน :', style: 'paragraph' },
                    {
                        stack: [
                            data.activelearn ? data.activelearn : ' '
                        ]
                    }
                ]
            },
            {
                columns: [
                    { width: '50%', text: 'การศึกษาด้วยตนเอง :', style: 'paragraph' },
                    {
                        stack: [
                            data.selflearn ? data.selflearn : ' '
                        ]
                    }
                ]
            },
            // { text: 'บรรยาย :', style: 'paragraphbold' },
            // { text: data.describe ? data.describe : ' ', style: 'paragraph' },
            // { text: 'สอนเสริม :', style: 'paragraphbold' },
            // { text: data.additionteach ? data.additionteach : ' ', style: 'paragraph' },
            // { text: 'การฝึกปฏิบัติ/งานภาคสนาม/การฝึกงาน :', style: 'paragraphbold' },
            // { text: data.activelearn ? data.activelearn : ' ', style: 'paragraph' },
            // { text: 'การศึกษาด้วยตนเอง :', style: 'paragraphbold' },
            // { text: data.selflearn ? data.selflearn : ' ', style: 'paragraph' },
            //หมวดที่ 3.3
            { text: '3. จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการแก่นักศึกษาเป็นรายบุคคล', style: 'subheader' },
            { text: data.consulthour ? data.consulthour : ' ', style: 'paragraph' },
            //หมวดที่ 4
            { text: 'หมวดที่ 4 การพัฒนาผลการเรียนรู้ของนักศึกษา', style: 'header', headlineLevel: 1 },
            //หมวดที่ 4.1
            { text: '1. ผลลัพธ์การเรียนรู้ระดับวิชา (Course learning outcome) ของรายวิชา', style: 'firstsubheader' },
            {
                table: {
                    headerRows: 1,
                    widths: ['9%','46%','23%','22%'],
                    body: data.CLO ? createCLObody(data.CLO) : [[]]

                }
            },
            //หมวดที่ 5
            { text: 'หมวดที่ 5 แผนการสอนและการประเมินผล', style: 'header', headlineLevel: 1 },
            //หมวดที่ 5.1
            { text: '1. แผนการสอน', style: 'firstsubheader' },
            {
                table: {
                    headerRows: 1,
                    widths: ['9%','46%','23%','22%'],
                    body: data.Teachplan ? createTeachPlanbody(data.Teachplan) : [[]]

                },
                margin: [0,0,0,10]
            },
            //หมวดที่ 5.2
            { text: '2.แผนการประเมินผลการเรียนรู้', style: 'firstsubheader' },
            {
                table: {
                    headerRows: 1,
                    widths: ['9%','46%','23%','22%'],
                    body: data.Evaluationplan ? createEvaluationPlanbody(data.Evaluationplan) : [[]]

                }
            },
            //หมวดที่ 6
            { text: 'หมวดที่ 6 ทรัพยากรประกอบการเรียนการสอน', style: 'header', headlineLevel: 1 },
            //หมวดที่ 6.1
            { text: '1. หนังสือ ตำรา และเอกสารประกอบการสอนหลัก', style: 'firstsubheader' },
            { text: data.book ? data.book : ' ', style: 'paragraph' },
            //หมวดที่ 6.2
            { text: '2. เอกสาร และข้อมูลสำคัญ', style: 'subheader' },
            { text: data.doc ? data.doc : ' ', style: 'paragraph' },
            //หมวดที่ 6.3
            { text: '3. เอกสาร และข้อมูลแนะนำ', style: 'subheader' },
            { text: data.addodc ? data.addodc : ' ', style: 'paragraph' },
            //หมวดที่ 7
            { text: 'หมวดที่ 7 การประเมินและปรับปรุงการดำเนินการของรายวิชา', style: 'header', headlineLevel: 1 },
            //หมวดที่ 7.1
            { text: '1. กลยุทธ์การประเมินประสิทธิผลของรายวิชาโดยนักศึกษา', style: 'firstsubheader' },
            { text: data.effect ? data.effect : ' ', style: 'paragraph' },
            //หมวดที่ 7.2
            { text: '2. กลยุทธ์การประเมินการสอน', style: 'subheader' },
            { text: data.evaluation ? data.evaluation : ' ', style: 'paragraph' },
            //หมวดที่ 7.3
            { text: '3. การปรับปรุงการสอน', style: 'subheader' },
            { text: data.improve ? data.improve : ' ', style: 'paragraph' },
            //หมวดที่ 7.4
            { text: '4. การทวนสอบมาตรฐานผลสัมฤทธิ์ของนักศึกษาในรายวิชา', style: 'subheader' },
            { text: data.exam ? data.exam : ' ', style: 'paragraph' },
            //หมวดที่ 7.5
            { text: '5. การดำเนินการทบทวนและวางแผนปรับปรุงประสิทธิผลของรายวิชา', style: 'subheader' },
            { text: data.opeartion ? data.opeartion : ' ', style: 'paragraph' },


        ],
        pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            // console.log('current',currentNode)
            // console.log('following',followingNodesOnPage)
            return currentNode.headlineLevel === 1
        },
        defaultStyle: {
            font: 'THSarabunNew',
            fontSize: 16
        },
        styles: {
            header: {
                fontSize: 24,
                alignment: 'center',
                bold: true,
                // margin: [left, top, right, bottom]
                margin: [0, 0, 0, 18]
            },
            firstsubheader: {
                fontSize: 18,
                bold: true
            },
            subheader: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 0]
            },
            paragraph: {
                fontSize: 16,
                margin: [60, 0, 0, 0]
            },
            paragraphbold: {
                fontSize: 16,
                margin: [60, 0, 0, 0],
                bold: true
            }
        }
    };


    //    console.log(pdfMake.createPdf(docDefination))
    pdfMake.createPdf(docDefination).open();
    // pdfMake.createPdf(docDefination).download(data.code + ' ' + data.engname);

}

export default TQF3PDFMake
