![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)
  Anshx Toast Framework Documentation 

Anshx Toast Framework
=====================

The **Anshx Toast Framework** is a customizable toast notification library designed to enhance user experience by providing smooth, visually appealing notifications. This framework allows developers to display messages, progress indicators, and interactive elements seamlessly in web applications.

Features
--------

*   **Customizable Notifications**: Change colors, durations, and messages easily.
*   **Various Settings**: Enable or disable specific features like auto colors, progress bars, and close buttons.
*   **Responsive Design**: Works well on both mobile and desktop devices.
*   **Easy Integration**: Use it in any web project with minimal setup.

Demo
----

Check out the live demo [here](https://anshx.tech/af/form.php).

Installation
------------

To use the Anshx Toast Framework, include the following in your HTML:

    <link rel="stylesheet" href="path/to/style.css">
    <script src="path/to/script.js"></script>

Usage
-----

### Basic Example

    const anshxToastFramework = new AnshxToastFramework();
    anshxToastFramework.showToast({
        message: "Enhanced Toast",
        logo: "https://via.placeholder.com/30",
        duration: 8000,
        progressColor: '#4CAF50'
    });

### Full Parameters

Parameter

Type

Description

message

String

The message to display in the toast.

logo

String

URL of the logo image to display.

duration

Number

Duration for which the toast will be displayed (in milliseconds). Default is 5000.

progressColor

String

The color of the progress bar.

autoColor

Boolean

Whether to automatically derive colors from the logo. Default is true.

showCloseButton

Boolean

Whether to show the close button. Default is false.

PHP Integration
---------------

To use the Anshx Toast Framework in a PHP application, you can submit a simple form and display success or error messages based on the submission status.

### Example PHP Form

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];
    
        // Validate email
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Save to file
            file_put_contents('save.txt', "$name, $email, $phone, $message\n", FILE_APPEND);
            echo "<script>
                    anshxToastFramework.showToast({
                        message: 'Submission saved successfully!',
                        logo: 'https://via.placeholder.com/30',
                        duration: 5000,
                        progressColor: '#4CAF50'
                    });
                  </script>";
        } else {
            echo "<script>
                    anshxToastFramework.showToast({
                        message: 'Invalid email address!',
                        logo: 'https://via.placeholder.com/30',
                        duration: 5000,
                        progressColor: '#FF5733'
                    });
                  </script>";
        }
    }
    ?>

### HTML Form

    <form method="POST" action="">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <input type="tel" name="phone" placeholder="Your Phone Number" required>
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
    </form>

API Usage
---------

To utilize the Anshx Toast Framework via API, use the following endpoints:

    POST /showToast: Sends a toast notification.

### Example API Request

    fetch('/api/showToast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: "API Toast Notification",
            logo: "https://via.placeholder.com/30",
            duration: 6000,
            progressColor: "#2196F3"
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

Contributing
------------

Feel free to fork the repository and submit pull requests for enhancements or bug fixes.

License
-------

This project is licensed under the MIT License.
