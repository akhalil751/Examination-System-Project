# 📝 Examination System Web App

A complete browser-based examination system built with **HTML, CSS, and JavaScript**. This project simulates an online test platform with user authentication, dynamic question loading, a marking system, real-time score tracking, and a countdown timer.

---

## 🚀 Features

### 🔐 Authentication
- **Login and Registration Pages** with input validation.
- User accounts are stored using **LocalStorage**.
- Only authenticated users can access the exam.

### 📄 Exam Interface
- Exam begins upon successful login.
- Questions are fetched dynamically from a **fake JSON API** and **shuffled** to ensure a unique order for every attempt.
- Users navigate using **Next** and **Previous** buttons.
- Each question includes:
  - A question number
  - Multiple-choice answers with **radio buttons**

### 🚩 Marking System
- Users can **flag/mark** questions with a flag icon.
- Marked questions are listed in a **sidebar** for easy access.
- Clicking on a marked question allows quick navigation.
- State is **preserved**, including selected answers and flag status.
- Questions can be **unmarked**, removing them from the sidebar.

### 📊 Real-time Scoring
- Each time a user selects an answer, the **score is updated** in the background.

### ⏱ Countdown Timer
- A countdown timer is displayed during the exam.
- If time runs out, the system automatically **submits** the exam and displays a timeout message.

### ✅ Exam Submission
- Users can manually **submit** the exam.
- A **confirmation dialog** appears before final submission.
- Upon submission:
  - A **result page** is shown displaying the user's score.
  - A pass/fail screen:
    - 🎉 *Congratulations* screen for passing.
    - ❌ *Better luck next time* screen for failing.
---

## 📦 Technologies Used

- **HTML5** – Structuring the content  
- **CSS3** – Styling and layout  
- **JavaScript (ES6+)** – Functionality, logic, and state management  
- **LocalStorage API** – Persisting user data and answers  

---
