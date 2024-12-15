<div align="center">
  
  <h2>VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY</h2>
  <h3>UNIVERSITY OF TECHNOLOGY</h3>
  <h3>FACULTY OF COMPUTER SCIENCE AND ENGINEERING</h3>
  
  <br />
  
  <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoasang.png" alt="logo" style="width: 350px; height: auto;">
  
  <br />
  <br />

</div>

<h2 align="center">Semester 241</h2>
<h2 align="center">💡 Project: HCMUT_SSPS: Student Smart Printing Service 💡</h2>
<h3 align="center">💡 Class: CC01 - Group: 08  💡</h2>


---

<h2 align="center">⚒️ Languages - Frameworks - Tools ⚒️</h2>

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,javascript,vite,react,nodejs,vscode,github,git,md" alt="Tools and Languages" />
</div>

---

## Team Members

- **Nguyen Quang Phu**: 2252621
- **Nguyen Ngoc Khoi**: 2252378
- **Nguyen Nhat Khoi**: 2252379
- **Nguyen Minh Khoi**: 2252376
- **Nguyen Quang Vinh**: 2213973

---

<!-- <h2 align="center">📂 Dataset Links for Kaggle Notebooks 📂</h2>

<div align="center">
  <a href="https://www.kaggle.com/datasets/zphudzz/dath-pdz">Dataset 1: final_dataset_v1_afternb1.csv</a><br />
  <a href="https://www.kaggle.com/datasets/zphudzz/pdz-dath-ds">Dataset 2: output_w2v.txt</a>
</div> -->

<!-- <h2 align="center">💾 File Structure for Local Work 💾</h2>

<div align="center">
  If you want to download the datasets to work locally, here's the suggested way to arrange the files:
  <br /><br />
  <img src="Capture.PNG" alt="File Structure" style="width: 350px; height: auto;">
</div> -->

## Overview

The **Student Smart Printing Service (HCMUT_SSPS)** is a web and mobile application designed to serve students at the university by providing an easy-to-use, efficient document printing solution. The system connects students to printers across multiple campuses, allowing them to upload files, select a printer, and customize their printing preferences. The system also tracks usage, manages page allowances, and offers features for both students and administrators to view and manage their printing history.

---

## Features

### Student Features:
- **Upload Documents for Printing:** Students can upload supported file types for printing.
- **Printer Selection:** Choose from available printers across different campuses and buildings.
- **Customizable Print Settings:** Set print options such as paper size, pages to be printed, one-/double-sided, and number of copies.
- **Printing History:** View a detailed log of past print jobs, including the number of pages printed, printer used, and date.
- **Page Allowance Tracking:** Check your available page balance and view the breakdown of printed pages by size.
- **Buy Additional Pages:** Purchase more printing pages using the university's BKPay online payment system.
  
### Student Printing Service Officer (SPSO) Features:
- **Printer Management:** Add, enable, disable, or remove printers from the system.
- **System Configuration:** Adjust the default number of A4 pages given to students, configure permitted file types, and manage other system settings.
- **Viewing Logs:** View detailed printing history for all students or specific students, with filtering options based on date and printer.
- **Reporting:** Generate and view monthly and yearly usage reports on the printing system.
  
---

## System Architecture

### Printers:
- Each printer has a unique ID, brand name, model, a short description, and a physical location (campus, building, and room number).

### Authentication:
- All users (students and SPSO) are authenticated using the Google Authentication (OAuth 2.0) for demo instead of using the university's **HCMUT_SSO** authentication service.

### Web & Mobile:
- The system is accessible through both a web-based app and a mobile app, ensuring students can print documents from any device.

---

## Setup and Installation

### Prerequisites (MERN stack):
- **Node.js**: JavaScript runtime environment to run the backend code.
- **MongoDB**: Database for storing data.
- **React**: Frontend framework for building user interfaces.
- **Express**: Backend framework for handling server-side logic, routing, and API creation.

### Installation and Running Steps:

```bash
   git clone https://github.com/pdz1804/HCMUT-SSPS-241
   cd /HCMUT-SSPS-241
   cd /frontend
   npm init -y
   npm i
   cd ..
   npm init -y
   npm i
   npm run dev
```
--- 

<h2 align="center">💟 Contributors 💟</h2>

<div align="center">
  <a href="https://github.com/pdz1804"><img src="https://avatars.githubusercontent.com/u/123137268?v=4" title="pdz1804" width="50" height="50"></a>
  <a href="https://github.com/Frankie2030"><img src="https://avatars.githubusercontent.com/u/144931593?v=4" title="Frankie2030" width="50" height="50"></a>
  <a href="https://github.com/zphudzz"><img src="https://avatars.githubusercontent.com/u/121038510?v=4" title="zphudzz" width="50" height="50"></a>
</div>
