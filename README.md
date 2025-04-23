# Excursions order panel 

See the live version of [Calculator project](https://code-mike-code.github.io/task-js-basics/).

Project made during learning process with my mentor program [devmentor.pl](https://devmentor.pl/). This project is a JavaScript-based travel order system that allows users to:

• Upload a CSV file containing travel offers
• Select trips, specify the number of adults/children, and add them to an order list
• Review and remove items from the order summary
• Submit the order with validated customer details

The system dynamically generates trip cards from CSV data, calculates the total price, and ensures proper form validation before submission.


# Key Functionalities

1. CSV Data Processing
Parses uploaded CSV files with trip data (ID, name, description, adult/child prices)
Handles edge cases (commas in descriptions, line breaks)
Dynamically renders trip cards in the UI

2. Order Management
Adds/removes trips from the order summary
Recalculates the total price in real-time
Stores order data in a structured format

3. Form Validation
Validates required fields (name, email)
Checks email format (must contain "@")
Displays error messages for invalid inputs

4. Order Submission
Shows a confirmation alert with order details
Clears all forms and resets the UI after submission

&nbsp;
 
## 💡 Technologies
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-grey?style=for-the-badge&logo=javascript)


&nbsp;
 
## 🔗 See also

Are you interested in **SCSS** and **JavaScript**? See my other project [Landing Page MGUU](https://code-mike-code.github.io/landing_page_project/).

&nbsp;
 
## 💿 Installation

No Required


&nbsp;

## 💭 Conclusions for future projects

Dynamic Content Handling - Event delegation is crucial when working with DOM elements created after page load. CSV Parsing - Special characters require robust parsing logic beyond simple split(). State Management - A centralized "basket" array simplifies order tracking and calculations. Validation Feedback - Inline error messages improve UX more than generic alerts. This project demonstrates practical JavaScript skills including DOM manipulation, form handling, and data processing - all while maintaining clean, maintainable code.


&nbsp;

## 🙋‍♂️ Feel free to Reach Out!
If you have questions, ideas, or just want to chat about code (or the meaning of life), don’t hesitate to contact me. Open an issue, drop me a pull request, or send a message—carrier pigeon works too, but GitHub might be faster. Let’s build something awesome together! 🚀


&nbsp;

## 👏 Thanks / Special thanks / Credits
Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) – for providing me with this task and for code review.

