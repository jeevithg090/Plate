import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    L: any;
  }
}

type Student = {
  name: string;
  batch: string;
  email?: string;
  phone?: string;
  program?: string;
  id?: string;
};

type UniStudents = {
  name: string;
  location: string;
  students: Student[];
};

type Uni = {
  id: string;
  name: string;
  location: string;
  lat: number;
  lon: number;
};

const studentData: Record<string, UniStudents> = {
  "uw-madison": {
    name: "University of Wisconsin-Madison",
    location: "Madison, WI, USA",
    students: [
      { name: "RAKASI PRANAV REDDY", batch: "2018-2020", email: "pranavfootball20@gmail.com", phone: "9505716226", program: "CSE", id: "181627100" },
      { name: "ANNAMANENI SWATHI", batch: "2018-2020", email: "swathiannamaneni1998@gmail.com", phone: "8099684344", program: "CSE", id: "181627122" },
      { name: "NEIL BHUTADA", batch: "2018-2020", email: "neilbhutada@gmail.com", phone: "9766948332", program: "MECH", id: "181633005" },
      { name: "ACHE SAI AKARSH", batch: "2019-2021", email: "akarshache27@gmail.com", phone: "6305846332", program: "CSE", id: "191627002" },
      { name: "RUJUL ARORA", batch: "2019-2021", email: "arorarujul@gmail.com", phone: "9908894352", program: "CSE", id: "191627012" },
      { name: "SANYUKTA", batch: "2019-2021", email: "sanyukta.shubha@gmail.com", phone: "8777741637", program: "CSE", id: "191627023" },
      { name: "SIMRAN", batch: "2019-2021", email: "smileysim01@gmail.com", phone: "7456010770", program: "CSE", id: "191627101" },
      { name: "ARYAN DHAKA", batch: "2020-2022", email: "dhaka23aryan@gmail.com", phone: "8949490412", program: "CSE", id: "201627003" },
      { name: "REA MAMMEN", batch: "2020-2022", email: "reamammen09@gmail.com", phone: "9606816449", program: "CSE", id: "201627005" },
      { name: "ASHISH POLU", batch: "2020-2022", email: "ashishpolu9128@gmail.com", phone: "8897010204", program: "CSE", id: "201627006" },
      { name: "NARNE SURYA", batch: "2020-2022", email: "suryanarne@gmail.com", phone: "7032161976", program: "CSE", id: "201627022" },
      { name: "NISHANTH MOHAN NAIK", batch: "2020-2022", email: "nishanthnaik47@gmail.com", phone: "9008002320", program: "CSE", id: "201627023" },
      { name: "PRIYA PARASHAR", batch: "2020-2022", email: "priya.parashar@learner.manipal.edu", phone: "7987018344", program: "CSE", id: "201627082" },
      { name: "SANIKA CHOUDHARY", batch: "2021-2023", email: "sanikac2001@gmail.com", phone: "8668987625", program: "MECH", id: "211633001" },
      { name: "RAMANA RAVI", batch: "2021-2023", email: "ramanaravi08@gmail.com", phone: "9848550785", program: "MECH", id: "211633004" },
      { name: "MOHAMMED NADEEM", batch: "2021-2023", email: "nadeem46872@gmail.com", phone: "9989938836", program: "MECH", id: "211633010" },
      { name: "JOHN F ARADAN", batch: "2022-2024", email: "johnf.aradan2020@gmail.com", phone: "9048386008", program: "MECH", id: "221633001" },
      { name: "Soham Shah", batch: "2023-2025", email: "soham1010shah@gmail.com", phone: "9825471900", program: "CSE", id: "231627038" },
      { name: "Vansh Patel", batch: "2023-2025", email: "vansh.patel0712@gmail.com", phone: "9016149959", program: "MECH", id: "231633020" },
      { name: "Samved Vivek", batch: "2023-2025", email: "samved_vivek@outlook.com", phone: "9481477759", program: "CS", id: "231627041" },
    ],
  },
  uq: {
    name: "University of Queensland",
    location: "Brisbane, QLD, Australia",
    students: [
      { name: "PRANAV", batch: "2016-2018", email: "pranavprakash456@gmail.com", phone: "9074530419", program: "CSE", id: "201627046" },
      { name: "AMAN GUPTA", batch: "2016-2018", email: "aman.guptaaf21@gmail.com", phone: "8815954272", program: "CSE", id: "201627079" },
      { name: "REUBEN JONATHAN JOSEPH", batch: "2016-2018", email: "josephreuben2002@gmail.com", phone: "9799613015", program: "CSE", id: "201627080" },
      { name: "SURYANSH SINGH", batch: "2016-2018", email: "suryanshsingh587@gmail.com", phone: "8306276841", program: "CSE", id: "201627095" },
      { name: "SHASHWAT YADAV", batch: "2016-2018", email: "shashwatyadav1643@gmail.com", phone: "8787215270", program: "MECH", id: "201633011" },
    ],
  },
  "ohio-state": {
    name: "Ohio State University",
    location: "Columbus, OH, USA",
    students: [
      { name: "KUNAL SINGH", batch: "2011-2013", email: "kunal1220@live.com", program: "E&C" },
      { name: "M S SIDDHARTH RAO", batch: "2011-2013", email: "siddharth.msrao93@gmail.com", program: "mech" },
      { name: "ABHYUDAY DWIVEDI", batch: "2011-2013", email: "abhiyudaydwivedi007@gmail.com", program: "mech" },
      { name: "ABHISEK RATH", batch: "2011-2013", email: "abhisekrath92@gmail.com", program: "mech" },
      { name: "KUSHAGRA AGGARWAL", batch: "2011-2013", email: "kushagra.agg@gmail.com", program: "mech" },
      { name: "AVIRAL GUPTA", batch: "2011-2013", email: "aviral2223@hotmail.com", program: "mech" },
      { name: "BHARGAV BHATT", batch: "2011-2013", email: "bhargav_1993@yahoo.co.in", program: "IP" },
      { name: "S MANASSA", batch: "2012-2014", email: "priyamanassa@gmail.com", program: "E&C" },
      { name: "KRETEEKA CHAUDHURY", batch: "2013-2015", email: "kreteeka123@gmail.com", program: "mech" },
      { name: "AVIRAL VERMA", batch: "2015-2017", email: "aviral25@outlook.com", phone: "9838000054", program: "CSE" },
      { name: "SALIL MONGA", batch: "2017-2019", email: "monga.monga43@gmail.com", phone: "7888378305", program: "CSE", id: "171627098" },
      { name: "SINGAVARAPU LAKSHMI SURAG", batch: "2017-2019", email: "lsurag96@gmail.com", phone: "9949114704", program: "CSE", id: "171627103" },
      { name: "BHARGAV GANESH", batch: "2019-2021", email: "bhargavganesh131@gmail.com", phone: "8867272321", program: "CSE", id: "191627018" },
      { name: "PONUGUPATI NIPUN CHOWDARY", batch: "2020-2022", email: "nipun0727@gmail.com", phone: "7989327489", program: "CSE", id: "201627036" },
      { name: "FARHA BAHISHT", batch: "2020-2022", email: "farha.bahisht@gmail.com", phone: "9864234567", program: "CS", id: "201627051" },
      { name: "JATIN MAMTANI", batch: "2020-2022", email: "jatinm.2791@gmail.com", phone: "8890171871", program: "CSE", id: "201627100" },
      { name: "PRANAV SANJAY KHENY", batch: "2020-2022", email: "pranavkheny@gmail.com", phone: "9606555351", program: "CSE", id: "201627108" },
      { name: "DAKSH ASHISH PATEL", batch: "2020-2022", email: "daksh.patel2002@icloud.com", phone: "9016635194", program: "MECH", id: "201633006" },
      { name: "SAURAV RAFEE SABU", batch: "2021-2023", email: "sauravsabup123@gmail.com", phone: "8129062325", program: "MECH", id: "211633002" },
      { name: "CARLIN SIMON JOSEPH", batch: "2021-2023", email: "carlinjoseph@gmail.com", phone: "8281313495", program: "CSE", id: "211627042" },
      { name: "SWAPNIL DEBNATH", batch: "2022-2024", email: "swapnil.debnath@gmail.com", phone: "9512347890", program: "MECH", id: "221633003" },
      { name: "AASHI SHARMA", batch: "2022-2024", email: "aashi.sharma@gmail.com", phone: "9876543210", program: "MECH", id: "221633002" },
      { name: "VINAYAK SEHGAL", batch: "2022-2024", email: "vinayak.sehgal@gmail.com", phone: "9988776655", program: "CSE", id: "221627008" },
      { name: "SAI CHANDAN REDDY P", batch: "2019-2021", email: "saichandanreddy@gmail.com", phone: "9177242880", program: "CSE", id: "191627063" },
    ],
  },
  "suny-buffalo": {
    name: "University at Buffalo (SUNY)",
    location: "Buffalo, NY, USA",
    students: [
      { name: "SIDDHARTH VERMA", batch: "2010-2012", email: "sidv02@gmail.com", program: "mech" },
      { name: "KARISHMACHANDRAHAS SHETTY", batch: "2011-2013", email: "shetty_karishma93@yahoo.com", program: "null" },
      { name: "AJIT BHAT", batch: "2011-2013", email: "ajitbhat_9@yahoo.co.in", program: "MECH" },
      { name: "SANYUKTA BHASKAR", batch: "2013-2015", email: "sanyukta772@gmail.com", program: "civil" },
      { name: "KANISHK SURI", batch: "2013-2015", email: "kanishk.suri1995@gmail.com", program: "mech" },
      { name: "SEYADU ABDUL CADER NOOMAR NAINA MOHAMED", batch: "2015-2017", email: "nooamr97@gmail.com", program: "CE" },
      { name: "AYUSHI MUKHERJI", batch: "2015-2017", email: "mukherji.ayushi@gmail.com", phone: "8510901145", program: "MECH" },
      { name: "RUPALI KOTINA", batch: "2015-2017", email: "kotinarupali@gmail.com", phone: "7978700345/9108768343", program: "CSE" },
      { name: "JUSHKA DAS", batch: "2015-2017", email: "jushkadas.in@gmail.com", phone: "9108768775", program: "CSE" },
      { name: "MUKUL CHHABRA", batch: "2017-2019", email: "mukulchhabra23@gmail.com", phone: "9591331732", program: "CSE", id: "171627007" },
      { name: "KASINADHUNI SHASHANK", batch: "2017-2019", email: "kassh2017@gmail.com", phone: "8105777789", program: "CSE", id: "171627063" },
      { name: "A SHARAN SRINIVAS", batch: "2018-2020", email: "Sharan.androdo@gmail.com", phone: "9880295627", program: "CSE", id: "181627101" },
      { name: "OSHO PRIYA", batch: "2018-2020", email: "oshu.priya@gmail.com", phone: "7828003666", program: "CS", id: "181627131" },
      { name: "ANIKET KANTILAL CHOVATIYA", batch: "2018-2020", email: "aniketchovatiya33@gmail.com", phone: "9974447432", program: "MECH", id: "181633006" },
      { name: "Yasharth Jain", batch: "2019-2021", email: "yasharth.jain@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627004" },
      { name: "Chirag Agrawal", batch: "2019-2021", email: "chirag.agrawal@learner.manipal.edu", phone: "8888888888", program: "MECH", id: "191633005" },
      { name: "HARSHWARDHAN KOTHARI", batch: "2020-2022", email: "harshwardhan.kothari@gmail.com", phone: "8518007000", program: "CSE", id: "201627062" },
      { name: "GONA VIRINCHI", batch: "2020-2022", email: "gonavirinchi2003@gmail.com", phone: "8500608368", program: "CSE", id: "201627088" },
      { name: "YELMELA VISHAL", batch: "2020-2022", email: "vishalyelmela@gmail.com", phone: "9392833779", program: "CSE", id: "201627092" },
      { name: "BIKKINA BALA SRI SANTOSH", batch: "2020-2022", email: "bikkinasanthosh@gmail.com", phone: "7373294999", program: "CSE", id: "201627101" },
      { name: "M MEHUL", batch: "2021-2023", email: "mehulsiddharth2@gmail.com", phone: "9986348425", program: "CSE", id: "211627001" },
      { name: "SURAKANTI SRISHANTH REDDY", batch: "2021-2023", email: "srisanth.surakanti@gmail.com", phone: "9908008892", program: "CSE", id: "211627002" },
      { name: "SPARSH AGARWALLA", batch: "2021-2023", email: "agarwallasparsh@gmail.com", phone: "9832262228", program: "CSE", id: "211627009" },
      { name: "NAVANEETH KRISHNA NAKKA", batch: "2021-2023", email: "navaneethnakka03@gmail.com", phone: "9948498877", program: "CSE", id: "211627011" },
      { name: "RUSHIKESH SAHU", batch: "2021-2023", email: "rushikeshsahu7@gmail.com", phone: "8280629555", program: "CSE", id: "211627012" },
      { name: "TUSHAR JANGRA", batch: "2021-2023", email: "tusharjangra588@gmail.com", phone: "9671199341", program: "CSE", id: "211627013" },
      { name: "PANNALA PRAHALADH REDDY", batch: "2021-2023", email: "reddy.prahaladh.1999@gmail.com", phone: "9392289600", program: "CSE", id: "211627015" },
      { name: "DENDI REVANTH REDDY", batch: "2021-2023", email: "revanthdendi@gmail.com", phone: "9121696666", program: "CSE", id: "211627016" },
      { name: "ARYAN BALMERI", batch: "2021-2023", email: "aryanbalmeri@gmail.com", phone: "8310328221", program: "MECH", id: "211633005" },
    ],
  },
  "arizona-state": {
    name: "Arizona State University",
    location: "Tempe, AZ, USA",
    students: [
      { name: "SHAURYA AGGARWAL", batch: "2014-2016", email: "shauryamufc@gmail.com", program: "Biotech", id: "141610057" },
      { name: "SARIDE SAI PRANEETH", batch: "2016-2018", email: "dimpu2998@gmail.com", phone: "9885894771/9963609365", program: "Mech", id: "161633020" },
      { name: "PRASHEEL MANOJ PATEL", batch: "2017-2019", email: "prasheel12@gmail.com", phone: "9512347890", program: "null", id: "171627016" },
      { name: "Priyansh Jain", batch: "2019-2021", email: "priyansh.jain@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633002" },
      { name: "Priyanka Gupta", batch: "2019-2021", email: "priyanka.gupta@learner.manipal.edu", phone: "8888888888", program: "CSE", id: "191627006" },
      { name: "ANAGHA GIRISH", batch: "2020-2022", email: "anaghagirish18@gmail.com", phone: "8136863924", program: "Avi", id: "201623003" },
      { name: "MOHAMMED QASEM DASHTI", batch: "2020-2022", email: "mqasemdashti@gmail.com", phone: "7022217979", program: "MECH", id: "201633008" },
    ],
  },
  utd: {
    name: "University of Texas at Dallas",
    location: "Richardson, TX, USA",
    students: [
      { name: "Abhishek Jha", batch: "2019-2021", email: "abhishek.jha@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627005" },
      { name: "Gourav Garg", batch: "2019-2021", email: "gourav.garg@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627010" },
      { name: "SAI KARTHIKEYA VEMULAPALLI", batch: "2020-2022", email: "saikarthikeya.vemulapalli@gmail.com", phone: "9441011548", program: "CSE", id: "201627004" },
      { name: "SHRESTH PRAKASH", batch: "2018-2020", email: "shresthgpj@gmail.com", phone: "9408461877", program: "MECH", id: "181633010" },
    ],
  },
  uic: {
    name: "University of Illinois Chicago",
    location: "Chicago, IL, USA",
    students: [
      { name: "RAVULAPALLI VENKATA SAI MITHIL", batch: "2020-2022", email: "ravulapallimithil@gmail.com", phone: "9933317860", program: "CSE", id: "201627076" },
      { name: "Aman Gupta", batch: "2019-2021", email: "aman.gupta@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627003" },
      { name: "Deepak Choudhary", batch: "2019-2021", email: "deepak.choudhary@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627007" },
      { name: "Sumit Agarwal", batch: "2019-2021", email: "sumit.agarwal@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633003" },
      { name: "Vineet Jain", batch: "2019-2021", email: "vineet.jain@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627011" },
      { name: "G R POSHIK REDDY", batch: "2017-2019", email: "grposhikreddy@gmail.com", phone: "9908123232", program: "CSE", id: "171627083" },
    ],
  },
  deakin: {
    name: "Deakin University",
    location: "Melbourne, VIC, Australia",
    students: [{ name: "CHAKILAM AASHRITHA", batch: "2016-2018", email: "aashrithachakilam@gmail.com", phone: "7337427316", program: "CSE", id: "201627078" }],
  },
  "penn-state": {
    name: "Pennsylvania State University",
    location: "University Park, PA, USA",
    students: [
      { name: "SABUK GICHUIYA", batch: "2014-2016", email: "gsabuk@gmail.com", program: "CS", id: "141610013" },
      { name: "Pranav Kumar", batch: "2019-2021", email: "pranav.kumar@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627001" },
      { name: "Arpit Goyal", batch: "2019-2021", email: "arpit.goyal@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627009" },
      { name: "RAKSHIT SINGH BIST", batch: "2020-2022", email: "rakshittofficial@gmail.com", phone: "7897001276", program: "CSE", id: "201627070" },
      { name: "ANMOL GARG", batch: "2021-2023", email: "anmolgarg0306@gmail.com", phone: "9799222477", program: "CSE", id: "211627022" },
      { name: "PALLAPATI VIVEK RAO", batch: "2021-2023", email: "vrao.pallapati@gmail.com", phone: "9701777274", program: "CSE", id: "211627041" },
      { name: "LASYA MADHURI GUNDAPANENI", batch: "2022-2024", email: "lasyamadhuri@gmail.com", phone: "8106208882", program: "CSE", id: "221627004" },
      { name: "YAMINI S", batch: "2022-2024", email: "yaminis@gmail.com", phone: "9999988888", program: "CSE", id: "221627009" },
      { name: "PRANAV BALACHANDER", batch: "2022-2024", email: "pranav.b@gmail.com", phone: "9988776655", program: "MECH", id: "221633005" },
      { name: "Krish Goyal", batch: "2023-2025", email: "krishgoyal@gmail.com", phone: "9876543210", program: "MECH", id: "231633021" },
      { name: "Shivada Baiju Nair", batch: "2023-2025", email: "shivadanair@gmail.com", phone: "9988776655", program: "CSE", id: "231627040" },
      { name: "SAMUEL VARGHESE KODATHU", batch: "2016-2018", email: "samuelkv771998@gmail.com", phone: "9845068276", program: "Mech", id: "161633010" },
    ],
  },
  rutgers: {
    name: "Rutgers University",
    location: "New Brunswick, NJ, USA",
    students: [
      { name: "NIDHI KUMAR", batch: "2012-2014", email: "orange.nids@gmail.com", program: "Bio" },
      { name: "VARUN PANCHMAL", batch: "2016-2018", email: "varun.panchmal@gmail.com", phone: "9845314153/7795042305", program: "CSE", id: "161627006" },
      { name: "PYUSH SHIVAKUMAR", batch: "2017-2019", email: "pyushshiva@gmail.com", phone: "9663907740", program: "null", id: "171627002" },
      { name: "DISHA GOEL", batch: "2017-2019", email: "dishagoel1208@gmail.com", phone: "9654519932", program: "CSE", id: "171627082" },
      { name: "DEEPESH SHARMA", batch: "2019-2021", email: "deepesh.sharma@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627006" },
      { name: "ANKIT KUMAR", batch: "2019-2021", email: "ankit.kumar@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627008" },
      { name: "VIKALP SAINI", batch: "2019-2021", email: "vikalp.saini@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633004" },
      { name: "ADITYA VERMA", batch: "2019-2021", email: "aditya.verma@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627013" },
      { name: "PRIYANK AGRAWAL", batch: "2019-2021", email: "priyank.agrawal@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627014" },
      { name: "HARSHIT NARAYAN", batch: "2020-2022", email: "narayanharshit@icloud.com", phone: "8130930705", program: "CSE", id: "201627071" },
      { name: "SRI SATYA JAYANTH VORUGANTI", batch: "2021-2023", email: "sri.voruganti@gmail.com", phone: "9740552784", program: "CSE", id: "211627003" },
      { name: "SWAPNIL BOYAPATI", batch: "2021-2023", email: "swapnilboyapati@gmail.com", phone: "9440622956", program: "CSE", id: "211627004" },
      { name: "ANISH KUMAR NAIK", batch: "2021-2023", email: "anishnaik65@gmail.com", phone: "9604113220", program: "CSE", id: "211627006" },
      { name: "SATVIK ROHIRA", batch: "2021-2023", email: "satvikrohira@gmail.com", phone: "9902636906", program: "CSE", id: "211627007" },
      { name: "VINEESH KAMBALAPALLY", batch: "2021-2023", email: "vineeshk98@gmail.com", phone: "9989044949", program: "CSE", id: "211627008" },
      { name: "SANVITH REDDY M", batch: "2021-2023", email: "sanjithreddy1999@gmail.com", phone: "9845345719", program: "CSE", id: "211627010" },
      { name: "ATHARVA SINGH", batch: "2021-2023", email: "singhatharva8650@gmail.com", phone: "9766946029", program: "CSE", id: "211627021" },
      { name: "ADHIRAJ SINGH", batch: "2021-2023", email: "adhirajsingh003@gmail.com", phone: "9820543210", program: "MECH", id: "211633003" },
      { name: "GOPIT SINGHAL", batch: "2021-2023", email: "gopitsinghal@gmail.com", phone: "9717172778", program: "MECH", id: "211633007" },
      { name: "RAUT ARYAN SANDIP", batch: "2021-2023", email: "aryanraut.s@gmail.com", phone: "9822982276", program: "MECH", id: "211633008" },
      { name: "SONAL AGARWALA", batch: "2021-2023", email: "sonalagarwala25@gmail.com", phone: "9934333668", program: "CSE", id: "211627017" },
      { name: "AYAN DHANDA", batch: "2021-2023", email: "ayandhanda@gmail.com", phone: "9653066986", program: "MECH", id: "211633009" },
      { name: "BAAVANSH REDDY", batch: "2022-2024", email: "baavanshreddy@gmail.com", phone: "9966992200", program: "MECH", id: "221633006" },
    ],
  },
  "iowa-state": {
    name: "Iowa State University",
    location: "Ames, Iowa, USA",
    students: [
      { name: "REDIJ MRINAL MANOJ", batch: "2018-2020", email: "mrinalredij@gmail.com", phone: "8669181757", program: "AVIATION", id: "181623017" },
      { name: "NEMEER JALEEL", batch: "2014-2016", email: "nemeer.jaleel@gmail.com", program: "Mech", id: "141610028" },
      { name: "KEDIA NIKUNJ MANOJ", batch: "2014-2016", email: "nikunjkedia123@gmail.com", program: "Mech", id: "141610039" },
      { name: "SAHIL SALIM RAMANI", batch: "2014-2016", email: "sahilr@iastate.edu", program: "Mech", id: "141610232" },
      { name: "SHUBHAM RAY", batch: "2014-2016", email: "challengershubham@gmail.com", program: "Mech", id: "141610240" },
    ],
  },
  drexel: {
    name: "Drexel University",
    location: "Philadelphia, PA, USA",
    students: [
      { name: "SAURIN HIMANSHU SETHIA", batch: "2010-2012", email: "saurinsethia@gmail.com", program: "E&C" },
      { name: "ADITYA KOTHIWAL", batch: "2010-2012", email: "adityakothiwal@gmail.com", program: "CS" },
      { name: "KARAN HITESH PARIKH", batch: "2010-2012", email: "parikhkaran1991@gmail.com", program: "E&C" },
      { name: "BRANDON BOBBY FERNANDES", batch: "2011-2013", email: "brandon_fdes@live.com", program: "E&E" },
      { name: "MANIT KAUR SABHARWAL", batch: "2011-2013", email: "mks_93@hotmail.com", program: "biomed" },
      { name: "TIRTHAK SAHA", batch: "2011-2013", email: "tirthak04@gmail.com", program: "E&E" },
      { name: "PRIYANKA JAYPRAKASH KAREKAR", batch: "2011-2013", email: "priyanka.223@hotmail.com", program: "biomed" },
      { name: "SWARANGI JOSHI", batch: "2012-2014", email: "jswarangi@gmail.com", program: "CSE" },
      { name: "AYUSH DHAR", batch: "2012-2014", email: "balaji_dhar@yahoo.com", program: "E&C" },
      { name: "ARNAV JHAMB", batch: "2013-2015", email: "arnavslyz@gmail.com", program: "mech" },
      { name: "SHETTY ABHISHEK ASHOK", batch: "2013-2015", email: "shettyabh@gmail.com", program: "mech" },
      { name: "NILOTPAL CHOUDHURY", batch: "2014-2016", email: "god.nilu2@gmail.com", program: "Mech", id: "141610225" },
      { name: "SHREYA GULATI", batch: "2015-2017", email: "shreya7212@gmail.com", phone: "9108768177", program: "CSE" },
    ],
  },
  unt: {
    name: "University of North Texas",
    location: "Denton, Texas, USA",
    students: [
      { name: "SRUTHI KRISHNAKUMAR IYER", batch: "2018-2020", email: "sruthiki8@gmail.com", phone: "9446419080", program: "MSIT", id: "181627133" },
      { name: "SAI SRIRAM", batch: "2014-2016", email: "saisriramsirigudi@gmail.com", program: "ECE", id: "141610200" },
      { name: "GAYATRI KANDASWAMY", batch: "2015-2017", email: "gayatri.kandaswamy@gmail.com", phone: "8105777789", program: "ECE" },
    ],
  },
  uiuc: {
    name: "University of Illinois Urbana-Champaign",
    location: "Urbana, IL, USA",
    students: [
      { name: "GURMEHAR LUGANI", batch: "2010-2012", email: "gurmehar.lugani@gmail.com", program: "CS" },
      { name: "ANMOL SHRIVASTAVA", batch: "2010-2012", email: "anmolshrivastava22@gmail.com", program: "civil" },
      { name: "SIMMI SINGHH KAUR", batch: "2010-2012", email: "simmisingh.90@gmail.com", program: "E&E" },
      { name: "SUSHAN D SHEREGAR", batch: "2012-2014", email: "sushan_sheregar@in.com", program: "AEROSPACE" },
      { name: "SHRISTI SAHU", batch: "2012-2014", email: "shristisahu@hotmail.com", program: "Mech" },
      { name: "HAMZA KHAN", batch: "2012-2014", email: "hamzakhan15_7@hotmail.com", program: "null" },
      { name: "SANCHAY JAVERIA", batch: "2013-2015", email: "sanchay.javeria@gmail.com", program: "cs" },
      { name: "KAPILAN", batch: "2014-2016", email: "findkapilan@gmail.com", program: "Mech", id: "141610236" },
      { name: "MOHIT RAWAT", batch: "2014-2016", email: "mohitrawath8@gmail.com", program: "E&C", id: "141610252" },
      { name: "JAMES CYRIAC", batch: "2014-2016", email: "james.cyriac95@gmail.com", program: "CE", id: "141610255" },
      { name: "ROHEN AGARWAL", batch: "2018-2020", email: "rohanaryan1020@gmail.com", phone: "8160630196", program: "AVIATION", id: "181623015" },
      { name: "CHILAKALA YESHWANTH REDDY", batch: "2018-2020", email: "chyr828@gmail.com", phone: "9000973265", program: "CSE", id: "181627104" },
      { name: "AASHRAY KOTHA", batch: "2018-2020", email: "akotha041@gmail.com", phone: "7032359903", program: "CSE", id: "181627117" },
      { name: "VOLLIN MATHEW MAMMEN", batch: "2017-2019", email: "vollinmammen@gmail.com", program: "MECH", id: "171633004" },
      { name: "SANJANA THIRUPATHI", batch: "2015-2017", email: "sanjana.thirupathi@gmail.com", phone: "9029000750", program: "CSE" },
    ],
  },
  "wisc-milwaukee": {
    name: "University of Wisconsin-Milwaukee",
    location: "Milwaukee, WI, USA",
    students: [{ name: "ABHIROOP BARO", batch: "2015-2017", email: "abhiroopbaro121@gmail.com", phone: "9071939905/9435348639", program: "CE" }],
  },
  andrews: {
    name: "Andrews University",
    location: "Berrien Springs, Michigan, USA",
    students: [
      { name: "AKASH NIRANJAN", batch: "2010-2012", email: "akashniranjan@yahoo.com", program: "CS" },
      { name: "NIMMAGADDA VIJAY", batch: "2010-2012", email: "nvj.vijay65@gmail.com", program: "mech" },
      { name: "SHRIYANSH SINGH CHAUHAN", batch: "2010-2012", email: "sishu_chauhan@yahoo.com", program: "cs" },
      { name: "RAHULKUMAR PATEL", batch: "2018-2020", email: "rahul.patel@avm.edu.in", phone: "8401523000", program: "AVIATION", id: "181623020" },
    ],
  },
  "case-western": {
    name: "Case Western Reserve University",
    location: "Cleveland, OH, USA",
    students: [{ name: "SPARSH AGARWAL", batch: "2010-2012", email: "sparsh263@gmail.com", program: "E&C" }],
  },
  "texas-am": {
    name: "Texas A & M University",
    location: "College Station, TX, USA",
    students: [
      { name: "SHANTANU MISHRA", batch: "2010-2012", email: "mishrashantanu48@gmail.com", program: "chem" },
      { name: "MANIKONDA KAUSHIK", batch: "2011-2013", email: "rajakaushik77@gmail.com", program: "mech" },
    ],
  },
  minnesota: {
    name: "University of Minnesota-Twin Cities",
    location: "Minneapolis, MN, USA",
    students: [
      { name: "PRATEEK P GARAG", batch: "2012-2014", email: "pgarag@gmail.com", program: "AEROSPACE" },
      { name: "VIPUL SHARMA", batch: "2013-2015", email: "being.vipul@gmail.com", program: "civil" },
      { name: "VARUNCHANDWANI", batch: "2014-2016", email: "varunchandwani12@gmail.com", program: "E&C", id: "141610256" },
    ],
  },
  umd: {
    name: "University of Maryland",
    location: "College Park, MD, USA",
    students: [
      { name: "ASHWARYA RAJWARDAN", batch: "2012-2014", email: "arunsharmasharma@rediffmail.com", program: "E&C" },
      { name: "AISHWARYA VIJAY KUMAR", batch: "2015-2017", email: "aishwaryavijaykumar6@gmail.com", phone: "9963325599", program: "CSE" },
      { name: "SHUBHAM AGGARWAL", batch: "2015-2017", email: "aggshubham444@gmail.com", program: "CSE" },
    ],
  },
  "stony-brook": {
    name: "Stony Brook University",
    location: "Stony Brook, NY, USA",
    students: [
      { name: "VIBBHAV MITTAL", batch: "2012-2014", email: "vibbhav@gmail.com", program: "Mech" },
      { name: "ADARSH KUMAR", batch: "2013-2015", email: "kumaradarsh92@gmail.com", program: "cs" },
    ],
  },
  "south-dakota": {
    name: "South Dakota State University",
    location: "Brookings, SD, USA",
    students: [
      { name: "SANMATI JAIN", batch: "2011-2013", email: "sanmatijain08@gmail.com", program: "E&C" },
      { name: "RITVIK HANDA", batch: "2012-2014", email: "ritvikhanda@gmail.com", program: "CSE" },
      { name: "HARSHITA GAHLOT", batch: "2012-2014", email: "harshitagahlot27@gmail.com", program: "E&C" },
      { name: "KUSHAGRA SINGH", batch: "2013-2015", email: "kushagra_singh@live.com", program: "cs" },
      { name: "SIDHANTH J PILLAI", batch: "2014-2016", email: "sidharthjp@gmail.com", program: "Mech", id: "141610034" },
    ],
  },
  "uc-berkeley": {
    name: "University of California-Berkeley",
    location: "Berkeley, CA, USA",
    students: [{ name: "SHIYA KHANNA", batch: "2011-2013", email: "shiyakhanna13@gmail.com", program: "E&C" }],
  },
  "wichita-state": {
    name: "Wichita State University",
    location: "Wichita, KS, USA",
    students: [
      { name: "AADHAR JAIN", batch: "2013-2015", email: "aadhar_j@ymail.com", program: "mech" },
      { name: "RIPUDAMAN SINGH SHEKHAWAT", batch: "2015-2017", email: "ripudaman.shekhawat0@gmail.com", phone: "9108768422/8619163722", program: "MECH" },
      { name: "JAYDEEP HASMUKH BHALODIYA", batch: "2016-2018", email: "deepbhalodiya.db@gmail.com", phone: "7350288700", program: "AEROSPACE", id: "161623007" },
    ],
  },
  purdue: {
    name: "Purdue University",
    location: "West Lafayette, IN, USA",
    students: [
      { name: "HARSH PANDEY", batch: "2013-2015", email: "hpandeyofficial@gmail.com", program: "cs" },
      { name: "ANKUR KHETAN", batch: "2015-2017", email: "ankurkhetan2015@gmail.com", phone: "8583083862", program: "CE" },
    ],
  },
  "unc-charlotte": {
    name: "University of North Carolina at Charlotte",
    location: "Charlotte, NC, USA",
    students: [
      { name: "Rahul Kumar", batch: "2019-2021", email: "rahul.kumar@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627015" },
      { name: "Rohit Verma", batch: "2019-2021", email: "rohit.verma@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633004" },
    ],
  },
  usc: {
    name: "University of Southern California",
    location: "Los Angeles, CA, USA",
    students: [
      { name: "RUSHIL AGARWAL", batch: "2017-2019", email: "rushilagarwal9@gmail.com", phone: "9918980070", program: "CIVIL", id: "171626003" },
      { name: "Aakriti Singh", batch: "2019-2021", email: "aakriti.singh@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627002" },
      { name: "Vinay Verma", batch: "2019-2021", email: "vinay.verma@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633002" },
      { name: "Abhinav Singh", batch: "2019-2021", email: "abhinav.singh@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633003" },
    ],
  },
  syracuse: {
    name: "Syracuse University",
    location: "Syracuse, NY, USA",
    students: [
      { name: "Ayush Agrawal", batch: "2019-2021", email: "ayush.agrawal@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627001" },
      { name: "Anuj Goel", batch: "2019-2021", email: "anuj.goel@learner.manipal.edu", phone: "9999999999", program: "MECH", id: "191633001" },
    ],
  },
  northeastern: {
    name: "Northeastern University",
    location: "Boston, MA, USA",
    students: [
      { name: "Siddharth Dhiman", batch: "2019-2021", email: "siddharth.dhiman@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627003" },
      { name: "Gaurav Goel", batch: "2019-2021", email: "gaurav.goel@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627005" },
    ],
  },
  uta: {
    name: "University of Texas at Arlington",
    location: "Arlington, TX, USA",
    students: [
      { name: "Kartik Sharma", batch: "2019-2021", email: "kartik.sharma@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627004" },
      { name: "Abhishek Kumar", batch: "2019-2021", email: "abhishek.kumar@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627006" },
    ],
  },
  florida: {
    name: "University of Florida",
    location: "Gainesville, Florida, USA",
    students: [{ name: "Harsh Sharma", batch: "2019-2021", email: "harsh.sharma@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627008" }],
  },
  leibniz: {
    name: "Leibniz University of Hannover",
    location: "Hannover, Germany",
    students: [
      { name: "ABHISHEK SINHA", batch: "2015-2017", email: "abhishek.sinha@gmail.com", phone: "8093116565", program: "MECH", id: "151633013" },
      { name: "GURU PRASAD", batch: "2015-2017", email: "guru.prasad@gmail.com", phone: "9448135891", program: "MECH", id: "151633014" },
      { name: "HARSHIT JAIN", batch: "2015-2017", email: "harshit.jain@gmail.com", phone: "9782555544", program: "MECH", id: "151633015" },
    ],
  },
  concordia: {
    name: "Concordia University",
    location: "Montreal, QC, Canada",
    students: [
      { name: "SHASHI RANJAN", batch: "2014-2016", email: "shashi.ranjan@gmail.com", phone: "9876543210", program: "CS", id: "141610013" },
      { name: "ANSHUL", batch: "2015-2017", email: "anshul@gmail.com", phone: "9876543210", program: "CS", id: "151627013" },
    ],
  },
  "new-brunswick": {
    name: "University of New Brunswick",
    location: "Fredericton, NB, Canada",
    students: [
      { name: "RAVI SHANKAR", batch: "2014-2016", email: "ravi.shankar@gmail.com", phone: "9876543210", program: "MECH", id: "141633001" },
      { name: "SHUBHAM", batch: "2015-2017", email: "shubham@gmail.com", phone: "9876543210", program: "MECH", id: "151633001" },
    ],
  },
  "virginia-tech": {
    name: "Virginia Tech",
    location: "Blacksburg, VA, USA",
    students: [{ name: "KARTHIK AGNIHOTRI", batch: "2016-2018", email: "karthik.1698@gmail.com", phone: "9740083608", program: "Mech", id: "161633003" }],
  },
  "san-jose": {
    name: "San Jose State University",
    location: "San Jose, CA, USA",
    students: [{ name: "ARYAN VAID", batch: "2017-2019", email: "aryanvaid@yahoo.in", phone: "9999999999", program: "null", id: "171627068" }],
  },
  indiana: {
    name: "Indiana University",
    location: "Bloomington, IN, USA",
    students: [
      { name: "IBRAHIM AHMED FAROOQI", batch: "2019-2021", email: "ibrahim.farooqi@learner.manipal.edu", phone: "9999999999", program: "CSE", id: "191627001" },
      { name: "NALLA SAI NITIN RATNA", batch: "2021-2023", email: "ratnanitin@gmail.com", phone: "9908008880", program: "CSE", id: "211627043" },
      { name: "SAISANJEEV REDDY PEREDDY", batch: "2021-2023", email: "saisanjeev.pereddy@gmail.com", phone: "8106208882", program: "MECH", id: "211633006" },
    ],
  },
  msoe: {
    name: "Milwaukee School of Engineering",
    location: "Milwaukee, WI, USA",
    students: [
      { name: "VISHAL PRAGRIYA", batch: "2011-2013", email: "vishal619jain@gmail.com", program: "mech" },
      { name: "ANMOL SHARMA", batch: "2013-2015", email: "anmol54321@gmail.com", program: "mech" },
      { name: "ADITYA BEURA", batch: "2015-2017", email: "adibro1997@gmail.com", phone: "9776523833", program: "CE" },
      { name: "JOLLY P SATODIYA", batch: "2016-2018", email: "jolly.satodiya01@gmail.com", phone: "7023757231", program: "Mech", id: "161633007" },
    ],
  },
  mst: {
    name: "Missouri University of Science and Technology",
    location: "Rolla, MO, USA",
    students: [{ name: "THUMMA JOSEPH PRANAY REDDY", batch: "2023-2025", email: "pranayreddy.tj@gmail.com", phone: "8919692482", program: "CS", id: "231627042" }],
  },
};

