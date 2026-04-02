import React, { useState } from 'react';
import { Plus, Trash2, Printer, Download, FileSpreadsheet, FileText, BookOpen, FileQuestion, CheckSquare, Sparkles, Loader2, Award } from 'lucide-react';

const SUBJECTS = [
  'KHTN 8 - PHÂN MÔN HOÁ HỌC', 'KHOA HỌC TỰ NHIÊN 8', 'Toán học', 'Ngữ văn', 'Tiếng Anh', 'Vật lí', 'Hóa học', 'Sinh học', 
  'Lịch sử', 'Địa lí', 'Giáo dục công dân', 'Tin học', 'Công nghệ', 'Khác...'
];

export default function App() {
  const [departmentName, setDepartmentName] = useState('UBND XÃ VĨNH HẬU');
  const [schoolName, setSchoolName] = useState('TRƯỜNG THCS ĐA PHƯỚC');
  const [examName, setExamName] = useState('ĐỀ KIỂM TRA GIỮA HỌC KÌ I');
  const [schoolYear, setSchoolYear] = useState('2025-2026');
  const [subject, setSubject] = useState('KHTN 8 - PHÂN MÔN HOÁ HỌC');
  const [timeTime, setTimeTime] = useState('25 phút');
  const [examDate, setExamDate] = useState('14/11/2025');
  const [testCode, setTestCode] = useState('01');
  
  // Trọng số điểm
  const [scorePerTN, setScorePerTN] = useState(0.25);
  const [scorePerTNDS, setScorePerTNDS] = useState(1.0); 
  const [scorePerTL, setScorePerTL] = useState(1.0); 

  // Chữ ký và Tác giả
  const [signLeader, setSignLeader] = useState('Phan Thị Thu Hà');
  const [signHead, setSignHead] = useState('Phạm Thị Kim Tho');
  const [signTeacher1, setSignTeacher1] = useState('Tống Phước Khải');
  const [signTeacher2, setSignTeacher2] = useState('Nguyễn Thị Huỳnh Như');
  const [authorName, setAuthorName] = useState('Thầy Tống Phước Khải - GV Trường THCS Đa Phước');

  const [activeTab, setActiveTab] = useState('matran');

  // Nạp sẵn dữ liệu ĐỀ THI theo mẫu
  const initialExamContent = `**PHẦN I. TRẮC NGHIỆM KHÁCH QUAN (1.5 ĐIỂM)**
**1. Câu trắc nghiệm nhiều lựa chọn.** Thí sinh trả lời từ câu 1 đến câu 2. Mỗi câu hỏi thí sinh chỉ chọn 1 phương án.
Câu 1: Hòa tan đường vào nước ta được dung dịch nước đường. Sự biến đổi này là
A. biến đổi vật lí
B. biến đổi hóa học
C. có cả hai sự biến đổi trên
D. không có sự biến đổi nào
Câu 2: Chất ban đầu tham gia phản ứng hóa học được gọi là
A. chất xúc tác
B. chất sản phẩm
C. chất phản ứng
D. chất khí

**2. Câu trắc nghiệm dạng Đúng/Sai.** Thí sinh trả lời từ câu sau. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.
Câu 3: Nhận định nào đúng và nhận định nào sai khi nói về cách dùng dụng cụ thí nghiệm và quy tắc sử dụng hóa chất an toàn
a. Ống nghiệm dùng để đo thể tích của chất lỏng.
b. Dụng cụ dùng để lấy chất lỏng là ống nhỏ giọt.
c. Khi làm thí nghiệm, có thể nếm hoặc ngửi trực tiếp các hóa chất.
d. Khi kẹp ống nghiệm thì nên kẹp ở vị trí 1/3 ống nghiệm tính từ miệng ống nghiệm.

**PHẦN II. TỰ LUẬN (1,0 ĐIỂM)**
Câu 4: Nếu dùng 9,4 gam Iron (Fe) phản ứng hoàn toàn với 15g Oxygen (O_{2}) vừa đủ thì sinh ra Fe_{3}O_{4} (Oxide sắt từ).
a. Lập phương trình hoá học và viết công thức định luật bảo toàn khối lượng theo sơ đồ phản ứng trên.
b. Tính khối lượng Fe_{3}O_{4} tạo thành?`;

  // Nạp sẵn dữ liệu ĐÁP ÁN theo mẫu
  const initialAnswerContent = `**PHẦN I. TRẮC NGHIỆM KHÁCH QUAN (1.5 ĐIỂM)**
**1. Câu trắc nghiệm nhiều lựa chọn (0.5 điểm):** Mỗi câu trả lời đúng được 0,25 điểm.
Câu 1: A
Câu 2: C

**2. Câu trắc nghiệm dạng Đúng/Sai (1,0 điểm):** Mỗi ý trả lời đúng được 0.25 điểm.
Câu 3:
a) Sai
b) Đúng
c) Sai
d) Đúng

**PHẦN II. TỰ LUẬN (1,0 ĐIỂM)**
Câu 4:
a. 
- PTHH: 3Fe + 2O_{2} -> Fe_{3}O_{4} (0,5 điểm)
- Áp dụng ĐLBTKL: m_{Fe} + m_{O_{2}} = m_{Fe_{3}O_{4}} (0,25 điểm)
b. 
- m_{Fe_{3}O_{4}} = m_{Fe} + m_{O_{2}} = 9.4 + 15 = 24.4 g (0,25 điểm)
*(Lưu ý: Học sinh giải cách khác đúng vẫn hưởng trọn số điểm)*`;

  const [examContent, setExamContent] = useState(initialExamContent);
  const [answerContent, setAnswerContent] = useState(initialAnswerContent);
  
  const [isGenerating, setIsGenerating] = useState(false);

  // Nạp sẵn dữ liệu Ma trận theo đúng file Word đầu tiên
  const [rows, setRows] = useState([
    {
      id: 1,
      chapter: 'Chủ đề 1: Phản ứng hóa học',
      content: 'Bài 6. Nồng độ dung dịch',
      req_nb: 'Nêu được định nghĩa và công thức tính nồng độ phần trăm, nồng độ mol.', 
      req_th: 'Tính được lượng chất tan và nồng độ khi biết các đại lượng liên quan.', 
      req_vd: 'Vận dụng tính toán nồng độ dung dịch sau khi pha loãng hoặc trộn lẫn.',
      nb_tn: 2, th_tn: 0, vd_tn: 0,
      nb_tnds: 0.5, th_tnds: 0.5, vd_tnds: 0, 
      nb_tl: 0, th_tl: 0, vd_tl: 1,
    }
  ]);

  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, {
      id: newId,
      chapter: `Chủ đề ${rows.length + 1}`,
      content: '',
      req_nb: '', req_th: '', req_vd: '',
      nb_tn: 0, th_tn: 0, vd_tn: 0,
      nb_tnds: 0, th_tnds: 0, vd_tnds: 0,
      nb_tl: 0, th_tl: 0, vd_tl: 0,
    }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(r => {
      if (r.id === id) {
        const parsedValue = field.includes('tn') || field.includes('tnds') || field.includes('tl') 
          ? (parseFloat(value) || 0) 
          : value;
        return { ...r, [field]: parsedValue };
      }
      return r;
    }));
  };

  const totals = rows.reduce((acc, row) => {
    acc.nb_tn += row.nb_tn; acc.nb_tnds += row.nb_tnds; acc.nb_tl += row.nb_tl;
    acc.th_tn += row.th_tn; acc.th_tnds += row.th_tnds; acc.th_tl += row.th_tl;
    acc.vd_tn += row.vd_tn; acc.vd_tnds += row.vd_tnds; acc.vd_tl += row.vd_tl;
    return acc;
  }, { nb_tn: 0, nb_tnds: 0, nb_tl: 0, th_tn: 0, th_tnds: 0, th_tl: 0, vd_tn: 0, vd_tnds: 0, vd_tl: 0 });

  const totalTN = totals.nb_tn + totals.th_tn + totals.vd_tn;
  const totalTNDS = totals.nb_tnds + totals.th_tnds + totals.vd_tnds;
  const totalTL = totals.nb_tl + totals.th_tl + totals.vd_tl;
  
  const totalScore = (totalTN * scorePerTN) + (totalTNDS * scorePerTNDS) + (totalTL * scorePerTL);

  const calculateRowScore = (row) => {
    const rowTN = row.nb_tn + row.th_tn + row.vd_tn;
    const rowTNDS = row.nb_tnds + row.th_tnds + row.vd_tnds;
    const rowTL = row.nb_tl + row.th_tl + row.vd_tl;
    return (rowTN * scorePerTN) + (rowTNDS * scorePerTNDS) + (rowTL * scorePerTL);
  };

  // ==========================================
  // HÀM GỌI API GEMINI ĐỂ TẠO NỘI DUNG TỰ ĐỘNG
  // ==========================================
  const generateWithAI = async () => {
    if (rows.some(r => !r.chapter.trim() || !r.content.trim())) {
      alert("Vui lòng nhập Tên chủ đề và Nội dung kiến thức cho tất cả các dòng trước khi tạo tự động!");
      return;
    }
    if (totalTN + totalTNDS + totalTL === 0) {
      alert("Ma trận hiện đang trống (chưa có số lượng câu hỏi). Vui lòng phân bổ câu hỏi trước!");
      return;
    }

    setIsGenerating(true);

    try {
      const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || ""; 
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

      const matrixData = rows.map(r => ({
        id: r.id,
        chu_de: r.chapter,
        noi_dung: r.content,
        cau_hoi_trac_nghiem: { B: r.nb_tn, H: r.th_tn, VD: r.vd_tn },
        cau_hoi_dung_sai: { B: r.nb_tnds, H: r.th_tnds, VD: r.vd_tnds },
        cau_hoi_tu_luan: { B: r.nb_tl, H: r.th_tl, VD: r.vd_tl }
      }));

      const prompt = `Bạn là một giáo viên xuất sắc đang công tác tại ${schoolName}.
      Dựa vào MA TRẬN ĐỀ THI môn ${subject} dưới đây, hãy biên soạn:
      1. Yêu cầu cần đạt (Đặc tả): Viết ngắn gọn yêu cầu cần đạt.
      2. ĐỀ KIỂM TRA: Soạn đề thi tuân thủ CẤU TRÚC SAU (dùng in đậm **PHẦN...** cho các tiêu đề):
         **PHẦN I. TRẮC NGHIỆM KHÁCH QUAN** **1. Câu trắc nghiệm nhiều lựa chọn.** Thí sinh trả lời từ câu 1 đến câu [Số câu]. Mỗi câu hỏi thí sinh chỉ chọn 1 phương án.
         (Soạn các câu hỏi, kèm 4 đáp án A, B, C, D).
         **2. Câu trắc nghiệm dạng Đúng/Sai.** Thí sinh trả lời từ câu [Số câu tiếp theo]. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.
         (Soạn câu dẫn, sau đó liệt kê 4 ý a, b, c, d).
         
         **PHẦN II. TỰ LUẬN** (Soạn các câu hỏi tự luận theo ma trận).

      3. ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM: Trình bày chuẩn form:
         **PHẦN I. TRẮC NGHIỆM KHÁCH QUAN** **1. Câu trắc nghiệm nhiều lựa chọn:** Liệt kê đáp án (VD: Câu 1: A, Câu 2: B...). 
         **2. Câu trắc nghiệm dạng Đúng/Sai:** Liệt kê đáp án từng ý (VD: Câu 3: a) Đúng, b) Sai, c) Đúng, d) Sai).
         **PHẦN II. TỰ LUẬN**
         Hướng dẫn giải chi tiết và thang điểm (barem) cho từng bước làm bài.

      LƯU Ý QUAN TRỌNG VỀ CÔNG THỨC TOÁN/HOÁ:
      Trong nội dung đề và đáp án, đối với các công thức hóa học, chỉ số toán học, SỬ DỤNG định dạng sau:
      - Chỉ số dưới (subscript): Dùng cặp dấu ngoặc nhọn có gạch dưới. Ví dụ: H_{2}O, m_{ct}, H_{2}SO_{4}
      - Chỉ số trên (superscript): Dùng cặp dấu ngoặc nhọn có dấu mũ. Ví dụ: cm^{3}, x^{2}, 25^{o}C

      Ma trận đề thi (dạng JSON):
      ${JSON.stringify(matrixData, null, 2)}
      `;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              specifications: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    id: { type: "INTEGER" },
                    req_nb: { type: "STRING" },
                    req_th: { type: "STRING" },
                    req_vd: { type: "STRING" }
                  }
                }
              },
              examContent: { type: "STRING" },
              answerContent: { type: "STRING" }
            },
            required: ["specifications", "examContent", "answerContent"]
          }
        }
      };

      let response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (resultText) {
        const parsedResult = JSON.parse(resultText);
        
        setRows(prevRows => prevRows.map(row => {
          const spec = parsedResult.specifications.find(s => s.id === row.id);
          if (spec) {
            return {
              ...row,
              req_nb: spec.req_nb || row.req_nb,
              req_th: spec.req_th || row.req_th,
              req_vd: spec.req_vd || row.req_vd
            };
          }
          return row;
        }));

        setExamContent(parsedResult.examContent);
        setAnswerContent(parsedResult.answerContent);
        setActiveTab('dethi');
      }

    } catch (error) {
      console.error("Lỗi khi gọi AI:", error);
      alert("Có lỗi xảy ra khi tạo đề tự động. Vui lòng kiểm tra lại kết nối hoặc thử lại sau.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Tính số lượng câu để hiển thị form Bài làm
  const totalTNDSCount = Math.ceil(totalTNDS); 

  // Header thi HTML
  const examHeaderHTML = `
    <table class="header-table" style="margin-bottom: 5px;">
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: top; width: 40%;">
            <div class="font-bold">${departmentName}</div>
            <div class="font-bold"><u>${schoolName}</u></div>
            <div class="font-bold" style="margin-top: 15px;">ĐẾ ${testCode}</div>
          </td>
          <td style="text-align: center; vertical-align: top; width: 60%;">
            <div class="font-bold" style="font-size: 13pt;">${examName}</div>
            <div class="font-bold" style="font-size: 12pt;">NĂM HỌC: ${schoolYear}</div>
            <div class="font-bold" style="font-size: 12pt;">Môn: ${subject.toUpperCase()}</div>
            <div style="font-style: italic;">(Thời gian làm bài: ${timeTime}) Ngày: ${examDate}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-bottom: 10px; font-weight: bold; font-size: 12pt;">Lớp: 8A..............</div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;" border="1">
      <tbody>
       <tr>
         <td style="width: 30%; text-align: center; font-weight: bold; padding: 5px;">Điểm</td>
         <td style="width: 40%; text-align: center; font-weight: bold; padding: 5px;">Lời phê của giáo viên</td>
         <td style="width: 30%; text-align: center; font-weight: bold; padding: 5px;">Duyệt của BGH</td>
       </tr>
       <tr>
         <td style="height: 60px; vertical-align: top; padding: 5px;">Bằng số:<br><br>Bằng chữ:</td>
         <td></td>
         <td></td>
       </tr>
      </tbody>
    </table>
  `;

  // HTML cho khung "BÀI LÀM" sử dụng table border-bottom để hiển thị đường kẻ ngang hoàn hảo trong Word
  let baiLamHTML = `
    <div style="text-align: center; font-weight: bold; margin-top: 30px;">----- HẾT -----</div>
    <div style="margin-top: 10px; font-size: 11pt;">
      <strong>Lưu ý:</strong><br>
      - Thí sinh không được sử dụng tài liệu khi làm bài.<br>
      - Cán bộ coi thi không giải thích gì thêm.
    </div>
    
    <div class="page-break"></div>
    <div class="title">BÀI LÀM</div>
    <div style="font-weight: bold; margin-bottom: 5px;">I. TRẮC NGHIỆM: ${totalTN * scorePerTN + totalTNDS * scorePerTNDS} điểm</div>
    <div style="margin-bottom: 10px;"><strong>1. Câu trắc nghiệm nhiều lựa chọn.</strong> Thí sinh trả lời từ câu 1 đến câu ${totalTN}. Mỗi câu hỏi thí sinh chỉ chọn 1 phương án.</div>
    <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 20px;" border="1">
      <tbody>
        <tr>
          <td style="font-weight: bold; width: 80px; padding: 5px;">Câu</td>
          ${Array.from({length: totalTN}, (_, i) => `<td style="padding: 5px;">${i + 1}</td>`).join('')}
        </tr>
        <tr>
          <td style="font-weight: bold; height: 35px; padding: 5px;">Đáp án</td>
          ${Array.from({length: totalTN}, () => `<td></td>`).join('')}
        </tr>
      </tbody>
    </table>

    <div style="margin-bottom: 10px;"><strong>2. Câu trắc nghiệm dạng Đúng/Sai.</strong></div>
    <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 20px;" border="1">
      <tbody>
        <tr>
          <td style="font-weight: bold; width: 80px; padding: 5px;">Câu</td>
          ${Array.from({length: totalTNDSCount}, (_, i) => `<td style="padding: 5px;">${totalTN + i + 1}</td>`).join('')}
        </tr>
        <tr>
          <td style="font-weight: bold; height: 100px; padding: 5px;">Đáp án</td>
          ${Array.from({length: totalTNDSCount}, () => `<td style="text-align: left; padding: 5px; vertical-align: top;">a)<br><br>b)<br><br>c)<br><br>d)</td>`).join('')}
        </tr>
      </tbody>
    </table>

    <div style="font-weight: bold; margin-bottom: 10px;">II. TỰ LUẬN: ${totalTL * scorePerTL} điểm</div>
    <table style="width: 100%; border-collapse: collapse; border: none; margin-top: 10px;">
      <tbody>
        ${Array.from({length: 12}, () => `<tr><td style="border: none; border-bottom: 1px dotted black; height: 30px;">&nbsp;</td></tr>`).join('')}
      </tbody>
    </table>
    
    <div style="text-align: right; font-weight: bold; font-style: italic; margin-top: 30px;">${authorName}</div>
  `;

  const exportToWord = () => {
    const formatText = (text) => {
      if (!text) return '';
      return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>') 
        .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>'); 
    };

    let html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid black; padding: 6px; vertical-align: top; }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .header-table { width: 100%; border: none; margin-bottom: 20px; }
          .header-table td, .header-table th { border: none; padding: 0; }
          .page-break { page-break-before: always; }
          .title { text-align: center; font-size: 14pt; font-weight: bold; margin-top: 20px; margin-bottom: 20px; }
          
          /* Cấu hình trang ngang (Landscape) cho Ma trận & Đặc tả */
          @page WordSectionLandscape {
            size: 842.0pt 595.0pt; /* Kích thước A4 ngang */
            mso-page-orientation: landscape;
            margin: 0.5in;
          }
          div.WordSectionLandscape { page: WordSectionLandscape; }
          
          /* Cấu hình trang đứng (Portrait) cho Đề thi & Đáp án */
          @page WordSectionPortrait {
            size: 595.0pt 842.0pt; /* Kích thước A4 đứng */
            mso-page-orientation: portrait;
            margin: 0.8in 0.5in;
          }
          div.WordSectionPortrait { page: WordSectionPortrait; }
        </style>
      </head>
      <body>
        <div class="WordSectionLandscape">
        <!-- 1. MA TRẬN -->
        <table class="header-table">
          <tbody>
            <tr>
              <td style="text-align: center; vertical-align: top; width: 40%;">
                <div class="font-bold">${departmentName}</div>
                <div class="font-bold"><u>${schoolName}</u></div>
              </td>
              <td style="text-align: center; vertical-align: top; width: 60%;">
                <div class="font-bold" style="font-size: 13pt;">KHUNG MA TRẬN VÀ ĐẶC TẢ ĐỀ KIỂM TRA GIỮA HKII</div>
                <div class="font-bold" style="font-size: 12pt;">MÔN ${subject.toUpperCase()}</div>
                <div class="font-bold" style="font-size: 12pt;">NĂM HỌC ${schoolYear}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-bottom: 15px; font-weight: bold;">I. MA TRẬN ĐỀ KIỂM TRA</div>
        <table>
          <thead>
            <tr>
              <th rowspan="3">TT</th>
              <th rowspan="3">Chương/Chủ đề</th>
              <th rowspan="3">Nội dung/Đơn vị kiến thức</th>
              <th colspan="9">Mức độ đánh giá</th>
              <th rowspan="3">Tổng số câu</th>
              <th rowspan="3">Tỉ lệ %</th>
            </tr>
            <tr>
              <th colspan="3">TNKQ nhiều lựa chọn</th>
              <th colspan="3">TNKQ Đúng/Sai</th>
              <th colspan="3">Tự luận</th>
            </tr>
            <tr>
              <th>B</th><th>H</th><th>VD</th>
              <th>B</th><th>H</th><th>VD</th>
              <th>B</th><th>H</th><th>VD</th>
            </tr>
          </thead>
          <tbody>
    `;

    rows.forEach((row, index) => {
      const rowTN = row.nb_tn + row.th_tn + row.vd_tn;
      const rowTNDS = row.nb_tnds + row.th_tnds + row.vd_tnds;
      const rowTL = row.nb_tl + row.th_tl + row.vd_tl;
      const rowScore = calculateRowScore(row);
      const percent = totalScore > 0 ? ((rowScore / totalScore) * 100).toFixed(1) : 0;
      
      html += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>${formatText(row.chapter)}</td>
          <td>${formatText(row.content)}</td>
          <td class="text-center">${row.nb_tn || ''}</td>
          <td class="text-center">${row.th_tn || ''}</td>
          <td class="text-center">${row.vd_tn || ''}</td>
          <td class="text-center">${row.nb_tnds || ''}</td>
          <td class="text-center">${row.th_tnds || ''}</td>
          <td class="text-center">${row.vd_tnds || ''}</td>
          <td class="text-center">${row.nb_tl || ''}</td>
          <td class="text-center">${row.th_tl || ''}</td>
          <td class="text-center">${row.vd_tl || ''}</td>
          <td class="text-center font-bold">${rowTN + rowTNDS + rowTL > 0 ? (rowTN + rowTNDS + rowTL) : ''}</td>
          <td class="text-center font-bold">${percent}%</td>
        </tr>
      `;
    });

    html += `
          <tr>
            <td colspan="3" class="text-center font-bold">Tổng cộng</td>
            <td class="text-center font-bold">${totals.nb_tn > 0 ? totals.nb_tn : ''}</td>
            <td class="text-center font-bold">${totals.th_tn > 0 ? totals.th_tn : ''}</td>
            <td class="text-center font-bold">${totals.vd_tn > 0 ? totals.vd_tn : ''}</td>
            <td class="text-center font-bold">${totals.nb_tnds > 0 ? totals.nb_tnds : ''}</td>
            <td class="text-center font-bold">${totals.th_tnds > 0 ? totals.th_tnds : ''}</td>
            <td class="text-center font-bold">${totals.vd_tnds > 0 ? totals.vd_tnds : ''}</td>
            <td class="text-center font-bold">${totals.nb_tl > 0 ? totals.nb_tl : ''}</td>
            <td class="text-center font-bold">${totals.th_tl > 0 ? totals.th_tl : ''}</td>
            <td class="text-center font-bold">${totals.vd_tl > 0 ? totals.vd_tl : ''}</td>
            <td class="text-center font-bold text-red-600">${totalTN + totalTNDS + totalTL}</td>
            <td class="text-center font-bold" style="color: red;">${totalScore > 0 ? '100%' : '0%'}</td>
          </tr>
        </tbody>
      </table>

      <!-- 2. BẢNG ĐẶC TẢ -->
      <div class="page-break"></div>
      <div style="margin-bottom: 15px; font-weight: bold;">II. BẢNG ĐẶC TẢ ĐỀ KIỂM TRA</div>
      <table>
        <thead>
          <tr>
            <th rowspan="3" style="width: 5%">TT</th>
            <th rowspan="3" style="width: 15%">Chủ đề</th>
            <th rowspan="3" style="width: 20%">Nội dung/<br/>Đơn vị kiến thức</th>
            <th rowspan="3" style="width: 40%">Yêu cầu cần đạt</th>
            <th colspan="9" style="width: 20%">Số lượng câu hỏi ở các mức độ</th>
          </tr>
          <tr>
            <th colspan="6">Trắc nghiệm KQ</th>
            <th colspan="3">Tự luận</th>
          </tr>
          <tr>
            <th colspan="3">Nhiều lựa chọn</th>
            <th colspan="3">Đúng-Sai</th>
            <th>B</th><th>H</th><th>VD</th>
          </tr>
        </thead>
        <tbody>
          <!-- Additional Header Sub-row for B H VD -->
          <tr style="background-color: #f3f4f6; font-weight: bold; text-align: center;">
            <td colspan="4"></td>
            <td>B</td><td>H</td><td>VD</td>
            <td>B</td><td>H</td><td>VD</td>
            <td>B</td><td>H</td><td>VD</td>
          </tr>
    `;

    rows.forEach((row, index) => {
      let yeuCauCanDat = '';
      if(row.req_nb) yeuCauCanDat += `<strong>Nhận biết:</strong><br/>${formatText(row.req_nb)}<br/><br/>`;
      if(row.req_th) yeuCauCanDat += `<strong>Thông hiểu:</strong><br/>${formatText(row.req_th)}<br/><br/>`;
      if(row.req_vd) yeuCauCanDat += `<strong>Vận dụng:</strong><br/>${formatText(row.req_vd)}`;

      html += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td>${formatText(row.chapter)}</td>
          <td>${formatText(row.content)}</td>
          <td>${yeuCauCanDat}</td>
          <td class="text-center">${row.nb_tn || ''}</td>
          <td class="text-center">${row.th_tn || ''}</td>
          <td class="text-center">${row.vd_tn || ''}</td>
          <td class="text-center">${row.nb_tnds || ''}</td>
          <td class="text-center">${row.th_tnds || ''}</td>
          <td class="text-center">${row.vd_tnds || ''}</td>
          <td class="text-center">${row.nb_tl || ''}</td>
          <td class="text-center">${row.th_tl || ''}</td>
          <td class="text-center">${row.vd_tl || ''}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>

      <table class="header-table" style="margin-top: 40px; text-align: center;">
        <tbody>
          <tr>
            <td colspan="4" style="text-align: right; padding-right: 50px; font-style: italic;">
              Ngày ... tháng ... năm 20...
            </td>
          </tr>
          <tr>
            <td style="width: 25%;">
              <div class="font-bold">Duyệt của lãnh đạo</div>
              <div style="height: 80px;"></div>
              <div class="font-bold">${signLeader}</div>
            </td>
            <td style="width: 25%;">
              <div class="font-bold">Duyệt của TT</div>
              <div style="height: 80px;"></div>
              <div class="font-bold">${signHead}</div>
            </td>
            <td style="width: 50%;" colspan="2">
              <div class="font-bold">Giáo viên bộ môn ra đề</div>
              <div style="height: 80px;"></div>
              <div style="display: flex; justify-content: space-around; width: 100%;">
                <span class="font-bold">${signTeacher1}</span>
                <span style="margin: 0 20px;"></span>
                <span class="font-bold">${signTeacher2}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div> <!-- KẾT THÚC VÙNG TRANG NGANG -->

      <!-- 3. ĐỀ THI & BÀI LÀM (VÙNG TRANG ĐỨNG) -->
      <div class="WordSectionPortrait">
      ${examHeaderHTML}
      <div style="margin-top: 20px;">${formatText(examContent)}</div>
      ${baiLamHTML}

      <!-- 4. ĐÁP ÁN -->
      <div class="page-break"></div>
      <div class="title">ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM</div>
      <div style="margin-top: 10px;">${formatText(answerContent)}</div>
      <div style="text-align: right; font-weight: bold; font-style: italic; margin-top: 30px;">${authorName}</div>
      </div> <!-- KẾT THÚC VÙNG TRANG ĐỨNG -->

      </body>
      </html>
    `;

    const bom = "\uFEFF"; 
    const blob = new Blob([bom + html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `MaTran_DacTa_${subject}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderFormattedPreview = (text) => {
    if (!text) return { __html: '' };
    const htmlText = text
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
      .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    return { __html: htmlText };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800 relative flex flex-col">
      <style>
        {`
          @media print {
            body { background: white; padding: 0; margin: 0; }
            .no-print { display: none !important; }
            .print-border { border-color: #000 !important; color: #000 !important; }
            input, textarea { border: none !important; background: transparent !important; resize: none; overflow: hidden; padding: 0; box-shadow: none !important;}
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000 !important; padding: 4px 8px !important; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .print-page-break { page-break-before: always; }
            .tab-content { display: block !important; }
            .print-mt-0 { margin-top: 0 !important; }
          }
        `}
      </style>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-16 h-16 text-white animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white">AI đang biên soạn Đề thi theo đúng ma trận...</h2>
          <p className="text-white/80 mt-2">Đang phân tích cấu trúc TNKQ, Đúng/Sai và Tự luận. Vui lòng chờ 10 - 20 giây.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex-grow w-full">
        
        {/* Toolbar Cập nhật thêm bản quyền tác giả */}
        <div className="bg-indigo-700 text-white p-4 flex flex-col md:flex-row justify-between items-center no-print">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <FileSpreadsheet className="w-6 h-6" />
              <h1 className="text-xl font-bold">Hệ Thống Thiết Kế Đề Kiểm Tra KHTN 8</h1>
            </div>
            <div className="text-indigo-200 text-sm mt-1 flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span className="italic font-medium">Bản quyền tác giả: {authorName}</span>
            </div>
          </div>
          <div className="flex space-x-3 flex-wrap justify-center gap-y-2 mt-2 md:mt-0">
            <button 
              onClick={generateWithAI} 
              disabled={isGenerating}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded text-sm font-bold shadow-md transition"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Soạn Đặc Tả & Đề Thi (Bằng AI)
            </button>
            <div className="w-px h-8 bg-indigo-500 hidden md:block mx-2"></div>
            <button onClick={exportToWord} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition shadow-md">
              <FileText className="w-4 h-4 mr-2" />
              Xuất Word (Trọn bộ)
            </button>
            <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-sm font-medium transition shadow-md">
              <Printer className="w-4 h-4 mr-2" />
              In / Xuất PDF
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-100 no-print px-6 pt-4 space-x-2 overflow-x-auto">
          <button onClick={() => setActiveTab('matran')} className={`px-4 py-3 rounded-t-lg font-semibold flex items-center transition whitespace-nowrap ${activeTab === 'matran' ? 'bg-white border-t border-l border-r border-gray-200 text-indigo-700' : 'text-gray-500 hover:bg-gray-200'}`}>
            <FileSpreadsheet className="w-4 h-4 mr-2"/> 1. Ma trận đề
          </button>
          <button onClick={() => setActiveTab('dacta')} className={`px-4 py-3 rounded-t-lg font-semibold flex items-center transition whitespace-nowrap ${activeTab === 'dacta' ? 'bg-white border-t border-l border-r border-gray-200 text-indigo-700' : 'text-gray-500 hover:bg-gray-200'}`}>
            <BookOpen className="w-4 h-4 mr-2"/> 2. Bảng đặc tả
          </button>
          <button onClick={() => setActiveTab('dethi')} className={`px-4 py-3 rounded-t-lg font-semibold flex items-center transition whitespace-nowrap ${activeTab === 'dethi' ? 'bg-white border-t border-l border-r border-gray-200 text-indigo-700' : 'text-gray-500 hover:bg-gray-200'}`}>
            <FileQuestion className="w-4 h-4 mr-2"/> 3. Đề thi & Bài làm
          </button>
          <button onClick={() => setActiveTab('dapan')} className={`px-4 py-3 rounded-t-lg font-semibold flex items-center transition whitespace-nowrap ${activeTab === 'dapan' ? 'bg-white border-t border-l border-r border-gray-200 text-indigo-700' : 'text-gray-500 hover:bg-gray-200'}`}>
            <CheckSquare className="w-4 h-4 mr-2"/> 4. Đáp án
          </button>
        </div>

        <div className="p-6 md:p-8" id="printable-area">
          
          {/* === TAB 1: MA TRẬN === */}
          <div className={`tab-content ${activeTab === 'matran' ? 'block' : 'hidden print:block'}`}>
            
            {/* Header Thông tin chung */}
            <div className="flex flex-col md:flex-row justify-between mb-8 print-header">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <input 
                  className="font-bold text-lg uppercase w-full md:w-80 border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none transition-colors text-center md:text-left block"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
                <input 
                  className="font-bold text-lg uppercase w-full md:w-80 border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none transition-colors text-center md:text-left block underline"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
                <div className="flex items-center mt-2 justify-center md:justify-start">
                  <span className="font-bold mr-2">MÃ ĐỀ: </span>
                  <input 
                    className="font-bold border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none text-center w-20"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center font-bold text-xl uppercase flex-1 flex flex-col items-center">
                <input 
                  className="text-center w-full max-w-2xl border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
                <div className="flex items-center justify-center mt-2 space-x-2">
                  <span>MÔN</span>
                  <input 
                    className="text-center uppercase max-w-xs border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <input 
                  className="text-center mt-2 w-full max-w-sm border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-600 text-lg"
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 no-print">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian làm bài</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  value={timeTime}
                  onChange={(e) => setTimeTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày thi</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điểm / Câu TN</label>
                <input 
                  type="number" step="0.1"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  value={scorePerTN}
                  onChange={(e) => setScorePerTN(parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điểm / Câu Đ/S (4 ý)</label>
                <input 
                  type="number" step="0.1"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  value={scorePerTNDS}
                  onChange={(e) => setScorePerTNDS(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Bảng Ma Trận */}
            <div className="font-bold text-lg mb-2">I. MA TRẬN ĐỀ KIỂM TRA</div>
            <div className="overflow-x-auto w-full print-page-break">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead className="bg-gray-100 text-gray-800 text-center font-medium">
                  <tr>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-10">TT</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-40">Chương/Chủ đề</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-56">Nội dung/Đơn vị kiến thức</th>
                    <th colSpan={9} className="border border-gray-400 p-2">Mức độ đánh giá</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-16">Tổng số câu</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-16">Tỉ lệ %</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-10 no-print"></th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs">TNKQ nhiều lựa chọn</th>
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs bg-yellow-50/50">TNKQ Đúng/Sai</th>
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs bg-blue-50/50">Tự luận</th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-400 p-1 w-10 text-xs">B</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs">H</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs">VD</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-yellow-50/50">B</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-yellow-50/50">H</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-yellow-50/50">VD</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-blue-50/50">B</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-blue-50/50">H</th>
                    <th className="border border-gray-400 p-1 w-10 text-xs bg-blue-50/50">VD</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const rowTN = row.nb_tn + row.th_tn + row.vd_tn;
                    const rowTNDS = row.nb_tnds + row.th_tnds + row.vd_tnds;
                    const rowTL = row.nb_tl + row.th_tl + row.vd_tl;
                    const rowScore = calculateRowScore(row);
                    const percent = totalScore > 0 ? ((rowScore / totalScore) * 100).toFixed(1) : 0;
                    const rowTotalCount = rowTN + rowTNDS + rowTL;

                    return (
                      <tr key={row.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-400 p-1">
                          <textarea 
                            className="w-full p-1 bg-transparent border-transparent hover:border-gray-300 focus:border-indigo-500 focus:ring-0 rounded resize-none"
                            rows={3} value={row.chapter} onChange={(e) => updateRow(row.id, 'chapter', e.target.value)} placeholder="Tên chủ đề..."
                          />
                        </td>
                        <td className="border border-gray-400 p-1">
                          <textarea 
                            className="w-full p-1 bg-transparent border-transparent hover:border-gray-300 focus:border-indigo-500 focus:ring-0 rounded resize-none"
                            rows={3} value={row.content} onChange={(e) => updateRow(row.id, 'content', e.target.value)} placeholder="Nội dung..."
                          />
                        </td>
                        
                        {/* TNKQ */}
                        <td className="border border-gray-400 p-1"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.nb_tn || ''} onChange={(e) => updateRow(row.id, 'nb_tn', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.th_tn || ''} onChange={(e) => updateRow(row.id, 'th_tn', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.vd_tn || ''} onChange={(e) => updateRow(row.id, 'vd_tn', e.target.value)} /></td>
                        
                        {/* TNKQ Đ/S */}
                        <td className="border border-gray-400 p-1 bg-yellow-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.nb_tnds || ''} onChange={(e) => updateRow(row.id, 'nb_tnds', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1 bg-yellow-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.th_tnds || ''} onChange={(e) => updateRow(row.id, 'th_tnds', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1 bg-yellow-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.vd_tnds || ''} onChange={(e) => updateRow(row.id, 'vd_tnds', e.target.value)} /></td>
                        
                        {/* Tự luận */}
                        <td className="border border-gray-400 p-1 bg-blue-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.nb_tl || ''} onChange={(e) => updateRow(row.id, 'nb_tl', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1 bg-blue-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.th_tl || ''} onChange={(e) => updateRow(row.id, 'th_tl', e.target.value)} /></td>
                        <td className="border border-gray-400 p-1 bg-blue-50/30"><input type="number" step="0.5" min="0" className="w-full text-center bg-transparent border-none focus:ring-0 p-1" value={row.vd_tl || ''} onChange={(e) => updateRow(row.id, 'vd_tl', e.target.value)} /></td>

                        {/* Tổng & Tỉ lệ */}
                        <td className="border border-gray-400 p-2 text-center font-bold bg-indigo-50/50">{rowTotalCount > 0 ? rowTotalCount : ''}</td>
                        <td className="border border-gray-400 p-2 text-center font-bold text-indigo-700">{percent}%</td>
                        
                        <td className="border border-gray-400 p-1 text-center no-print">
                          <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition">
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* DÒNG TỔNG CỘNG */}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={3} className="border border-gray-400 p-3 text-center uppercase">Tổng cộng</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700">{totals.nb_tn > 0 ? totals.nb_tn : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700">{totals.th_tn > 0 ? totals.th_tn : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700">{totals.vd_tn > 0 ? totals.vd_tn : ''}</td>
                    
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-yellow-50/50">{totals.nb_tnds > 0 ? totals.nb_tnds : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-yellow-50/50">{totals.th_tnds > 0 ? totals.th_tnds : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-yellow-50/50">{totals.vd_tnds > 0 ? totals.vd_tnds : ''}</td>
                    
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-blue-50/50">{totals.nb_tl > 0 ? totals.nb_tl : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-blue-50/50">{totals.th_tl > 0 ? totals.th_tl : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-indigo-700 bg-blue-50/50">{totals.vd_tl > 0 ? totals.vd_tl : ''}</td>
                    
                    <td className="border border-gray-400 p-2 text-center text-red-600 text-base bg-red-50">{totalTN + totalTNDS + totalTL > 0 ? totalTN + totalTNDS + totalTL : ''}</td>
                    <td className="border border-gray-400 p-2 text-center text-red-600 text-base">
                      {totalScore > 0 ? '100%' : '0%'}
                    </td>
                    <td className="border border-gray-400 no-print"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 no-print flex justify-between items-center">
              <button onClick={addRow} className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 rounded-md font-medium transition">
                <Plus className="w-4 h-4 mr-1" /> Thêm chủ đề kiến thức
              </button>
            </div>
          </div>

          {/* === TAB 2: BẢNG ĐẶC TẢ === */}
          <div className={`tab-content print-page-break ${activeTab === 'dacta' ? 'block' : 'hidden print:block'}`}>
            <div className="font-bold text-lg mb-4 print:mt-8">II. BẢNG ĐẶC TẢ ĐỀ KIỂM TRA</div>
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead className="bg-gray-100 text-gray-800 text-center font-medium">
                  <tr>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-10">TT</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-32">Chủ đề</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-48">Nội dung/<br/>Đơn vị kiến thức</th>
                    <th rowSpan={3} className="border border-gray-400 p-2 w-80">Yêu cầu cần đạt</th>
                    <th colSpan={9} className="border border-gray-400 p-2">Số lượng câu hỏi ở các mức độ</th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th colSpan={6} className="border border-gray-400 p-1 text-xs">Trắc nghiệm KQ</th>
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs bg-blue-50/50">Tự luận</th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs">Nhiều lựa chọn</th>
                    <th colSpan={3} className="border border-gray-400 p-1 text-xs bg-yellow-50/50">Đúng - Sai</th>
                    <th className="border border-gray-400 p-1 w-8 text-xs bg-blue-50/50">B</th>
                    <th className="border border-gray-400 p-1 w-8 text-xs bg-blue-50/50">H</th>
                    <th className="border border-gray-400 p-1 w-8 text-xs bg-blue-50/50">VD</th>
                  </tr>
                  <tr className="bg-gray-200">
                    <th colSpan={4} className="border border-gray-400 p-0 h-0"></th>
                    <th className="border border-gray-400 p-1 w-8 text-xs">B</th><th className="border border-gray-400 p-1 w-8 text-xs">H</th><th className="border border-gray-400 p-1 w-8 text-xs">VD</th>
                    <th className="border border-gray-400 p-1 w-8 text-xs bg-yellow-50/50">B</th><th className="border border-gray-400 p-1 w-8 text-xs bg-yellow-50/50">H</th><th className="border border-gray-400 p-1 w-8 text-xs bg-yellow-50/50">VD</th>
                    <th colSpan={3} className="border border-gray-400 p-0 h-0 bg-blue-50/50"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={`dacta-${row.id}`} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="border border-gray-400 p-2 text-center">{index + 1}</td>
                      <td className="border border-gray-400 p-2 font-medium">{row.chapter}</td>
                      <td className="border border-gray-400 p-2">{row.content}</td>
                      <td className="border border-gray-400 p-2 text-justify text-sm leading-relaxed">
                        {/* Nhận biết */}
                        <div className="mb-2">
                          <span className="font-bold block text-gray-700">Nhận biết:</span>
                          <textarea className="w-full bg-transparent border border-dashed border-transparent hover:border-gray-300 focus:border-indigo-500 focus:ring-0 rounded resize-y min-h-[40px] text-sm" value={row.req_nb} onChange={(e) => updateRow(row.id, 'req_nb', e.target.value)} placeholder="(Nhập hoặc dùng AI sinh)..."/>
                        </div>
                        {/* Thông hiểu */}
                        <div className="mb-2">
                          <span className="font-bold block text-gray-700">Thông hiểu:</span>
                          <textarea className="w-full bg-transparent border border-dashed border-transparent hover:border-gray-300 focus:border-indigo-500 focus:ring-0 rounded resize-y min-h-[40px] text-sm" value={row.req_th} onChange={(e) => updateRow(row.id, 'req_th', e.target.value)} placeholder="(Nhập hoặc dùng AI sinh)..."/>
                        </div>
                        {/* Vận dụng */}
                        <div>
                          <span className="font-bold block text-gray-700">Vận dụng:</span>
                          <textarea className="w-full bg-transparent border border-dashed border-transparent hover:border-gray-300 focus:border-indigo-500 focus:ring-0 rounded resize-y min-h-[40px] text-sm" value={row.req_vd} onChange={(e) => updateRow(row.id, 'req_vd', e.target.value)} placeholder="(Nhập hoặc dùng AI sinh)..."/>
                        </div>
                      </td>
                      
                      {/* Cột số lượng */}
                      <td className="border border-gray-400 p-2 text-center font-semibold text-indigo-700">{row.nb_tn || ''}</td>
                      <td className="border border-gray-400 p-2 text-center font-semibold text-indigo-700">{row.th_tn || ''}</td>
                      <td className="border border-gray-400 p-2 text-center font-semibold text-indigo-700">{row.vd_tn || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-yellow-50/50 font-semibold text-indigo-700">{row.nb_tnds || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-yellow-50/50 font-semibold text-indigo-700">{row.th_tnds || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-yellow-50/50 font-semibold text-indigo-700">{row.vd_tnds || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-blue-50/50 font-semibold text-indigo-700">{row.nb_tl || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-blue-50/50 font-semibold text-indigo-700">{row.th_tl || ''}</td>
                      <td className="border border-gray-400 p-2 text-center bg-blue-50/50 font-semibold text-indigo-700">{row.vd_tl || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Thêm nút + Thêm chủ đề kiến thức vào Tab Đặc tả */}
            <div className="mt-4 no-print flex justify-between items-center">
              <button onClick={addRow} className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 rounded-md font-medium transition">
                <Plus className="w-4 h-4 mr-1" /> Thêm chủ đề kiến thức
              </button>
            </div>

            {/* Chữ ký cuối Bảng đặc tả (Khi in) */}
            <div className="hidden print:flex flex-col mt-8">
              <div className="text-right italic pr-12 mb-2">
                Ngày .... tháng .... năm 20...
              </div>
              <div className="flex justify-between text-center mt-2 px-4">
                <div className="w-1/4">
                  <p className="font-bold">Duyệt của lãnh đạo</p>
                  <div className="h-24"></div>
                  <p className="font-bold">{signLeader}</p>
                </div>
                <div className="w-1/4">
                  <p className="font-bold">Duyệt của TT</p>
                  <div className="h-24"></div>
                  <p className="font-bold">{signHead}</p>
                </div>
                <div className="w-1/2">
                  <p className="font-bold">Giáo viên bộ môn ra đề</p>
                  <div className="h-24"></div>
                  <div className="flex justify-around">
                    <p className="font-bold">{signTeacher1}</p>
                    <p className="font-bold">{signTeacher2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cấu hình chữ ký */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg no-print">
              <h3 className="font-bold text-sm text-gray-700 mb-3">Cài đặt Chữ ký & Tác giả (Xuất hiện cuối file)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Lãnh đạo</label>
                  <input className="w-full p-2 text-sm border rounded" value={signLeader} onChange={e => setSignLeader(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Tổ trưởng</label>
                  <input className="w-full p-2 text-sm border rounded" value={signHead} onChange={e => setSignHead(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Giáo viên 1</label>
                  <input className="w-full p-2 text-sm border rounded" value={signTeacher1} onChange={e => setSignTeacher1(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Giáo viên 2</label>
                  <input className="w-full p-2 text-sm border rounded" value={signTeacher2} onChange={e => setSignTeacher2(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-bold text-indigo-700">Tên tác giả</label>
                  <input className="w-full p-2 text-sm border rounded bg-indigo-50 font-medium" value={authorName} onChange={e => setAuthorName(e.target.value)} />
                </div>
              </div>
            </div>

          </div>

          {/* === TAB 3: ĐỀ THI === */}
          <div className={`tab-content print-page-break ${activeTab === 'dethi' ? 'block' : 'hidden print:block'}`}>
            {/* Header Đề Thi khi in */}
            <div className="hidden print:flex justify-between mb-8 pb-4 border-b-2 border-black">
              <div className="text-center w-5/12">
                <div className="font-bold text-sm uppercase">{departmentName}</div>
                <div className="font-bold text-sm uppercase underline">{schoolName}</div>
                <div className="font-bold text-sm mt-4">ĐẾ {testCode}</div>
              </div>
              <div className="text-center w-7/12">
                <div className="font-bold text-lg">{examName}</div>
                <div className="font-bold text-sm">NĂM HỌC: ${schoolYear}</div>
                <div className="font-bold text-sm">Môn: {subject.toUpperCase()}</div>
                <div className="italic text-sm">(Thời gian làm bài: {timeTime}) Ngày: {examDate}</div>
              </div>
            </div>
            <div className="hidden print:block font-bold mb-4">Lớp: 8A..............</div>
            
            {/* Bảng điểm in */}
            <table className="hidden print:table w-full border-collapse mb-6" border="1">
              <tbody>
                <tr>
                  <td className="w-3/10 text-center font-bold">Điểm</td>
                  <td className="w-4/10 text-center font-bold">Lời phê của giáo viên</td>
                  <td className="w-3/10 text-center font-bold">Duyệt của BGH</td>
                </tr>
                <tr>
                  <td className="h-16 align-top p-2">Bằng số:<br/><br/>Bằng chữ:</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex justify-between mb-2 no-print">
              <div className="text-sm text-gray-500">* Mẹo: Sử dụng <code className="bg-gray-200 px-1 rounded">_{"chỉ_số"}</code> để viết dưới và <code className="bg-gray-200 px-1 rounded">^{"chỉ_số"}</code> để viết trên.</div>
            </div>

            {/* Trình soạn thảo và Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="no-print">
                <div className="font-bold text-sm mb-1 text-indigo-700">Khung Soạn Thảo Đề Thi</div>
                <textarea 
                  className="w-full min-h-[600px] p-4 border border-indigo-300 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 resize-y bg-white text-[14px]"
                  value={examContent}
                  onChange={(e) => setExamContent(e.target.value)}
                />
              </div>
              <div className="border border-gray-300 bg-white rounded-lg p-6 shadow-sm">
                <div className="font-bold text-sm mb-4 text-green-700 no-print border-b pb-2">Bản Xem Trước (Đề thi & BÀI LÀM sẽ xuất ra File Word)</div>
                {/* Preview Đề Thi */}
                <div 
                  className="leading-relaxed text-[15px]" 
                  dangerouslySetInnerHTML={renderFormattedPreview(examContent)} 
                />
                
                {/* Render Preview của BÀI LÀM trên màn hình */}
                <div dangerouslySetInnerHTML={{ __html: baiLamHTML }} />
              </div>
            </div>
          </div>

          {/* === TAB 4: ĐÁP ÁN === */}
          <div className={`tab-content print-page-break ${activeTab === 'dapan' ? 'block' : 'hidden print:block'}`}>
            <div className="text-center font-bold text-xl uppercase mb-6 print-mt-0">ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="no-print">
                <div className="font-bold text-sm mb-1 text-indigo-700">Khung Soạn Thảo Đáp Án</div>
                <textarea 
                  className="w-full min-h-[600px] p-4 border border-indigo-300 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500 resize-y bg-white text-[14px]"
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                />
              </div>
              <div className="border border-gray-300 bg-white rounded-lg p-6 shadow-sm">
                <div className="font-bold text-sm mb-4 text-green-700 no-print border-b pb-2">Bản Xem Trước (Đáp án sẽ xuất ra File Word)</div>
                <div 
                  className="leading-relaxed text-[15px]" 
                  dangerouslySetInnerHTML={renderFormattedPreview(answerContent)} 
                />
                <div className="text-right font-bold italic mt-8 text-indigo-800">{authorName}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Tác Giả App */}
      <div className="text-center text-gray-500 text-sm mt-8 pb-4 no-print font-medium">
        &copy; {new Date().getFullYear()} - Ứng dụng được phát triển dựa trên ý tưởng thiết kế của <span className="text-indigo-600 font-bold">{authorName}</span>.
      </div>
    </div>
  );
}