const universities: Uni[] = [
  { id: "msoe", name: "Milwaukee School of Engineering", location: "Milwaukee, WI, USA", lat: 43.045, lon: -87.906 },
  { id: "andrews", name: "Andrews University", location: "Berrien Springs, Michigan, USA", lat: 41.9475, lon: -86.3597 },
  { id: "ndsu", name: "North Dakota State University", location: "Fargo, North Dakota, USA", lat: 46.897, lon: -96.802 },
  { id: "suny-buffalo", name: "University at Buffalo (SUNY)", location: "Buffalo, NY, USA", lat: 43.0008, lon: -78.789 },
  { id: "missouri", name: "University of Missouri", location: "Columbia, MO, USA", lat: 38.9456, lon: -92.3295 },
  { id: "drexel", name: "Drexel University", location: "Philadelphia, PA, USA", lat: 39.9566, lon: -75.1899 },
  { id: "dayton", name: "University of Dayton", location: "Dayton, Ohio, USA", lat: 39.7392, lon: -84.179 },
  { id: "wright-state", name: "Wright State University", location: "Dayton, Ohio, USA", lat: 39.7793, lon: -84.0646 },
  { id: "siu", name: "Southern Illinois University Carbondale", location: "Carbondale, IL, USA", lat: 37.715, lon: -89.219 },
  { id: "uwm", name: "University of Wisconsin-Milwaukee", location: "Milwaukee, WI, USA", lat: 43.0753, lon: -87.8828 },
  { id: "montana-state", name: "Montana State University", location: "Bozeman, Montana, USA", lat: 45.6689, lon: -111.0466 },
  { id: "unt", name: "University of North Texas", location: "Denton, Texas, USA", lat: 33.2104, lon: -97.1536 },
  { id: "iit", name: "Illinois Institute of Technology", location: "Chicago, IL, USA", lat: 41.8349, lon: -87.627 },
  { id: "uiuc", name: "University of Illinois Urbana-Champaign", location: "Urbana, IL, USA", lat: 40.102, lon: -88.2272 },
  { id: "uic", name: "University of Illinois Chicago", location: "Chicago, IL, USA", lat: 41.8708, lon: -87.6505 },
  { id: "scsu", name: "St. Cloud State University", location: "St. Cloud, MN, USA", lat: 45.548, lon: -94.149 },
  { id: "usa", name: "University of South Alabama", location: "Mobile, Alabama, USA", lat: 30.6954, lon: -88.1106 },
  { id: "purdue", name: "Purdue University", location: "West Lafayette, IN, USA", lat: 40.4237, lon: -86.9212 },
  { id: "uw-madison", name: "University of Wisconsin-Madison", location: "Madison, WI, USA", lat: 43.0766, lon: -89.4125 },
  { id: "umd", name: "University of Maryland", location: "College Park, MD, USA", lat: 38.9869, lon: -76.9426 },
  { id: "arizona", name: "University of Arizona", location: "Tucson, AZ, USA", lat: 32.2319, lon: -110.9501 },
  { id: "arizona-state", name: "Arizona State University", location: "Tempe, AZ, USA", lat: 33.421999, lon: -111.933 },
  { id: "iowa-state", name: "Iowa State University", location: "Ames, Iowa, USA", lat: 42.0267, lon: -93.6465 },
  { id: "nebraska", name: "University of Nebraska-Lincoln", location: "Lincoln, NE, USA", lat: 40.8202, lon: -96.7005 },
  { id: "virginia-tech", name: "Virginia Tech", location: "Blacksburg, VA, USA", lat: 37.2296, lon: -80.4244 },
  { id: "utd", name: "University of Texas at Dallas", location: "Richardson, TX, USA", lat: 32.9858, lon: -96.7501 },
  { id: "ohio-state", name: "Ohio State University", location: "Columbus, OH, USA", lat: 40.0076, lon: -83.0301 },
  { id: "penn-state", name: "Pennsylvania State University", location: "University Park, PA, USA", lat: 40.7982, lon: -77.8599 },
  { id: "rutgers", name: "Rutgers University", location: "New Brunswick, NJ, USA", lat: 40.5007, lon: -74.4479 },
  { id: "columbia", name: "Columbia University", location: "New York, NY, USA", lat: 40.8075, lon: -73.9626 },
  { id: "nyu", name: "New York University", location: "New York, NY, USA", lat: 40.7295, lon: -73.9965 },
  { id: "cornell", name: "Cornell University", location: "Ithaca, NY, USA", lat: 42.4534, lon: -76.4735 },
  { id: "boston", name: "Boston University", location: "Boston, MA, USA", lat: 42.3505, lon: -71.1054 },
  { id: "minnesota", name: "University of Minnesota-Twin Cities", location: "Minneapolis, MN, USA", lat: 44.974, lon: -93.227 },
  { id: "florida", name: "University of Florida", location: "Gainesville, Florida, USA", lat: 29.648, lon: -82.349 },
  { id: "vanderbilt", name: "Vanderbilt University", location: "Nashville, Tennessee, USA", lat: 36.1447, lon: -86.8027 },
  { id: "rochester", name: "University of Rochester", location: "Rochester, NY, USA", lat: 43.128, lon: -77.629 },
  { id: "case-western", name: "Case Western Reserve University", location: "Cleveland, OH, USA", lat: 41.505, lon: -81.608 },
  { id: "uc-berkeley", name: "University of California-Berkeley", location: "Berkeley, CA, USA", lat: 37.871, lon: -122.259 },
  { id: "massachusetts", name: "University of Massachusetts", location: "Amherst, MA, USA", lat: 42.386, lon: -72.53 },
  { id: "usc", name: "University of Southern California", location: "Los Angeles, CA, USA", lat: 34.022, lon: -118.285 },
  { id: "texas-am", name: "Texas A & M University", location: "College Station, TX, USA", lat: 30.618, lon: -96.336 },
  { id: "georgia-tech", name: "Georgia Tech", location: "Atlanta, GA, USA", lat: 33.775, lon: -84.396 },
  { id: "wichita-state", name: "Wichita State University", location: "Wichita, KS, USA", lat: 37.719, lon: -97.289 },
  { id: "embry-riddle", name: "Embry-Riddle Aeronautical University", location: "Daytona Beach, FL, USA", lat: 29.186, lon: -81.059 },
  { id: "south-dakota", name: "South Dakota State University", location: "Brookings, SD, USA", lat: 44.316, lon: -96.797 },
  { id: "stony-brook", name: "Stony Brook University", location: "Stony Brook, NY, USA", lat: 40.914, lon: -73.126 },
  { id: "cal-state", name: "California State University, Long Beach", location: "Long Beach, CA, USA", lat: 33.784, lon: -118.114 },
  { id: "washington-state", name: "Washington State University", location: "Pullman, WA, USA", lat: 46.729, lon: -117.181 },
  { id: "washington-seattle", name: "University of Washington", location: "Seattle, WA, USA", lat: 47.655, lon: -122.303 },
  { id: "kettering", name: "Kettering University", location: "Flint, MI, USA", lat: 43.016, lon: -83.705 },
  { id: "marquette", name: "Marquette University", location: "Milwaukee, WI, USA", lat: 43.038, lon: -87.929 },
  { id: "brown", name: "Brown University", location: "Providence, RI, USA", lat: 41.826, lon: -71.402 },
  { id: "colorado-boulder", name: "University of Colorado Boulder", location: "Boulder, CO, USA", lat: 40.007, lon: -105.266 },
  { id: "colorado-state", name: "Colorado State University", location: "Fort Collins, CO, USA", lat: 40.575, lon: -105.083 },
  { id: "san-jose", name: "San Jose State University", location: "San Jose, CA, USA", lat: 37.336, lon: -121.881 },
  { id: "north-florida", name: "University of North Florida", location: "Jacksonville, FL, USA", lat: 30.268, lon: -81.507 },
  { id: "san-francisco", name: "San Francisco State University", location: "San Francisco, CA, USA", lat: 37.721, lon: -122.479 },
  { id: "kansas-state", name: "Kansas State University", location: "Manhattan, KS, USA", lat: 39.19, lon: -96.58 },
  { id: "syracuse", name: "Syracuse University", location: "Syracuse, NY, USA", lat: 43.038, lon: -76.13 },
  { id: "uta", name: "University of Texas at Arlington", location: "Arlington, TX, USA", lat: 32.735, lon: -97.11 },
  { id: "northeastern", name: "Northeastern University", location: "Boston, MA, USA", lat: 42.339, lon: -71.089 },
  { id: "unc-charlotte", name: "University of North Carolina at Charlotte", location: "Charlotte, NC, USA", lat: 35.305, lon: -80.735 },
  { id: "mst", name: "Missouri University of Science and Technology", location: "Rolla, MO, USA", lat: 37.951, lon: -91.772 },
  { id: "indiana", name: "Indiana University", location: "Bloomington, IN, USA", lat: 39.165, lon: -86.526 },
  { id: "akron", name: "University of Akron", location: "Akron, OH, USA", lat: 41.083, lon: -81.512 },
  { id: "florida-tech", name: "Florida Institute of Technology", location: "Melbourne, FL, USA", lat: 28.064, lon: -80.623 },
  { id: "virginia-state", name: "Virginia State University", location: "Petersburg, VA, USA", lat: 37.234, lon: -77.427 },
  { id: "massachusetts-amherst", name: "University of Massachusetts Amherst", location: "Amherst, MA, USA", lat: 42.386, lon: -72.53 },
  { id: "deakin", name: "Deakin University", location: "Melbourne/Geelong, VIC, Australia", lat: -37.8474, lon: 144.9586 },
  { id: "uq", name: "University of Queensland", location: "Brisbane, QLD, Australia", lat: -27.4975, lon: 153.0137 },
  { id: "unsw", name: "University of New South Wales", location: "Sydney, NSW, Australia", lat: -33.917, lon: 151.231 },
  { id: "uts", name: "University of Technology Sydney", location: "Sydney, NSW, Australia", lat: -33.883, lon: 151.2 },
  { id: "qut", name: "Queensland University of Technology", location: "Brisbane, QLD, Australia", lat: -27.478, lon: 153.028 },
  { id: "rmit", name: "RMIT University", location: "Melbourne, VIC, Australia", lat: -37.807, lon: 144.963 },
  { id: "anu", name: "Australian National University", location: "Canberra, ACT, Australia", lat: -35.277, lon: 149.118 },
  { id: "usyd", name: "University of Sydney", location: "Sydney, NSW, Australia", lat: -33.888, lon: 151.187 },
  { id: "monash", name: "Monash University", location: "Clayton, VIC, Australia", lat: -37.911, lon: 145.134 },
  { id: "wollongong", name: "University of Wollongong", location: "Wollongong, NSW, Australia", lat: -34.406, lon: 150.88 },
  { id: "western-sydney", name: "Western Sydney University", location: "Sydney, NSW, Australia", lat: -33.729, lon: 150.999 },
  { id: "adelaide", name: "University of Adelaide", location: "Adelaide, SA, Australia", lat: -34.92, lon: 138.6 },
  { id: "macquarie", name: "Macquarie University", location: "Sydney, NSW, Australia", lat: -33.774, lon: 151.109 },
  { id: "federation", name: "Federation University", location: "Ballarat, VIC, Australia", lat: -37.568, lon: 143.85 },
  { id: "curtin", name: "Curtin University", location: "Perth, WA, Australia", lat: -31.954, lon: 115.87 },
  { id: "city-london", name: "City, University of London", location: "London, UK", lat: 51.5273, lon: -0.1025 },
  { id: "lancaster", name: "Lancaster University", location: "Lancaster, UK", lat: 54.005, lon: -2.785 },
  { id: "leicester", name: "University of Leicester", location: "Leicester, UK", lat: 52.622, lon: -1.125 },
  { id: "nottingham", name: "University of Nottingham", location: "Nottingham, UK", lat: 52.938, lon: -1.194 },
  { id: "birmingham", name: "University of Birmingham", location: "Birmingham, UK", lat: 52.45, lon: -1.93 },
  { id: "queen-mary", name: "Queen Mary University of London", location: "London, UK", lat: 51.523, lon: -0.043 },
  { id: "strathclyde", name: "University of Strathclyde", location: "Glasgow, UK", lat: 55.862, lon: -4.241 },
  { id: "heriot-watt", name: "Heriot-Watt University", location: "Edinburgh, UK", lat: 55.912, lon: -3.321 },
  { id: "edinburgh", name: "University of Edinburgh", location: "Edinburgh, UK", lat: 55.944, lon: -3.188 },
  { id: "london", name: "University of London", location: "London, UK", lat: 51.521, lon: -0.129 },
  { id: "uclan", name: "University of Central Lancashire", location: "Preston, UK", lat: 53.76, lon: -2.7 },
  { id: "manchester-met", name: "Manchester Metropolitan University", location: "Manchester, UK", lat: 53.465, lon: -2.233 },
  { id: "queens", name: "Queen's University", location: "Kingston, ON, Canada", lat: 44.225, lon: -76.495 },
  { id: "manitoba", name: "University of Manitoba", location: "Winnipeg, MB, Canada", lat: 49.809, lon: -97.137 },
  { id: "toronto", name: "University of Toronto", location: "Toronto, ON, Canada", lat: 43.6629, lon: -79.3957 },
  { id: "ubc", name: "University of British Columbia", location: "Vancouver, BC, Canada", lat: 49.26, lon: -123.251 },
  { id: "new-brunswick", name: "University of New Brunswick", location: "Fredericton, NB, Canada", lat: 45.952, lon: -66.643 },
  { id: "concordia", name: "Concordia University", location: "Montreal, QC, Canada", lat: 45.497, lon: -73.578 },
  { id: "carleton", name: "University of Carleton", location: "Ottawa, ON, Canada", lat: 45.385, lon: -75.698 },
  { id: "ucc", name: "University College Cork (UCC)", location: "Cork, Ireland", lat: 51.892, lon: -8.494 },
  { id: "tcd", name: "Trinity College Dublin (TCD)", location: "Dublin, Ireland", lat: 53.343, lon: -6.255 },
  { id: "esigelec", name: "Ecole Superieure D’ingenieurs De Rouen (ESIGELEC)", location: "Rouen, France", lat: 49.429, lon: 1.077 },
  { id: "leibniz", name: "Leibniz University of Hannover", location: "Hannover, Germany", lat: 52.383, lon: 9.715 },
  { id: "twente", name: "University of Twente", location: "Enschede, Netherlands", lat: 52.242, lon: 6.85 },
  { id: "groningen", name: "Groningen University", location: "Groningen, Netherlands", lat: 53.219, lon: 6.567 },
  { id: "academia-maribor", name: "Academia Maribor Slovenia", location: "Maribor, Slovenia", lat: 46.559, lon: 15.639 },
  { id: "manipal-miu", name: "Manipal International University", location: "Negeri Sembilan, Malaysia", lat: 2.8, lon: 101.81 },
  { id: "manipal-dubai", name: "Manipal University, Dubai", location: "Dubai, UAE", lat: 25.074, lon: 55.232 },
];

export default function UniversityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      if (!window.L || mapInstanceRef.current || !mapRef.current) return;

      const map = window.L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
      });

      window.L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      universities.forEach((u) => {
        const data = studentData[u.id];
        const hasStudents = !!(data && data.students && data.students.length > 0);
        const markerColor = hasStudents ? "#dc3545" : "#17a2b8";
        const markerIcon = window.L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color:${markerColor};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 3px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        let tooltip = `<div style="text-align:center;"><strong>${u.name}</strong><br><em style=\"color:#ccc;\">${u.location}</em>`;
        if (hasStudents) {
          const count = data.students.length;
          tooltip += `<br><div style=\"color:#4fc3f7;margin-top:8px;font-weight:bold;\">ICAS Students: ${count}</div>`;
          const display = data.students.slice(0, 3);
          display.forEach((s) => (tooltip += `<div style=\"font-size:10px;color:#ddd;\">• ${s.name}</div>`));
          if (count > 3) tooltip += `<div style=\"font-size:10px;color:#888;\">...and ${count - 3} more</div>`;
        } else {
          tooltip += `<br><div style=\"color:#17a2b8;margin-top:8px;\">ICAS Partner University</div>`;
        }
        tooltip += "</div>";

        const marker = window.L.marker([u.lat, u.lon], { icon: markerIcon }).addTo(map);
        marker.bindTooltip(tooltip, {
          permanent: false,
          direction: "top",
          offset: [0, -15],
          opacity: 0.95,
        });
        marker.on("click", () => setSelectedId(u.id));
      });

      mapInstanceRef.current = map;
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      link.remove();
      script.remove();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const closeModal = () => setSelectedId(null);

  const selected = selectedId ? studentData[selectedId] : null;
  const selectedUni = selectedId ? universities.find((u) => u.id === selectedId) : null;

  let cse = 0;
  let mech = 0;
  if (selected?.students) {
    cse = selected.students.filter((s) => s.program && (s.program.toUpperCase().includes("CSE") || s.program.toUpperCase().includes("CS"))).length;
    mech = selected.students.filter((s) => s.program && s.program.toUpperCase().includes("MECH")).length;
  }
  const other = selected ? Math.max(selected.students.length - cse - mech, 0) : 0;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-lg border bg-background/95 p-6 text-center shadow-xl">
            <h3 className="text-base font-semibold">Loading ICAS Partner Universities...</h3>
            <p className="mt-1 text-sm text-muted-foreground">Initializing interactive world map...</p>
          </div>
        </div>
      )}
      <div className="rounded-xl overflow-hidden ring-1 ring-border bg-slate-900">
        <div ref={mapRef} className="h-96 w-full" style={{ background: "#111" }} />
      </div>

      {selectedId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={closeModal} role="dialog" aria-modal="true">
          <div
            className="absolute left-1/2 top-1/2 w-[90%] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Close" onClick={closeModal}>
              ✕
            </button>
            <h2 className="text-xl font-bold text-sky-300">
              {selected ? selected.name : selectedUni?.name || "University"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{selected ? selected.location : selectedUni?.location}</p>

            {selected ? (
              <>
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  <div className="rounded-md border bg-background p-3 text-center">
                    <div className="text-2xl font-bold text-sky-300">{selected.students.length}</div>
                    <div className="text-xs text-muted-foreground">Total Students</div>
                  </div>
                  <div className="rounded-md border bg-background p-3 text-center">
                    <div className="text-2xl font-bold text-sky-300">{cse}</div>
                    <div className="text-xs text-muted-foreground">CS/CSE</div>
                  </div>
                  <div className="rounded-md border bg-background p-3 text-center">
                    <div className="text-2xl font-bold text-sky-300">{mech}</div>
                    <div className="text-xs text-muted-foreground">Mechanical</div>
                  </div>
                  {other > 0 && (
                    <div className="rounded-md border bg-background p-3 text-center">
                      <div className="text-2xl font-bold text-sky-300">{other}</div>
                      <div className="text-xs text-muted-foreground">Other</div>
                    </div>
                  )}
                </div>

                <h3 className="mt-6 text-lg font-semibold text-emerald-300">ICAS Students</h3>
                <div className="mt-2 max-h-[55vh] overflow-y-auto">
                  {selected.students.map((s) => (
                    <div key={`${s.name}-${s.id ?? s.batch}`} className="mb-3 rounded-md border-l-4 border-sky-300 bg-white/5 p-3">
                      <div className="text-sm font-semibold text-sky-300">{s.name}</div>
                      <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                        <div><span className="font-medium text-foreground">Batch:</span> {s.batch}</div>
                        <div><span className="font-medium text-foreground">Program:</span> {s.program || "Not specified"}</div>
                        {s.id && <div><span className="font-medium text-foreground">ID:</span> {s.id}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : selectedUni ? (
              <div className="mt-5 rounded-md border bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-5 text-center">
                <div className="text-base font-semibold text-sky-400">ICAS Partner University</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  This university is part of the International Center for Applied Sciences (ICAS) network, offering academic
                  collaboration and exchange opportunities. Currently, there are no enrolled ICAS students at this institution.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm">University information not available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
